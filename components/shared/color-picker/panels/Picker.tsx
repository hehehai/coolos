'use client'

import Saturation from "@/components/shared/color-picker/components/Saturation";
import Hue from "@/components/shared/color-picker/components/Hue";
import Alpha from "@/components/shared/color-picker/components/Alpha";
import {cn} from "@/lib/utils";
import {BasePickerPanelProps} from "@/components/shared/color-picker/interface";
import useColorState from "@/components/shared/color-picker/hooks/useColorState";
import {Color, defaultColor, generateColor} from "@/components/shared/color-picker";
import {Input} from "@/components/ui/input";
import HexInput from "@/components/shared/color-picker/components/HexInput";

export type PickerType = 'saturation' | 'hue' | 'alpha' | 'hex';

interface PickerPanelProps extends Omit<BasePickerPanelProps, 'onChange'> {
    onChange?: (color: Color, type: PickerType) => void
}

const PickerPanel = ({
                         value,
                         defaultValue,
                         onChange
                     }: PickerPanelProps) => {

    const [color, setColor] = useColorState(defaultColor, {
        value,
        defaultValue,
    });

    const handleChange = (color: Color, type: PickerType) => {
        setColor(color)
        onChange?.(color, type)
    }

    return <div className={'w-full h-full'}>
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
    </div>
}

PickerPanel.displayName = 'PickerPanel'

export default PickerPanel