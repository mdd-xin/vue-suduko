export interface Box {
    value: number;
    x: number;
    y: number;
  }
export class Block implements Box {
    value: number;
    x: number;
    y: number;
    constructor(value: number, x: number, y: number) {
      this.value = value;
      this.x = x;
      this.y = y;
    }
} 
