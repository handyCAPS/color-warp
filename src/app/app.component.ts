import { Component } from '@angular/core';

export interface ColorBlock {
  color: string;
  name: 'Primary' | 'Info' | 'Success' | 'Danger' | 'Warning';
  offsets: ColorOffset[];
}

export interface ColorOffset {
  label:
    | 'Dark-1'
    | 'Dark-2'
    | 'Dark-2'
    | 'Dark-3'
    | 'Dark-4'
    | 'Dark-5'
    | 'Light-1'
    | 'Light-2';
  offsetArray: [number, number, number];
  value: string;
}

@Component({
  selector: 'cpx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  offsets: ColorOffset[] = [
    {
      label: 'Dark-1',
      value: '',
      offsetArray: [0, 0, -5],
    },
    {
      label: 'Dark-2',
      value: '',
      offsetArray: [0, 1, -10],
    },
    {
      label: 'Dark-3',
      value: '',
      offsetArray: [0, 1, -17],
    },
    {
      label: 'Dark-4',
      value: '',
      offsetArray: [-1, 0, -30],
    },
    // {
    //   label: 'Dark-5',
    //   value: '',
    //   offsetArray: [0, -10, -20],
    // },
    {
      label: 'Light-1',
      value: '',
      offsetArray: [-1, 19, 20],
    },
    {
      label: 'Light-2',
      value: '',
      offsetArray: [-1, 0, 40],
    },
  ];

  colorBlocks: ColorBlock[] = [
    {
      color: '#337ab7',
      name: 'Primary',
      offsets: [],
    },
    {
      color: '#5bc0de',
      name: 'Info',
      offsets: [],
    },
  ];

  constructor() {
    for (const key in this.colorBlocks) {
      this.colorBlocks[key] = {
        ...this.colorBlocks[key],
        offsets: [...this.offsets].map((offset) => ({ ...offset })),
      };
    }
  }
}
