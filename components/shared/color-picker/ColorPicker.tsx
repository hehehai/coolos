'use client'

import {cn} from "@/lib/utils";
import {forwardRef, Ref, useState} from "react";
import {ChevronDown, ChevronUp} from "@/components/icons";
import PickerPanel from "@/components/shared/color-picker/panels/Picker";
import {Color} from "@/components/shared/color-picker/color";
import {ColorGenInput} from "@/components/shared/color-picker/interface";
import useColorState from "@/components/shared/color-picker/hooks/useColorState";
import {defaultColor} from "@/components/shared/color-picker/util";

export enum PickerMethod {
    Picker = 'Picker',
    HSB = 'HSB',
    HSL = 'HSL',
    RGB = 'RGB',
    CMYK = 'CMYK',
    LAB = 'LAB',
    Name = "Name",
}

const pickerMethodList = [
    PickerMethod.Picker,
    PickerMethod.HSB,
    PickerMethod.HSL,
    PickerMethod.RGB,
    PickerMethod.CMYK,
    PickerMethod.LAB,
    PickerMethod.Name
]

interface ColorPickerProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange' | 'defaultValue'> {
    value?: ColorGenInput;
    defaultValue?: ColorGenInput;
    onChange?: (color: Color) => void
}

const BaseColorPicker = ({
                             value,
                             defaultValue,
                             onChange
                         }: ColorPickerProps, ref: Ref<HTMLDivElement>) => {
    const [color, setColor] = useColorState(defaultColor, {
        value,
        defaultValue,
    });
    const [visibleMethodMenu, setVisibleMethodMenu] = useState<boolean>(false)
    const [pickerMethod, setPickerMethod] = useState<PickerMethod>(PickerMethod.Picker)

    const handleToggleMethodPickerMenu = () => {
        setVisibleMethodMenu(val => !val)
    }

    const handleSelectPickerMethod = (val: PickerMethod) => {
        setPickerMethod(val)
        setVisibleMethodMenu(false)
    }

    const handleColorChange = (val: Color) => {
        setColor(val)
        onChange?.(val)
    }

    return <div
        ref={ref}
        className={cn('relative w-[300px] h-[300px] overflow-hidden bg-white rounded-2xl shadow-[0_0_0_1px_rgba(0,0,0,0.1)]')}
    >
        <div className={cn('relative w-full h-[calc(100%-46px)]')}>
            {visibleMethodMenu &&
                <div
                    className={cn('absolute z-[10] p-[10px] bg-white w-full h-full space-y-1 overflow-auto no-scrollbar')}>
                    {pickerMethodList.map(item => <div
                        key={item}
                        className={cn('py-[8px] px-[10px] text-sm text-slate-900 rounded-md cursor-pointer hover:bg-gray-100', {
                            'bg-gray-100': pickerMethod === item,
                        })}
                        onClick={() => handleSelectPickerMethod(item)}
                    >
                        {item}
                    </div>)}
                </div>
            }
            <div className={'w-full h-full p-4'}>
                <PickerPanel value={color} onChange={handleColorChange}/>
            </div>
        </div>
        <div
            className={cn('h-[46px] px-4 flex items-center justify-between relative z-[11] shadow-[0_-1px_rgba(0,0,0,0.075)]')}
        >
            <div
                className={cn('flex items-center space-x-1 cursor-pointer text-sm px-1')}
                onClick={handleToggleMethodPickerMenu}
            >
                <span>{pickerMethod}</span>
                {visibleMethodMenu ? <ChevronDown/> : <ChevronUp/>}
            </div>
        </div>
    </div>
}

const ColorPicker = forwardRef(BaseColorPicker)

ColorPicker.displayName = 'ColorPicker'

export default ColorPicker