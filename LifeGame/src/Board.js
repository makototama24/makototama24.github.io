import {Cell} from './Cell.js';
import {ROW_MAX, COL_MAX, Cell_height, Cell_width} from './GameControler.js';
import { Map } from './Map.js';

export class Board{
    constructor(){
      this.map = new Map();
      for(let r = 0; r < (ROW_MAX+2); r++){
        for(let c = 0; c < (COL_MAX+2); c++){
          const cell = new Cell(r, c);
          this.map.push(cell);
        }
      }
    }
  
    render(ctx, isPlay){
      this.map.map.forEach(cell => {
        if(cell.row!=0 && cell.col!=0 && cell.row!=ROW_MAX+1 && cell.col!=COL_MAX+1){
          if(cell.isAlive){
            ctx.clearRect((cell.row-1)*Cell_width, (cell.col-1)*Cell_height, Cell_width, Cell_height);  
            ctx.fillStyle = 'rgb(255, 170, 170)';
            ctx.fillRect((cell.row-1)*Cell_width, (cell.col-1)*Cell_height, Cell_width, Cell_height);  
          }
          else{
            if(isPlay){
              ctx.clearRect((cell.row-1)*Cell_width, (cell.col-1)*Cell_height, Cell_width, Cell_height);  
              ctx.strokeStyle = 'rgb(230, 230, 230)';
              ctx.strokeRect((cell.row-1)*Cell_width, (cell.col-1)*Cell_height, Cell_width, Cell_height);  
            }
            else{
              ctx.clearRect((cell.row-1)*Cell_width, (cell.col-1)*Cell_height, Cell_width, Cell_height);  
              ctx.strokeStyle = 'rgb(210, 210, 210)';
              ctx.strokeRect((cell.row-1)*Cell_width, (cell.col-1)*Cell_height, Cell_width, Cell_height);   
            }
          }
        }
      });
    }
  }
  