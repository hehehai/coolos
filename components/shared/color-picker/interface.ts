import type { Color } from './color';
import { HSL, HSV } from "@ctrl/tinycolor/dist/interfaces";

export interface HSB {
  h: number | string;
  s: number | string;
  b: number | string;
}

export interface RGB {
  r: number | string;
  g: number | string;
  b: number | string;
}

export interface CMYK {
  c: number;
  m: number;
  y: number;
  k: number;
}

export interface LAB {
  l: number;
  a: number;
  b: number;
}

export interface XYZ {
  x: number;
  y: number;
  z: number;
}

export interface HSVA extends HSV {
  a: number;
}

export interface HSLA extends HSL {
  a: number;
}

export interface RGBA extends RGB {
  a: number;
}

export interface HSBA extends HSB {
  a: number;
}

export type ColorGenInput<T = Color> =
  | string
  | number
  | RGB | RGBA
  | HSB | HSBA
  | HSL | HSLA
  | HSV | HSVA
  | T;

export type TransformOffset = {
  x: number;
  y: number;
};

export interface BaseColorAtomProps {
  className?: string;
  initOffset?: TransformOffset;
  value?: ColorGenInput;
  defaultValue?: ColorGenInput;
  layerPoints?: Color[];
  disabled?: boolean;
  onChange?: (color: Color) => void
}

export enum ColorAtomType {
  Hex = 'HEX',
  Hue = 'hue',
  Saturation = 'saturation',
  Brightness = 'brightness',
  Alpha = 'alpha',
  Luminance = 'luminance',
  Red = 'red',
  Green = 'green',
  Blue = 'blue',
  Cyan = 'cyan',
  Magenta = 'magenta',
  Yellow = 'yellow',
  Black = 'black',
  GreenRed = 'green-red',
  BlueYellow = 'blue-yellow',
}

export interface CommonPickerPanelProps {
  value?: ColorGenInput;
  defaultValue?: ColorGenInput;
  layerPoints?: Color[];
  onChange?: (color: Color, type: ColorAtomType) => void
}
