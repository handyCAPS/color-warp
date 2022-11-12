import { Component, Input, OnInit } from '@angular/core';
import { ColorBlock, ColorOffset } from '../app.component';
import { ColorService } from '../services/color.service';

@Component({
  selector: 'cpx-color-block',
  templateUrl: './color-block.component.html',
  styleUrls: ['./color-block.component.scss'],
})
export class ColorBlockComponent implements OnInit {
  @Input() color: ColorBlock;

  constructor(private colorService: ColorService) {}

  ngOnInit(): void {
    this.color.color = this.colorService.getHslFromOffset(
      this.color.color,
      [0, 2, 1]
    );
  }
}
