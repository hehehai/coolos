import {Color} from './color';
import type {ColorGenInput} from './interface';

export const generateColor = (color: ColorGenInput): Color => {
    if (color instanceof Color) {
        return color;
    }
    return new Color(color);
};

export const defaultColor = generateColor('#1677ff');

export const getFullAlphaColor = (color: Color) => {
    const rgb = generateColor(color.toRgbString());
    // alpha color need equal 1 for base color
    rgb.setAlpha(1);
    return rgb.toRgbString();
}