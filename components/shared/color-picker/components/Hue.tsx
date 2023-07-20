'use client'

import {BaseColorAtomProps, TransformOffset} from "@/components/shared/color-picker/interface";
import {Color, generateColor} from "@/components/shared/color-picker";
import {CalculateEvent, DragChangeEvent} from "@/components/shared/color-picker/hooks/useColorDrag";
import Float from "@/components/shared/color-picker/components/Float";
import ColorBoxFloat from "@/components/shared/color-picker/components/ColorBoxFloat";

export interface HueProps extends BaseColorAtomProps {
}

const colorToOffset = ({
                           trackWidth,
                           centerOffsetX,
                           offsetY
                       }: CalculateEvent, color: Color) => {
    const hsb = color.toHsb();

    return {
        x: (hsb.h / 360) * trackWidth - centerOffsetX,
        y: offsetY
    }
}

const offsetToColor = (offset: TransformOffset, {centerOffsetX, trackWidth}: DragChangeEvent, color: Color) => {
    const xValue = (offset.x + centerOffsetX) / trackWidth
    const hueColor = xValue * 360

    return generateColor({
        ...color.toHsb(),
        h: hueColor <= 0 ? 0 : hueColor,
    })
}

const Hue = (props: HueProps) => {
    return <ColorBoxFloat
        initOffset={{x: 0, y: -5}}
        direction={'x'}
        layerGradientStyle={{backgroundImage: 'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)',}}
        layerGradientClassName={'rounded-full shadow-[insert_0_0_0_1px_rgba(0,0,0,0.08)]'}
        float={(color) => <Float color={`hsl(${color?.toHsb().h},100%, 50%)`}/>}
        colorToOffset={colorToOffset}
        offsetToColor={offsetToColor}
        {...props}
    />
}

Hue.displayName = 'Hue'

export default Hue