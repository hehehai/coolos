import type { ColorInput, HSVA, Numberify } from '@ctrl/tinycolor';
import { TinyColor } from '@ctrl/tinycolor';
import type { CMYK, ColorGenInput, HSB, HSBA, RGB } from './interface';
import { round } from './util';

const convertHsb2Hsv = (color: ColorGenInput): ColorInput => {
  if (color && typeof color === 'object' && 'h' in color && 'b' in color) {
    const { b, ...resets } = color as HSB;
    return {
      ...resets,
      v: b,
    };
  }
  if (typeof color === 'string' && /hsb/.test(color)) {
    return color.replace(/hsb/, 'hsv');
  }
  return color as ColorInput;
};

export class Color extends TinyColor {
  constructor(color: ColorGenInput) {
    super(convertHsb2Hsv(color));
  }

  toHsbString() {
    const hsb = this.toHsb();
    const saturation = round(hsb.s * 100);
    const lightness = round(hsb.b * 100);
    const hue = round(hsb.h);
    const alpha = hsb.a;
    const hsbString = `hsb(${hue}, ${saturation}%, ${lightness}%)`;
    const hsbaString = `hsba(${hue}, ${saturation}%, ${lightness}%, ${alpha.toFixed(
      alpha === 0 ? 0 : 2,
    )})`;
    return alpha === 1 ? hsbString : hsbaString;
  }

  toHsb(): Numberify<HSBA> {
    let hsv = this.toHsv();
    if (typeof this.originalInput === 'object' && this.originalInput) {
      if ('h' in this.originalInput) {
        hsv = this.originalInput as Numberify<HSVA>;
      }
    }

    const { v, ...resets } = hsv;
    return {
      ...resets,
      b: hsv.v,
    };
  }

  toCmyk(): CMYK {
    return Color.rgbToCmyk(this.toRgb());
  }

  public static rgbToCmyk(rgb: Numberify<RGB>): CMYK {
    const k = 1 - Math.max(rgb.r / 255, rgb.g / 255, rgb.b / 255);
    const c = (1 - rgb.r / 255 - k) / (1 - k);
    const m = (1 - rgb.g / 255 - k) / (1 - k);
    const y = (1 - rgb.b / 255 - k) / (1 - k);

    return {
      c: isNaN(c) ? 0 : round(c * 100),
      m: isNaN(m) ? 0 : round(m * 100),
      y: isNaN(y) ? 0 : round(y * 100),
      k: round(k * 100),
    };
  }

  public static cmykToRgb(cmyk: CMYK): Numberify<RGB> {
    return {
      r: round(255 * (1 - cmyk.c / 100) * (1 - cmyk.k / 100)),
      g: round(255 * (1 - cmyk.m / 100) * (1 - cmyk.k / 100)),
      b: round(255 * (1 - cmyk.y / 100) * (1 - cmyk.k / 100)),
    }
  }

  public static cmykToRgbString(cmyk: CMYK): string {
    const rgb = Color.cmykToRgb(cmyk)
    return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
  }
}
