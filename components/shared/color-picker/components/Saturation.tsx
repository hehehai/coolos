'use client'

import {BaseColorAtomProps, TransformOffset} from "@/components/shared/color-picker/interface";
import {Color, generateColor} from "@/components/shared/color-picker";
import {CalculateEvent, DragChangeEvent} from "@/components/shared/color-picker/hooks/useColorDrag";
import Float from "@/components/shared/color-picker/components/Float";
import ColorBoxFloat from "@/components/shared/color-picker/components/ColorBoxFloat";

export interface SaturationProps extends BaseColorAtomProps {
}

const colorToOffset = ({
                           trackWidth,
                           trackHeight,
                           centerOffsetX,
                           centerOffsetY
                       }: CalculateEvent, color: Color
) => {
    const hsb = color.toHsb();

    return {
        x: hsb.s * trackWidth - centerOffsetX,
        y: (1 - hsb.b) * trackHeight - centerOffsetY
    }
}

const offsetToColor = (offset: TransformOffset, event: DragChangeEvent, color: Color) => {
    const xValue = (offset.x + event.centerOffsetX) / event.trackWidth
    const hsb = color.toHsb()
    const bright = 1 - (offset.y + event.centerOffsetY) / event.trackHeight

    return generateColor({
        h: hsb.h,
        s: xValue <= 0 ? 0 : xValue,
        b: bright >= 1 ? 1 : bright,
        a: hsb.a
    })
}

const Saturation = (props: SaturationProps) => {

    return <ColorBoxFloat
        initOffset={{x: 0, y: -5}}
        layerGradientStyle={(color) => ({
            backgroundColor: `hsl(${color.toHsb().h}, 100%, 50%)`,
            backgroundImage: 'linear-gradient(0deg, rgb(0, 0, 0), transparent), linear-gradient(90deg, rgb(255, 255, 255), rgba(255, 255, 255, 0))',
        })}
        layerGradientClassName={'rounded-md shadow-[inset_0px_0px_0px_1px_rgba(0,0,0,0.075)]'}
        float={(color) => <Float color={color.toRgbString()}/>}
        colorToOffset={colorToOffset}
        offsetToColor={offsetToColor}
        {...props}
    />
}

Saturation.displayName = 'Saturation'

export default Saturation