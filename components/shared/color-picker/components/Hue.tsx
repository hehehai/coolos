'use client'

import BoxFloat from "@/components/shared/color-picker/components/BoxFloat";
import {useCallback} from "react";
import {BaseColorAtomProps, TransformOffset} from "@/components/shared/color-picker/interface";
import {Color, defaultColor, generateColor} from "@/components/shared/color-picker";
import useColorState from "@/components/shared/color-picker/hooks/useColorState";
import {CalculateEvent, DragChangeEvent} from "@/components/shared/color-picker/hooks/useColorDrag";
import Float from "@/components/shared/color-picker/components/Float";

export interface HueProps extends BaseColorAtomProps {
}

const Hue = ({
                 value,
                 defaultValue,
                 onChange,

                 ...rest
             }: HueProps) => {
    const [color, setColor] = useColorState(defaultColor, {
        value,
        defaultValue,
    });

    const offsetCalculate = useCallback(({
                                             trackWidth,
                                             transformWidth,
                                             transformHeight,
                                             centerOffsetX,
                                             offsetY
                                         }: CalculateEvent, pointColor?: Color) => {
        const hsb = (pointColor ?? color).toHsb();
        if ((transformWidth === 0 && transformHeight === 0)) return

        return {
            x: (hsb.h / 360) * trackWidth - centerOffsetX,
            y: offsetY
        }
    }, [color])

    const handleChange = (offset: TransformOffset, {centerOffsetX, trackWidth}: DragChangeEvent) => {
        const xValue = (offset.x + centerOffsetX) / trackWidth
        const hueColor = xValue * 360

        const newColor = generateColor({
            ...color.toHsb(),
            h: hueColor <= 0 ? 0 : hueColor,
        })
        setColor(newColor)
        onChange?.(newColor)
    }

    return <BoxFloat
        {...rest}
        direction={'x'}
        layerGradientStyle={{backgroundImage: 'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)',}}
        layerGradientClassName={'rounded-full shadow-[insert_0_0_0_1px_rgba(0,0,0,0.08)]'}
        float={<Float color={`hsl(${color?.toHsb().h},100%, 50%)`}/>}
        offsetCalculate={offsetCalculate}
        onChange={handleChange}
    />
}

Hue.displayName = 'Hue'

export default Hue