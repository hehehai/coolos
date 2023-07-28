'use client'

import { ColorAtomType, CommonPickerPanelProps } from "@/components/shared/color-picker/interface";
import useColorState from "@/components/shared/color-picker/hooks/useColorState";
import { Color, defaultColor } from "@/components/shared/color-picker";
import HexInput from "@/components/shared/color-picker/components/HexInput";
import ColorBoxFloat from "@/components/shared/color-picker/components/ColorBoxFloat";
import { ColorAtomSchemaType, getColorAtomPropsSchema } from "@/components/shared/color-picker/schema";

const PickerPanel = ({
  value,
  defaultValue,
  onChange
}: CommonPickerPanelProps) => {

  const [color, setColor] = useColorState(defaultColor, {
    value,
    defaultValue,
  });

  const handleChange = (color: Color, type: ColorAtomType) => {
    setColor(color)
    onChange?.(color, type)
  }

  return <>
    <ColorBoxFloat
      {...getColorAtomPropsSchema(ColorAtomSchemaType.SaturationBox)}
      value={color}
      onChange={(val) => handleChange(val, ColorAtomType.Saturation)}
    />
    <ColorBoxFloat
      {...getColorAtomPropsSchema(ColorAtomSchemaType.HueSlider)}
      value={color}
      onChange={(val) => handleChange(val, ColorAtomType.Hue)}
    />
    <HexInput value={color} onChange={(val) => handleChange(val, ColorAtomType.Hex)}></HexInput>
  </>
}

PickerPanel.displayName = 'PickerPanel'

export default PickerPanel
