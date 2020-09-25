import {ROW_MAX, COL_MAX, Cell_height, Cell_width} from './GameControler.js'


export class Cell{
    constructor(row, col){
      this.row = row;
      this.col = col;
      this.isAlive = false;
    }
  
    isClick = (point) =>  ((this.row-1)*Cell_width <= point.x) && (point.x < (this.row)*Cell_width) && ((this.col-1)*Cell_height <= point.y) && (point.y < (this.col)*Cell_height)
  
    // 生死の変更
    change(){
        this.isAlive = !this.isAlive;
    }
  }