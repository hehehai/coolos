import {Color} from './color';
import type {
    ColorGenInput,
    HsbaColorType,
    TransformOffset,
} from './interface';

export const generateColor = (color: ColorGenInput): Color => {
    if (color instanceof Color) {
        return color;
    }
    return new Color(color);
};

export const defaultColor = generateColor('#1677ff');
