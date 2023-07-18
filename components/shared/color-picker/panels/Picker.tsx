'use client'

import Saturation from "@/components/shared/color-picker/components/Saturation";
import Hue from "@/components/shared/color-picker/components/Hue";
import Alpha from "@/components/shared/color-picker/components/Alpha";
import {cn} from "@/lib/utils";
import {BasePickerPanelProps} from "@/components/shared/color-picker/interface";
import useColorState from "@/components/shared/color-picker/hooks/useColorState";
import {Color, defaultColor} from "@/components/shared/color-picker";

interface PickerPanelProps extends BasePickerPanelProps {
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

    const handleChange = (color: Color, type: 'saturation' | 'hue' | 'alpha') => {
        setColor(color)
        onChange?.(color)
    }

    return <div className={'w-full h-full'}>
        <Saturation
            value={color}
            className={cn('w-full h-[calc(100%-83px)] rounded-md mb-4')}
            onChange={(val) => handleChange(val, 'saturation')}
        />
        <Hue
            value={color}
            className={cn('w-full h-[10px] rounded-full mb-5')}
            onChange={(val) => handleChange(val, 'hue')}
        />
        <Alpha
            value={color}
            className={cn('w-full h-[10px] rounded-full')}
            onChange={(val) => handleChange(val, 'alpha')}
        />
    </div>
}

PickerPanel.displayName = 'PickerPanel'

export default PickerPanel