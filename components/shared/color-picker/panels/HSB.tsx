import { ColorAtomType, CommonPickerPanelProps } from "@/components/shared/color-picker/interface";
import { Color, defaultColor, generateColor, getRoundNumber } from "@/components/shared/color-picker";
import useColorState from "@/components/shared/color-picker/hooks/useColorState";
import FieldInput from "@/components/shared/color-picker/components/FieldInput";
import { ColorAtomSchemaType, getColorAtomPropsSchema } from "@/components/shared/color-picker/schema";
import ColorBoxFloat from "@/components/shared/color-picker/components/ColorBoxFloat";

const HSB = ({
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
    const newColor = color.toHsb()
    switch (type) {
      case ColorAtomType.Hue:
        newColor.h = val
        break
      case ColorAtomType.Saturation:
        newColor.s = val
        break
      case ColorAtomType.Brightness:
        newColor.b = val
        break
    }
    handleChange(generateColor(newColor), type)
  }

  return <>
    <FieldInput
      title={'Hue'}
      value={color.toHsb().h}
      max={360}
      onChange={(val) => handleChangeAtomNum(val, ColorAtomType.Hue)}
    >
      <ColorBoxFloat
        {...getColorAtomPropsSchema(ColorAtomSchemaType.HueSlider)}
        value={color}
        onChange={(val) => handleChange(val, ColorAtomType.Hue)}
      />
    </FieldInput>
    <FieldInput
      title={'Saturation'}
      value={getRoundNumber(color.toHsb().s * 100)}
      max={100}
      onChange={(val) => handleChangeAtomNum(val / 100, ColorAtomType.Saturation)}
    >
      <ColorBoxFloat
        {...getColorAtomPropsSchema(ColorAtomSchemaType.SaturationSlider)}
        value={color}
        onChange={(val) => handleChange(val, ColorAtomType.Saturation)}
      />
    </FieldInput>
    <FieldInput
      title={'Brightness'}
      value={getRoundNumber(color.toHsb().b * 100)}
      max={100}
      onChange={(val) => handleChangeAtomNum(val / 100, ColorAtomType.Brightness)}
    >
      <ColorBoxFloat
        {...getColorAtomPropsSchema(ColorAtomSchemaType.BrightnessSlider)}
        value={color}
        onChange={(val) => handleChange(val, ColorAtomType.Brightness)}
      />
    </FieldInput>
  </>
}

HSB.displayName = 'HSB'

export default HSB
