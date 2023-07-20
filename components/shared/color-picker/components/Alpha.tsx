'use client'

import {BaseColorAtomProps, TransformOffset} from "@/components/shared/color-picker/interface";
import {Color, generateColor} from "@/components/shared/color-picker";
import {CalculateEvent, DragChangeEvent} from "@/components/shared/color-picker/hooks/useColorDrag";
import {cn} from "@/lib/utils";
import Float from "@/components/shared/color-picker/components/Float";
import ColorBoxFloat from "@/components/shared/color-picker/components/ColorBoxFloat";

export interface AlphaProps extends BaseColorAtomProps {
}

const colorToOffset = ({
                           trackWidth,
                           centerOffsetX,
                           offsetY
                       }: CalculateEvent, color: Color) => {
    const hsb = color.toHsb();

    return {
        x: hsb.a * trackWidth - centerOffsetX,
        y: offsetY
    }
}

const offsetToColor = (offset: TransformOffset, {centerOffsetX, trackWidth}: DragChangeEvent, color: Color) => {
    const xValue = (offset.x + centerOffsetX) / trackWidth

    return generateColor({
        ...color.toHsb(),
        a: xValue <= 0 ? 0 : xValue,
    })
}

const getAlphaColor = (color: Color) => {
    const rgb = generateColor(color.toRgbString());
    // alpha color need equal 1 for base color
    rgb.setAlpha(1);
    return rgb.toRgbString();
}

const Alpha = (props: AlphaProps) => {


    return <ColorBoxFloat
        initOffset={{x: 0, y: -5}}
        direction={'x'}
        className={cn('bg-[length:8px_8px]', props.className)}
        style={{backgroundImage: 'conic-gradient(rgba(0, 0, 0, 0.06) 0 25%,transparent 0 50%,rgba(0, 0, 0, 0.06) 0 75%,transparent 0)'}}
        layerGradientStyle={(color) => ({
            backgroundImage: `linear-gradient(to right, rgba(255, 0, 4, 0) 0%, ${getAlphaColor(color)}`
        })}
        layerGradientClassName={'rounded-full shadow-[insert_0_0_0_1px_rgba(0,0,0,0.08)]'}
        float={(color) => <Float color={color.toHex8String()} alphaBackground/>}
        colorToOffset={colorToOffset}
        offsetToColor={offsetToColor}
        {...props}
    />
}

Alpha.displayName = 'Alpha'

export default Alpha