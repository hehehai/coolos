'use client'

import Saturation from "@/components/shared/color-picker/components/Saturation";
import Hue from "@/components/shared/color-picker/components/Hue";
import {cn} from "@/lib/utils";
import {
    CommonPickerColorType,
    CommonPickerPanelProps
} from "@/components/shared/color-picker/interface";
import useColorState from "@/components/shared/color-picker/hooks/useColorState";
import {Color, defaultColor} from "@/components/shared/color-picker";
import HexInput from "@/components/shared/color-picker/components/HexInput";

const PickerPanel = ({
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

    return <>
        <Saturation
            value={color}
            className={cn('w-full h-[calc(100%-83px)] rounded-md mb-4')}
            onChange={(val) => handleChange(val, 'saturation')}
        />
        <Hue
            value={color}
            className={cn('w-full h-[10px] rounded-full mb-4')}
            onChange={(val) => handleChange(val, 'hue')}
        />
        <HexInput value={color} onChange={(val) => handleChange(val, 'hex')}></HexInput>
    </>
}

PickerPanel.displayName = 'PickerPanel'

export default PickerPanel