'use client';

import { defaultColor } from "@/components/shared/color-picker";
import ColorPicker from "@/components/shared/color-picker/ColorPicker"
import useColorState from "@/components/shared/color-picker/hooks/useColorState";

const ColorPickerFloat = () => {
  const [color, setColor] = useColorState(defaultColor);

  return <div className="absolute right-12 top-1/2 -translate-y-1/2">
    <div className="absolute top-0 -left-12">
      <div className="w-[100px] h-[100px] rounded-full" style={{
        backgroundColor: color.toHexString()
      }} />
    </div>
    <ColorPicker value={color} onChange={setColor} />
  </div>
}

export default ColorPickerFloat
