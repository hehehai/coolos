import {Input, InputProps} from "@/components/ui/input";
import {useEffect, useState} from "react";
import {Color, generateColor} from "@/components/shared/color-picker";
import {ColorGenInput} from "@/components/shared/color-picker/interface";

export interface HexInputProps extends Omit<InputProps, 'value' | 'defaultValue' | 'onChange'> {
    value?: ColorGenInput;
    onChange?: (color: Color) => void
}

const HexInput = ({value, onChange}: HexInputProps) => {
    const [tmpVal, setTmpVal] = useState(value ? generateColor(value).toHexString() : '')

    useEffect(() => {
        setTmpVal(value ? generateColor(value).toHexString() : '')
    }, [value])

    const handleChange = (e: React.SyntheticEvent) => {
        const val = (e.target as HTMLInputElement).value
        setTmpVal(val)
    }

    const handleBlur = (e: React.SyntheticEvent) => {
        const val = (e.target as HTMLInputElement).value
        const newColor = generateColor(val)
        if (newColor.isValid) {
            setTmpVal(val)
            onChange?.(newColor)
        } else {
            setTmpVal(value ? generateColor(value).toHexString() : '')
        }
    }

    return <div className={'relative'}>
        <Input value={tmpVal} onChange={handleChange} onBlur={handleBlur}></Input>
        <div
            className={'absolute z-[1] right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-sm shadow-[inset_0_0_0_1px_rgba(0,0,0,0.075)]'}
            style={value ? {backgroundColor: generateColor(value).toHexString()} : undefined}
        />
    </div>
}

HexInput.displayName = 'HexInput'

export default HexInput