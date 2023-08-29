import { HSV, Numberify, readability } from '@ctrl/tinycolor';
import { Color } from './color';
import type { ColorGenInput, RGB, XYZ } from './interface';
import { adjustValue } from '@/lib/utils';

export const round = (number: number, digits = 0, base = Math.pow(10, digits)): number => {
  return Math.round(base * number) / base + 0;
};

export const floor = (number: number, digits = 0, base = Math.pow(10, digits)): number => {
  return Math.floor(base * number) / base + 0;
};

/**
 * Clamps a value between an upper and lower bound.
 * We use ternary operators because it makes the minified code
 * is 2 times shorter then `Math.min(Math.max(a,b),c)`
 * NaN is clamped to the lower bound
 */
export const clamp = (number: number, min = 0, max = 1): number => {
  return number > max ? max : number > min ? number : min;
};

// Theoretical light source that approximates "warm daylight" and follows the CIE standard.
// https://en.wikipedia.org/wiki/Standard_illuminant
export const D50 = {
  x: 96.422,
  y: 100,
  z: 82.521,
};

export const clampRgba = (rgba: Numberify<RGB>): Numberify<RGB> => ({
  r: clamp(rgba.r, 0, 255),
  g: clamp(rgba.g, 0, 255),
  b: clamp(rgba.b, 0, 255),
});

/**
 * Limits XYZ axis values assuming XYZ is relative to D50.
 */
export const clampXyza = (xyza: XYZ): XYZ => ({
  x: clamp(xyza.x, 0, D50.x),
  y: clamp(xyza.y, 0, D50.y),
  z: clamp(xyza.z, 0, D50.z),
});

/**
 * Performs Bradford chromatic adaptation from D65 to D50
 */
export const adaptXyzaToD50 = (xyza: XYZ): XYZ => ({
  x: xyza.x * 1.0478112 + xyza.y * 0.0228866 + xyza.z * -0.050127,
  y: xyza.x * 0.0295424 + xyza.y * 0.9904844 + xyza.z * -0.0170491,
  z: xyza.x * -0.0092345 + xyza.y * 0.0150436 + xyza.z * 0.7521316,
});

/**
 * Performs Bradford chromatic adaptation from D50 to D65
 */
export const adaptXyzToD65 = (xyza: XYZ): XYZ => ({
  x: xyza.x * 0.9555766 + xyza.y * -0.0230393 + xyza.z * 0.0631636,
  y: xyza.x * -0.0282895 + xyza.y * 1.0099416 + xyza.z * 0.0210077,
  z: xyza.x * 0.0122982 + xyza.y * -0.020483 + xyza.z * 1.3299098,
});

/**
 * Converts an RGB channel [0-255] to its linear light (un-companded) form [0-1].
 * Linearized RGB values are widely used for color space conversions and contrast calculations
 */
export const linearizeRgbChannel = (value: number): number => {
  const ratio = value / 255;
  return ratio < 0.04045 ? ratio / 12.92 : Math.pow((ratio + 0.055) / 1.055, 2.4);
};

/**
 * Converts an linear-light sRGB channel [0-1] back to its gamma corrected form [0-255]
 */
export const unlinearizeRgbChannel = (ratio: number): number => {
  const value = ratio > 0.0031308 ? 1.055 * Math.pow(ratio, 1 / 2.4) - 0.055 : 12.92 * ratio;
  return value * 255;
};

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

// 生成明暗变体
export function generateVariations(
  baseColor: RGB,
  levels: number,
  blackColor: RGB = { r: 0, g: 0, b: 0 },
): RGB[] {

  const decreaseRate = 1 / levels;
  const shadows: RGB[] = [];

  for (let i = 0; i < levels; i++) {

    const shadowColor: RGB = {
      r: Number(baseColor.r) * (1 - decreaseRate * i) + Number(blackColor.r) * decreaseRate * i,
      g: Number(baseColor.g) * (1 - decreaseRate * i) + Number(blackColor.g) * decreaseRate * i,
      b: Number(baseColor.b) * (1 - decreaseRate * i) + Number(blackColor.b) * decreaseRate * i
    };

    shadows.push(shadowColor);
  }

  return shadows;
}


// 生成 HUE 色系组
export function generateHues(
  baseColor: HSV,
  levels: number,
): HSV[] {
  const baseH = Number.parseInt(baseColor.h.toString())

  const wheelThunks: {
    left: number[],
    right: number[]
  } = {
    left: [],
    right: []
  }

  levels = levels > 19 ? 19 : levels

  const rangeSize = Math.floor((levels - 1) / 2)

  const thunkSize = 360 / 36

  for (let i = 1; i <= rangeSize; i++) {
    wheelThunks.left.unshift(adjustValue(baseH - thunkSize * i, 360))
    wheelThunks.right.push(adjustValue(baseH + thunkSize * i, 360))
  }

  return [...wheelThunks.left, baseH, ...wheelThunks.right].map(h => ({ h, s: baseColor.s, v: baseColor.v }));
}

// 邻近色
export function colorAnalogous(baseColor: HSV) {
  const baseH = Number.parseInt(baseColor.h.toString())

  const left = adjustValue(baseH - 30, 360)
  const right = adjustValue(baseH + 30, 360)

  return [left, baseH, right].map(h => ({ h, s: baseColor.s, v: baseColor.v }));
}

// 互补色
export function colorComplementary(baseColor: HSV) {
  const baseH = Number.parseInt(baseColor.h.toString())

  const left = adjustValue(baseH - 180, 360)

  return [baseH, left].map(h => ({ h, s: baseColor.s, v: baseColor.v }));
}

// 互补分裂色
export function colorSplitComplementary(baseColor: HSV) {
  const baseH = Number.parseInt(baseColor.h.toString())

  const left = adjustValue(baseH - 150, 360)
  const right = adjustValue(baseH + 150, 360)

  return [baseH, left, right].map(h => ({ h, s: baseColor.s, v: baseColor.v }));
}

// 三角色
export function colorTriadic(baseColor: HSV) {
  const baseH = Number.parseInt(baseColor.h.toString())

  const left = adjustValue(baseH - 120, 360)
  const right = adjustValue(baseH + 120, 360)

  return [baseH, left, right].map(h => ({ h, s: baseColor.s, v: baseColor.v }));
}

// 四元色
export function colorTetradic(baseColor: HSV) {
  const baseH = Number.parseInt(baseColor.h.toString())

  const left = adjustValue(baseH - 60, 360)
  const right = adjustValue(baseH + 120, 360)
  const antagonism = adjustValue(baseH + 180, 360)

  return [baseH, left, right, antagonism].map(h => ({ h, s: baseColor.s, v: baseColor.v }));
}

// 四方色
export function colorSquare(baseColor: HSV) {
  const baseH = Number.parseInt(baseColor.h.toString())

  const left = adjustValue(baseH - 90, 360)
  const antagonism = adjustValue(baseH - 180, 360)
  const right = adjustValue(baseH + 90, 360)

  return [baseH, left, antagonism, right].map(h => ({ h, s: baseColor.s, v: baseColor.v }));
}

// 颜色对比度等级
export function colorContrastLevel(baseColor: Color, targetColor: Color) {
  const contrast = readability(baseColor, targetColor) - 1

  switch (true) {
    case contrast <= 4.2:
      return {
        level: 'A',
        label: 'very poor'
      }
    case contrast <= 4.2 * 2:
      return {
        level: 'AA',
        label: 'poor'
      }
    case contrast <= 4.2 * 3:
      return {
        level: 'AAA',
        label: 'good'
      }
    case contrast <= 4.2 * 4:
      return {
        level: 'AAAA',
        label: 'very good'
      }
    case contrast <= 4.2 * 5:
      return {
        level: 'AAAAA',
        label: 'super'
      }
    default:
      return {
        level: 'AAAAA',
        label: 'super'
      }
  }
}
