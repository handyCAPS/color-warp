import { Pipe, PipeTransform } from '@angular/core';
import { ColorService } from '../services/color.service';

@Pipe({
  name: 'hexToHsl'
})
export class HexToHslPipe implements PipeTransform {

  constructor(private colorService: ColorService) {}

  transform(value: string): string {
    return this.colorService.hexToHSL(value);
  }

}
