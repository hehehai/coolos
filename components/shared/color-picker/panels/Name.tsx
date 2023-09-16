import { useMemo, useState } from "react"
import { Tooltip } from "@radix-ui/react-tooltip"
import Fuse from "fuse.js"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { colorNames } from "../data/"
import { ColorAtomType, CommonPickerPanelProps } from "../interface"
import { generateColor } from "../util"

const fuseName = new Fuse(colorNames, {
  keys: ["name"],
})

const Name = ({ value, onChange }: CommonPickerPanelProps) => {
  const [name, setName] = useState(
    value ? generateColor(value).findClosestColor(colorNames) : ""
  )
  const [tmpName, setTmpName] = useState<string | null>(null)

  const activeName = useMemo(() => {
    return colorNames.find((item) => item.name === name)
  }, [name])

  const showNames = useMemo(() => {
    if (!tmpName) {
      return colorNames
    }
    return fuseName.search(tmpName).map((item) => item.item)
  }, [tmpName])

  const handleEmitChange = (matched: { name: string; rgb: number[] }) => {
    if (onChange && matched) {
      setTmpName(null)
      setName(matched.name)
      const [r, g, b] = matched.rgb
      onChange(generateColor({ r, g, b }), ColorAtomType.Name)
    }
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    setTmpName(name)
  }

  const handleNameBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    const matched = colorNames.find(
      (item) => item.name.toLowerCase() === name.toLowerCase()
    )
    if (matched) {
      handleEmitChange(matched)
    } else {
      setTmpName(null)
    }
  }

  return (
    <div className="flex h-full w-full flex-col">
      <div className="relative">
        <Input
          value={tmpName ?? name}
          placeholder={name}
          onChange={handleNameChange}
          onBlur={handleNameBlur}
        />
        {activeName && (
          <div
            className={
              "absolute right-2 top-1/2 z-[1] h-6 w-6 -translate-y-1/2 rounded-sm shadow-[inset_0_0_0_1px_rgba(0,0,0,0.075)]"
            }
            style={{
              backgroundColor: `rgb(${activeName?.rgb[0]}, ${activeName?.rgb[1]}, ${activeName?.rgb[2]})`,
            }}
          ></div>
        )}
      </div>
      <div className="no-scrollbar mt-4 grow overflow-auto">
        <div className="grid grid-cols-12 gap-1">
          {showNames.map((item) => (
            <TooltipProvider key={item.key} delayDuration={300}>
              <Tooltip>
                <TooltipTrigger>
                  <div
                    className={cn(
                      `relative aspect-square cursor-pointer rounded-sm shadow-[inset_0_0_0_1px_rgba(0,0,0,0.075)] before:absolute before:left-1/2 before:top-1/2 before:hidden before:h-2 before:w-2 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:bg-white`,
                      {
                        "before:block before:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.075)]":
                          item.name === name,
                      }
                    )}
                    title={item.name}
                    style={{
                      backgroundColor: `rgb(${item.rgb[0]}, ${item.rgb[1]}, ${item.rgb[2]})`,
                    }}
                    onClick={() => handleEmitChange(item)}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
    </div>
  )
}

Name.displayName = "Name"

export default Name
