import { ColorAtomType, CommonPickerPanelProps } from "@/components/shared/color-picker/interface";
import { Color, defaultColor, generateColor, round } from "@/components/shared/color-picker";
import useColorState from "@/components/shared/color-picker/hooks/useColorState";
import FieldInput from "@/components/shared/color-picker/components/FieldInput";
import { ColorAtomSchemaType, getColorAtomPropsSchema } from "@/components/shared/color-picker/schema";
import ColorBoxFloat from "@/components/shared/color-picker/components/ColorBoxFloat";

const RGB = ({
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

  const handleChangeAtomNum = (val: number, type: ColorAtomType) => {
    const newColor = color.toRgb()
    switch (type) {
      case ColorAtomType.Red:
        newColor.r = val
        break
      case ColorAtomType.Green:
        newColor.g = val
        break
      case ColorAtomType.Blue:
        newColor.b = val
        break
    }
    handleChange(generateColor(newColor), type)
  }

  return <>
    <FieldInput
      title={'Red'}
      value={color.toRgb().r}
      max={255}
      onChange={(val) => handleChangeAtomNum(val, ColorAtomType.Red)}
    >
      <ColorBoxFloat
        {...getColorAtomPropsSchema(ColorAtomSchemaType.RGB_Red)}
        value={color}
        onChange={(val) => handleChange(val, ColorAtomType.Red)}
      />
    </FieldInput>
    <FieldInput
      title={'Green'}
      value={round(color.toRgb().g)}
      max={255}
      onChange={(val) => handleChangeAtomNum(val, ColorAtomType.Green)}
    >
      <ColorBoxFloat
        {...getColorAtomPropsSchema(ColorAtomSchemaType.RGB_Green)}
        value={color}
        onChange={(val) => handleChange(val, ColorAtomType.Green)}
      />
    </FieldInput>
    <FieldInput
      title={'Blue'}
      value={round(color.toRgb().b)}
      max={255}
      onChange={(val) => handleChangeAtomNum(val, ColorAtomType.Blue)}
    >
      <ColorBoxFloat
        {...getColorAtomPropsSchema(ColorAtomSchemaType.RGB_Blue)}
        value={color}
        onChange={(val) => handleChange(val, ColorAtomType.Blue)}
      />
    </FieldInput>
  </>
}

RGB.displayName = 'RGB'

export default RGB
