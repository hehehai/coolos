import { useEffect, useMemo, useState } from "react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover"

import { Color, generateColor } from "@/components/shared/color-picker"
import { ColorGenInput } from "@/components/shared/color-picker/interface"
import { Input, InputProps } from "@/components/ui/input"

export interface HexInputProps
  extends Omit<InputProps, "value" | "defaultValue" | "onChange"> {
  value?: ColorGenInput
  onChange?: (color: Color) => void
  popContent?: React.ReactNode
}

const HexInput = ({ value, onChange, popContent }: HexInputProps) => {
  const [tmpVal, setTmpVal] = useState(
    value ? generateColor(value).toHexString() : ""
  )

  useEffect(() => {
    setTmpVal(value ? generateColor(value).toHexString() : "")
  }, [value])

  const handleChange = (e: React.SyntheticEvent) => {
    const val = (e.target as HTMLInputElement).value
    setTmpVal(val)
  }

  const handleBlur = (e: React.SyntheticEvent) => {
    const val = (e.target as HTMLInputElement).value
    const newColor = generateColor(val)
    if (newColor.isValid) {
      setTmpVal(val)
      onChange?.(newColor)
    } else {
      setTmpVal(value ? generateColor(value).toHexString() : "")
    }
  }

  const currentBlock = useMemo(() => {
    const styleVal = value
      ? { backgroundColor: generateColor(value).toHexString() }
      : undefined
    const blockClass =
      "absolute z-[1] right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-sm shadow-[inset_0_0_0_1px_rgba(0,0,0,0.075)]"

    if (!popContent) return <div className={blockClass} style={styleVal} />

    return (
      <Popover>
        <PopoverTrigger
          className={
            "absolute right-2 top-1/2 z-[1] h-6 w-6 -translate-y-1/2 rounded-sm shadow-[inset_0_0_0_1px_rgba(0,0,0,0.075)]"
          }
          style={styleVal}
        />
        <PopoverContent
          side="top"
          sideOffset={10}
          className="z-50 h-[320px] w-[280px] shrink-0 overflow-hidden rounded-2xl bg-white shadow-[rgba(0,0,0,0.05)_0_0_0_1px,rgba(0,0,0,0.12)_0_15px_30px_0px]"
        >
          {popContent}
        </PopoverContent>
      </Popover>
    )
  }, [value, popContent])

  return (
    <div className={"relative"}>
      <Input
        value={tmpVal}
        onChange={handleChange}
        onBlur={handleBlur}
        spellCheck={false}
      ></Input>
      {currentBlock}
    </div>
  )
}

HexInput.displayName = "HexInput"

export default HexInput
