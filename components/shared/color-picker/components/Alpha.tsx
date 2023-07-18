'use client'

import BoxFloat from "@/components/shared/color-picker/components/BoxFloat";
import {useCallback, useMemo} from "react";
import {BaseColorAtomProps, TransformOffset} from "@/components/shared/color-picker/interface";
import {defaultColor, generateColor} from "@/components/shared/color-picker";
import useColorState from "@/components/shared/color-picker/hooks/useColorState";
import {CalculateEvent, DragChangeEvent} from "@/components/shared/color-picker/hooks/useColorDrag";
import Float from "@/components/shared/color-picker/components/Float";
import {cn} from "@/lib/utils";

export interface AlphaProps extends BaseColorAtomProps {
}

const Alpha = ({
                   className,
                   value,
                   defaultValue,
                   onChange,

                   ...rest
               }: AlphaProps) => {
    const [color, setColor] = useColorState(defaultColor, {
        value,
        defaultValue,
    });

    const alphaColor = useMemo(() => {
        const rgb = generateColor(color.toRgbString());
        // alpha color need equal 1 for base color
        rgb.setAlpha(1);
        return rgb.toRgbString();
    }, [color])

    const offsetCalculate = useCallback(({
                                             trackWidth,
                                             transformWidth,
                                             transformHeight,
                                             centerOffsetX,
                                             offsetY
                                         }: CalculateEvent) => {
        const hsb = color.toHsb();
        if ((transformWidth === 0 && transformHeight === 0)) return

        return {
            x: hsb.a * trackWidth - centerOffsetX,
            y: offsetY
        }
    }, [color])

    const handleChange = (offset: TransformOffset, {centerOffsetX, trackWidth}: DragChangeEvent) => {
        const xValue = (offset.x + centerOffsetX) / trackWidth

        const newColor = generateColor({
            ...color.toHsb(),
            a: xValue <= 0 ? 0 : xValue,
        })

        setColor(newColor)
        onChange?.(newColor)
    }

    return <BoxFloat
        {...rest}
        direction={'x'}
        className={cn('bg-[length:8px_8px]', className)}
        style={{backgroundImage: 'conic-gradient(rgba(0, 0, 0, 0.06) 0 25%,transparent 0 50%,rgba(0, 0, 0, 0.06) 0 75%,transparent 0)'}}
        layerGradientStyle={{backgroundImage: `linear-gradient(to right, rgba(255, 0, 4, 0) 0%, ${alphaColor}`}}
        layerGradientClassName={'rounded-full shadow-[insert_0_0_0_1px_rgba(0,0,0,0.08)]'}
        float={<Float color={color.toHex8String()} alphaBackground/>}
        offsetCalculate={offsetCalculate}
        onChange={handleChange}
    />
}

Alpha.displayName = 'Alpha'

export default Alpha