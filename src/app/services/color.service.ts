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

  getHslFromOffset(color: string, offsets: ColorOffset['offsetArray'], dark?: Boolean): string {
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

    return `hsl(${colorPartials[0]},${colorPartials[1]}%,${colorPartials[2]}%)`;
  }
}
