import { Component, OnInit, Input } from '@angular/core';
import { ColorBlock } from '../app.component';

@Component({
  selector: 'cpx-variables',
  templateUrl: './variables.component.html',
  styleUrls: ['./variables.component.scss'],
})
export class VariablesComponent implements OnInit {
  @Input() colorBlocks: ColorBlock[];

  prefix = 'c';

  constructor() {}

  ngOnInit(): void {}

  getColorLine(colorName: string, offsetName: string, color: string): string {
    return `${this.fixPrefix(
      this.prefix
    )}-${colorName}-${offsetName}: ${color};`.toLowerCase();
  }

  fixPrefix(value: string): string {
    const fixed = value.toLowerCase().replace(/-/g, '') || 'c';
    return `--${fixed}`;
  }
}
