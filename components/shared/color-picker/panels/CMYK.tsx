import {
  Color,
  defaultColor,
  generateColor,
  round,
} from "@/components/shared/color-picker"
import ColorBoxFloat from "@/components/shared/color-picker/components/ColorBoxFloat"
import FieldInput from "@/components/shared/color-picker/components/FieldInput"
import useColorState from "@/components/shared/color-picker/hooks/useColorState"
import {
  ColorAtomType,
  CommonPickerPanelProps,
} from "@/components/shared/color-picker/interface"
import {
  ColorAtomSchemaType,
  getColorAtomPropsSchema,
} from "@/components/shared/color-picker/schema"

const CMYK = ({ value, defaultValue, onChange }: CommonPickerPanelProps) => {
  const [color, setColor] = useColorState(defaultColor, {
    value,
    defaultValue,
  })

  const handleChange = (color: Color, type: ColorAtomType) => {
    setColor(color)
    onChange?.(color, type)
  }

  const handleChangeAtomNum = (val: number, type: ColorAtomType) => {
    const newColor = color.toCmyk()
    switch (type) {
      case ColorAtomType.Cyan:
        newColor.c = val
        break
      case ColorAtomType.Magenta:
        newColor.m = val
        break
      case ColorAtomType.Yellow:
        newColor.y = val
        break
      case ColorAtomType.Black:
        newColor.k = val
        break
    }
    handleChange(generateColor(Color.cmykToRgb(newColor)), type)
  }

  return (
    <>
      <FieldInput
        title={"Cyan"}
        value={color.toCmyk().c}
        max={100}
        onChange={(val) => handleChangeAtomNum(val, ColorAtomType.Cyan)}
      >
        <ColorBoxFloat
          {...getColorAtomPropsSchema(ColorAtomSchemaType.CMYK_Cyan)}
          value={color}
          onChange={(val) => handleChange(val, ColorAtomType.Cyan)}
        />
      </FieldInput>
      <FieldInput
        title={"Magenta"}
        value={round(color.toCmyk().m)}
        max={100}
        onChange={(val) => handleChangeAtomNum(val, ColorAtomType.Magenta)}
      >
        <ColorBoxFloat
          {...getColorAtomPropsSchema(ColorAtomSchemaType.CMYK_Magenta)}
          value={color}
          onChange={(val) => handleChange(val, ColorAtomType.Magenta)}
        />
      </FieldInput>
      <FieldInput
        title={"Yellow"}
        value={round(color.toCmyk().y)}
        max={100}
        onChange={(val) => handleChangeAtomNum(val, ColorAtomType.Yellow)}
      >
        <ColorBoxFloat
          {...getColorAtomPropsSchema(ColorAtomSchemaType.CMYK_Yellow)}
          value={color}
          onChange={(val) => handleChange(val, ColorAtomType.Yellow)}
        />
      </FieldInput>
      <FieldInput
        title={"Black"}
        value={round(color.toCmyk().k)}
        max={100}
        onChange={(val) => handleChangeAtomNum(val, ColorAtomType.Black)}
      >
        <ColorBoxFloat
          {...getColorAtomPropsSchema(ColorAtomSchemaType.CMYK_Black)}
          value={color}
          onChange={(val) => handleChange(val, ColorAtomType.Black)}
        />
      </FieldInput>
    </>
  )
}

CMYK.displayName = "CMYK"

export default CMYK
