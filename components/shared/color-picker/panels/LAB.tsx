import { ColorAtomType, CommonPickerPanelProps } from "@/components/shared/color-picker/interface";
import { Color, defaultColor, generateColor, round } from "@/components/shared/color-picker";
import useColorState from "@/components/shared/color-picker/hooks/useColorState";
import FieldInput from "@/components/shared/color-picker/components/FieldInput";
import { ColorAtomSchemaType, getColorAtomPropsSchema } from "@/components/shared/color-picker/schema";
import ColorBoxFloat from "@/components/shared/color-picker/components/ColorBoxFloat";

const LAB = ({
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
    const newColor = color.toLab()
    switch (type) {
      case ColorAtomType.Luminance:
        newColor.l = val
        break
      case ColorAtomType.GreenRed:
        newColor.a = val
        break
      case ColorAtomType.BlueYellow:
        newColor.b = val
        break
    }
    handleChange(generateColor(Color.labToRgb(newColor)), type)
  }

  return <>
    <FieldInput
      title={'Luminance'}
      value={color.toLab().l}
      max={100}
      onChange={(val) => handleChangeAtomNum(val, ColorAtomType.Luminance)}
    >
      <ColorBoxFloat
        {...getColorAtomPropsSchema(ColorAtomSchemaType.LAB_Luminance)}
        value={color}
        onChange={(val) => handleChange(val, ColorAtomType.Luminance)}
      />
    </FieldInput>
    <FieldInput
      title={'Green-Red'}
      value={round(color.toLab().a)}
      min={-128}
      max={127}
      onChange={(val) => handleChangeAtomNum(val, ColorAtomType.GreenRed)}
    >
      <ColorBoxFloat
        {...getColorAtomPropsSchema(ColorAtomSchemaType.LAB_A)}
        value={color}
        onChange={(val) => handleChange(val, ColorAtomType.GreenRed)}
      />
    </FieldInput>
    <FieldInput
      title={'Blue-Yellow'}
      value={round(color.toLab().b)}
      min={-128}
      max={127}
      onChange={(val) => handleChangeAtomNum(val, ColorAtomType.BlueYellow)}
    >
      <ColorBoxFloat
        {...getColorAtomPropsSchema(ColorAtomSchemaType.LAB_B)}
        value={color}
        onChange={(val) => handleChange(val, ColorAtomType.BlueYellow)}
      />
    </FieldInput>
  </>
}

LAB.displayName = 'LAB'

export default LAB
