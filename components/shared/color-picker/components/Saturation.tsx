'use client'

import BoxFloat from "@/components/shared/color-picker/components/BoxFloat";
import {useCallback} from "react";
import {BaseColorAtomProps, TransformOffset} from "@/components/shared/color-picker/interface";
import {defaultColor, generateColor} from "@/components/shared/color-picker";
import useColorState from "@/components/shared/color-picker/hooks/useColorState";
import {CalculateEvent, DragChangeEvent} from "@/components/shared/color-picker/hooks/useColorDrag";
import Float from "@/components/shared/color-picker/components/Float";

export interface SaturationProps extends BaseColorAtomProps {
}

const Saturation = ({
                        value,
                        defaultValue,
                        onChange,

                        ...rest
                    }: SaturationProps) => {
    const [color, setColor] = useColorState(defaultColor, {
        value,
        defaultValue,
    });

    const offsetCalculate = useCallback((event: CalculateEvent) => {
        const {
            trackWidth,
            trackHeight,
            transformWidth,
            transformHeight,
            centerOffsetX,
            centerOffsetY
        } = event
        const hsb = color.toHsb();
        if ((transformWidth === 0 && transformHeight === 0)) return

        return {
            x: hsb.s * trackWidth - centerOffsetX,
            y: (1 - hsb.b) * trackHeight - centerOffsetY
        }
    }, [color])

    const handleChange = (offset: TransformOffset, event: DragChangeEvent) => {
        const xValue = (offset.x + event.centerOffsetX) / event.trackWidth
        const hsb = color.toHsb()
        const bright = 1 - (offset.y + event.centerOffsetY) / event.trackHeight

        const newColor = generateColor({
            h: hsb.h,
            s: xValue <= 0 ? 0 : xValue,
            b: bright >= 1 ? 1 : bright,
            a: hsb.a
        })

        setColor(newColor)
        onChange?.(newColor)
    }

    return <BoxFloat
        {...rest}
        layerGradientStyle={{
            backgroundColor: `hsl(${color.toHsb().h}, 100%, 50%)`,
            backgroundImage: 'linear-gradient(0deg, rgb(0, 0, 0), transparent), linear-gradient(90deg, rgb(255, 255, 255), rgba(255, 255, 255, 0))',
        }}
        layerGradientClassName={'rounded-md shadow-[inset_0px_0px_0px_1px_rgba(0,0,0,0.075)]'}
        float={<Float color={color.toRgbString()}/>}
        offsetCalculate={offsetCalculate}
        onChange={handleChange}
    />
}

Saturation.displayName = 'Saturation'

export default Saturation