'use client'

import { cn } from "@/lib/utils";
import ColorPicker from "@/components/shared/color-picker/ColorPicker";
import useColorState from "@/components/shared/color-picker/hooks/useColorState";
import { defaultColor } from "@/components/shared/color-picker";
import { useMemo } from "react";
import { isReadable } from "@ctrl/tinycolor";
import names from '@/components/shared/color-picker/data/names.json'

const PickerPage = () => {
  const [color, setColor] = useColorState(defaultColor, {})

  const boardTextIsReadable = useMemo(() => {
    return isReadable(color, '#fff', { level: "AA", size: "large" })
  }, [color])
  return <div className={cn(`bg-white`)}>
    <div>
      <div>Color Picker</div>
      <div>Get useful color information like conversion, combinations, blindness simulation and more.</div>
    </div>

    <div className="p-4 flex items-center space-x-4">
      <div
        className={'w-[500px] h-[300px] rounded-2xl flex items-center justify-center'}
        style={{ backgroundColor: color.toHex8String() }}
      >
        <div
          className={cn('text-4xl text-center', boardTextIsReadable ? 'text-white' : 'text-black')}
        >
          <p className="mb-2">{color.toHex8String()}</p>
          <p className="text-2xl">{color.findClosestColor(names)}</p>
        </div>
      </div>
      <div>
        <ColorPicker value={color} onChange={setColor}></ColorPicker>
      </div>
    </div>
  </div>
}

export default PickerPage
