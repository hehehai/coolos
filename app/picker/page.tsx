'use client'

import { cn } from "@/lib/utils";
import ColorPicker from "@/components/shared/color-picker/ColorPicker";
import useColorState from "@/components/shared/color-picker/hooks/useColorState";
import { defaultColor } from "@/components/shared/color-picker";
import { useMemo } from "react";
import { isReadable } from "@ctrl/tinycolor";
import names from '@/components/shared/color-picker/data/names.json'
import { IconMaximize } from "@/components/icons/Maximize";

const PickerPage = () => {
  const [color, setColor] = useColorState(defaultColor, {})

  const boardTextIsReadable = useMemo(() => {
    return isReadable(color, '#fff', { level: "AA", size: "large" })
  }, [color])

  return (
    <div className={cn(`bg-white`)}>
      <div className="text-center py-28">
        <div className="text-5xl font-bold text-slate-800 mb-8">
          Color Picker
        </div>
        <div className="text-xl text-gray-500 leading-relaxed">
          Get useful color information like conversion,
          <br />
          combinations, blindness simulation and more.
        </div>
      </div>

      <div className="p-4 flex items-center justify-center space-x-5">
        <div
          className={
            "w-[800px] h-[320px] rounded-2xl flex items-center justify-center relative"
          }
          style={{ backgroundColor: color.toHex8String() }}
        >
          <div
            className={cn(
              "text-center",
              boardTextIsReadable ? "text-white" : "text-black"
            )}
          >
            <p
              className={cn(
                "mb-5 text-xl",
                boardTextIsReadable ? "text-white/50" : "text-black/50"
              )}
            >
              {color.toHex()}
            </p>
            <p className="text-4xl font-bold">
              {color.findClosestColor(names)}
            </p>
          </div>
          <div className="absolute right-4 top-4">
            <IconMaximize
              className={cn(
                "w-5 h-5 cursor-pointer hover:animate-zoom",
                boardTextIsReadable ? "text-white/50 hover:text-white" : "text-black/50 hover:text-black"
              )}
            />
          </div>
        </div>
        <div>
          <ColorPicker value={color} onChange={setColor}></ColorPicker>
        </div>
      </div>
    </div>
  );
}

export default PickerPage
