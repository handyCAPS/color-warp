import { HexToHslPipe } from './hex-to-hsl.pipe';

describe('HexToHslPipe', () => {
  it('create an instance', () => {
    const pipe = new HexToHslPipe();
    expect(pipe).toBeTruthy();
  });
});
