import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { filter, map } from 'rxjs';
import { ColorBlock, ColorOffset } from '../app.component';
import { ColorService } from '../services/color.service';

@Component({
  selector: 'cpx-color-block',
  templateUrl: './color-block.component.html',
  styleUrls: ['./color-block.component.scss'],
})
export class ColorBlockComponent implements OnInit, AfterViewInit {
  @Input() color: ColorBlock;

  public backgroundColor: string = '#FFF';

  @ViewChild('colorForm') colorForm: NgForm;

  constructor(private colorService: ColorService) {}

  ngOnInit(): void {
    this.mapOffsets(this.color?.color);
    this.backgroundColor = this.color?.color;
  }

  ngAfterViewInit(): void {
    if (this.colorForm) {
      this.colorForm.valueChanges
        ?.pipe(
          filter((values) => {
            const correctLength =
              values.color?.length === 4 || values.color?.length === 7;
            return (this.colorForm.dirty as boolean) && correctLength;
          }),
          map((values) => values.color)
        )
        .subscribe((currentColor) => {
          this.backgroundColor = currentColor;
          this.color.color = currentColor;
          this.mapOffsets(currentColor);
        });
    }
  }

  mapOffsets(color: string) {
    this.color.offsets = [
      ...this.color.offsets.map((offset) => ({
        ...offset,
        value: this.colorService.getHslFromOffset(color, offset.offsetArray),
      })),
    ];
  }
}
