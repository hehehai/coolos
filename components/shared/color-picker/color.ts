import type { ColorInput, HSVA, Numberify } from '@ctrl/tinycolor';
import { TinyColor } from '@ctrl/tinycolor';
import type { CMYK, ColorGenInput, HSB, HSBA, LAB, RGB, XYZ } from './interface';
import { D50, adaptXyzToD65, adaptXyzaToD50, clampRgba, clampXyza, linearizeRgbChannel, round, unlinearizeRgbChannel } from './util';

// Conversion factors from https://en.wikipedia.org/wiki/CIELAB_color_space
const e = 216 / 24389;
const k = 24389 / 27;

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
        hsv.h = (this.originalInput as Numberify<HSVA>).h;
      }
    }

    const { h, s, v, a } = hsv;
    return { h, s, a, b: v };
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
      r: 255 * (1 - cmyk.c / 100) * (1 - cmyk.k / 100),
      g: 255 * (1 - cmyk.m / 100) * (1 - cmyk.k / 100),
      b: 255 * (1 - cmyk.y / 100) * (1 - cmyk.k / 100),
    }
  }

  public static cmykToRgbString(cmyk: CMYK): string {
    const rgb = Color.cmykToRgb(cmyk)
    return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
  }

  toXYZ(): XYZ {
    return Color.rgbaToXyz(this.toRgb());
  }

  /**
   * Converts an RGB color (D65) to CIE XYZ (D50)
   * https://image-engineering.de/library/technotes/958-how-to-convert-between-srgb-and-ciexyz
   */
  public static rgbaToXyz(rgb: Numberify<RGB>): XYZ {
    const sRed = linearizeRgbChannel(rgb.r);
    const sGreen = linearizeRgbChannel(rgb.g);
    const sBlue = linearizeRgbChannel(rgb.b);

    // Convert an array of linear-light sRGB values to CIE XYZ
    // using sRGB own white (D65 no chromatic adaptation)
    const xyza: XYZ = {
      x: (sRed * 0.4124564 + sGreen * 0.3575761 + sBlue * 0.1804375) * 100,
      y: (sRed * 0.2126729 + sGreen * 0.7151522 + sBlue * 0.072175) * 100,
      z: (sRed * 0.0193339 + sGreen * 0.119192 + sBlue * 0.9503041) * 100,
    };

    return clampXyza(adaptXyzaToD50(xyza));
  };

  /**
   * Converts an CIE XYZ color (D50) to RGBA color space (D65)
   * https://www.w3.org/TR/css-color-4/#color-conversion-code
   */
  public static xyzaToRgb(sourceXyza: XYZ): Numberify<RGB> {
    const xyz = adaptXyzToD65(sourceXyza);

    return clampRgba({
      r: unlinearizeRgbChannel(0.032404542 * xyz.x - 0.015371385 * xyz.y - 0.004985314 * xyz.z),
      g: unlinearizeRgbChannel(-0.00969266 * xyz.x + 0.018760108 * xyz.y + 0.00041556 * xyz.z),
      b: unlinearizeRgbChannel(0.000556434 * xyz.x - 0.002040259 * xyz.y + 0.010572252 * xyz.z),
    });
  };

  toLab(): LAB {
    return Color.rgbToLab(this.toRgb());
  }

  public static rgbToLab(rgb: Numberify<RGB>): LAB {
    // Compute XYZ scaled relative to D50 reference white
    const xyza = Color.rgbaToXyz(rgb);
    let x = xyza.x / D50.x;
    let y = xyza.y / D50.y;
    let z = xyza.z / D50.z;

    x = x > e ? Math.cbrt(x) : (k * x + 16) / 116;
    y = y > e ? Math.cbrt(y) : (k * y + 16) / 116;
    z = z > e ? Math.cbrt(z) : (k * z + 16) / 116;

    return {
      l: 116 * y - 16,
      a: 500 * (x - y),
      b: 200 * (y - z),
    };
  }

  public static labToRgb(laba: LAB): Numberify<RGB> {
    const y = (laba.l + 16) / 116;
    const x = laba.a / 500 + y;
    const z = y - laba.b / 200;

    return Color.xyzaToRgb({
      x: (Math.pow(x, 3) > e ? Math.pow(x, 3) : (116 * x - 16) / k) * D50.x,
      y: (laba.l > k * e ? Math.pow((laba.l + 16) / 116, 3) : laba.l / k) * D50.y,
      z: (Math.pow(z, 3) > e ? Math.pow(z, 3) : (116 * z - 16) / k) * D50.z,
    });
  }

  public static labToRgbString(lab: LAB): string {
    const rgb = Color.labToRgb(lab)
    return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
  }

  findClosestColor(colors: Array<{ name: string, rgb: number[] }>) {
    const rgb = this.toRgb();
    const { r: r1, g: g1, b: b1 } = rgb
    let smallest = Number.MAX_VALUE;
    let closestColor: string | undefined;

    colors.forEach(color => {
      let [r2, g2, b2] = color.rgb

      let total = Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2);

      if (total < smallest) {
        smallest = total;
        closestColor = color.name;
      }
    });

    return closestColor;
  }
}
