import {ROW_MAX, COL_MAX, Cell_height, Cell_width} from './GameControler.js'


export class Cell{
    constructor(row, col){
      console.log('cell')
      this.row = row;
      this.col = col;
      this.isAlive = false;
    }
  
    isClick(point){
      console.log(`${point.x} ${point.y}`)
      return ((this.row-1)*Cell_width <= point.x) && (point.x < (this.row)*Cell_width) && ((this.col-1)*Cell_height <= point.y) && (point.y < (this.col)*Cell_height);
    }
  
    // 生死の変更
    change(){
      if(this.row != 0 && this.roe != ROW_MAX+1 && this.col != 0 && this.col != COL_MAX+1){
        this.isAlive = !this.isAlive;
      }
    }
  
    judgeNextstage(map){
      // 周囲のマスの生存状況を確認
      let count = 0;
      for(let r = this.row-1; r < this.row+1; r++){
        for(let c = this.col-1; c < this.col+1; c++){
          count += map[r,c].isAlive;
        }
      }
      count -= this.isAlive;
  
      // 生存判定
      if(this.isAlive){
        if(count ===2 || count ===3){
          return true;
        }
        else{
          return false;
        }
      }
      else{
        if(count === 3){
          return true;
        }
        else{
          return false;
        }
      }
    }
  }