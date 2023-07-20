import {CommonPickerColorType, CommonPickerPanelProps} from "@/components/shared/color-picker/interface";
import {Color, defaultColor, generateColor} from "@/components/shared/color-picker";
import useColorState from "@/components/shared/color-picker/hooks/useColorState";
import FieldInput from "@/components/shared/color-picker/components/FieldInput";
import Hue from "@/components/shared/color-picker/components/Hue";
import {cn} from "@/lib/utils";

const HSB = ({
                 value,
                 defaultValue,
                 onChange
             }: CommonPickerPanelProps) => {
    const [color, setColor] = useColorState(defaultColor, {
        value,
        defaultValue,
    });

    const handleChange = (color: Color, type: CommonPickerColorType) => {
        setColor(color)
        onChange?.(color, type)
    }

    const handleChangeAtomNum = (val: number, type: CommonPickerColorType) => {
        const newColor = color.toHsb()
        switch (type) {
            case 'hue':
                newColor.h = val
                break
            case 'saturation':
                newColor.s = val
                break
            case 'brightness':
                newColor.b = val
                break
        }
        handleChange(generateColor(newColor), type)
    }

    return <>
        <FieldInput title={'Hue'} value={color.toHsb().h} max={360} onChange={(val) => handleChangeAtomNum(val, 'hue')}>
            <Hue
                value={color}
                className={cn('w-full h-[10px] rounded-full mb-4')}
                onChange={(val) => handleChange(val, 'hue')}
            />
        </FieldInput>
    </>
}

HSB.displayName = 'HSB'

export default HSB