import { Injectable } from '@angular/core';
import { ColorOffset } from '../app.component';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  constructor() {}

  hexToHSL(hexColor: string) {
    // Convert hex to RGB first
    let red = 0,
      green = 0,
      blue = 0;
    if (hexColor.length == 4) {
      red = parseInt('0x' + hexColor[1] + hexColor[1]);
      green = parseInt('0x' + hexColor[2] + hexColor[2]);
      blue = parseInt('0x' + hexColor[3] + hexColor[3]);
    } else if (hexColor.length == 7) {
      red = parseInt('0x' + hexColor[1] + hexColor[2]);
      green = parseInt('0x' + hexColor[3] + hexColor[4]);
      blue = parseInt('0x' + hexColor[5] + hexColor[6]);
    }
    // Then to HSL
    red /= 255;
    green /= 255;
    blue /= 255;
    let cmin = Math.min(red, green, blue),
      cmax = Math.max(red, green, blue),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

    if (delta == 0) h = 0;
    else if (cmax == red) h = ((green - blue) / delta) % 6;
    else if (cmax == green) h = (blue - red) / delta + 2;
    else h = (red - green) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0) h += 360;

    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    h = Math.round(h);
    s = Math.round(s);
    l = Math.round(l);

    return 'hsl(' + h + ',' + s + '%,' + l + '%)';
  }

  hslToRgb(hsl: string): string {
    const hslArray = hsl.replace(/[^0-9,]/g, '').split(',');
    let h = parseInt(hslArray[0]);
    let s = parseInt(hslArray[1]);
    let l = parseInt(hslArray[2]);
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
      m = l - c / 2,
      r = 0,
      g = 0,
      b = 0;
    if (0 <= h && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (60 <= h && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (120 <= h && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (180 <= h && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (240 <= h && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (300 <= h && h < 360) {
      r = c;
      g = 0;
      b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }

  rgbToHex(rgbColor: string): string {
    let rgbArray = rgbColor.replace(/[rgb()]/g, '').split(',');

    const red = parseInt(rgbArray[0], 10).toString(16);
    const green = parseInt(rgbArray[1], 10).toString(16);
    const blue = parseInt(rgbArray[2], 10).toString(16);

    return `#${red}${green}${blue}`;
  }

  hslToHex(hslColor: string): string {
    const rgbColor = this.hslToRgb(hslColor);
    return this.rgbToHex(rgbColor);
  }

  getHslFromOffset(
    color: string,
    offsets: ColorOffset['offsetArray'],
    dark?: Boolean
  ): string {
    const hslColor = this.hexToHSL(color);
    const colorPartials = hslColor
      .replace(/[^0-9,]/g, '')
      .split(',')
      .map((partial, index) => {
        let partialNumber = parseInt(partial);
        switch (index) {
          case 0:
            partialNumber = Math.max(
              0,
              Math.min(partialNumber + offsets[index], 360)
            );
            break;
          case 1:
            partialNumber = Math.max(
              0,
              Math.min(partialNumber + offsets[index], 100)
            );
            break;
          case 2:
            partialNumber = Math.max(
              0,
              Math.min(partialNumber + offsets[index], 100)
            );
            break;
        }
        return partialNumber;
      });

    return `hsl(${colorPartials[0]}, ${colorPartials[1]}%, ${colorPartials[2]}%)`;
  }

  getLightnessFromHsl(hslColor: string): number {
    const colorPartials = hslColor.replace(/[^0-9,]/g, '').split(',');

    return parseInt(colorPartials[2]);
  }
}
