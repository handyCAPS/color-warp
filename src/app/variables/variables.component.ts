import { Component, OnInit, Input } from '@angular/core';
import { ColorBlock } from '../app.component';
import { ColorService } from '../services/color.service';

@Component({
  selector: 'cpx-variables',
  templateUrl: './variables.component.html',
  styleUrls: ['./variables.component.scss'],
})
export class VariablesComponent implements OnInit {
  @Input() colorBlocks: ColorBlock[];

  prefix = 'c';

  asRgb = false;

  colorSystem: 'hsl' | 'hex' | 'rgb' = 'hsl';

  constructor(private colorService: ColorService) {}

  ngOnInit(): void {}

  getColorLine(
    colorName: string,
    offsetName: string,
    color: string,
    isHex?: boolean
  ): string {
    if (isHex) {
      color = this.colorService.hexToHSL(color);
    }
    switch(this.colorSystem) {
      case 'hex':
        color = this.colorService.hslToHex(color);
        break;
      case 'rgb':
        color = this.colorService.hslToRgb(color);
        break;
    }
    const offsetSeperator = offsetName ? '-' : '';
    return `${this.fixPrefix(
      this.prefix
    )}-${colorName}${offsetSeperator}${offsetName}: ${color};`.toLowerCase();
  }

  fixPrefix(value: string): string {
    const fixed = value.toLowerCase().replace(/-/g, '') || 'c';
    return `--${fixed}`;
  }
}
