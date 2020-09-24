import {Cell} from './Cell.js'
import {ROW_MAX, COL_MAX, Cell_height, Cell_width} from './GameControler.js'

export class Board{
    constructor(){
      console.log('board')
      this.map = new Array(ROW_MAX+2, COL_MAX+2);
      this.board = new Array(ROW_MAX, COL_MAX);
      for(let r = 0; r < (ROW_MAX+2); r++){
        for(let c = 0; c < (COL_MAX+2); c++){
          const cell = new Cell(r, c);
          this.map.push(cell);
          if(r!=0 && c!=0 && r!=ROW_MAX+1 && c!=COL_MAX+1){
            this.board.push(cell);
          }
        }
      }
    }
  
    render(ctx){
      this.board.forEach(cell => {
        if(cell.isAlive){
          ctx.clearRect(cell.row*Cell_width, cell.col*Cell_height, Cell_width, Cell_height);  
          ctx.fillStyle = 'rgb(255, 190, 190)';
          ctx.fillRect(cell.row*Cell_width, cell.col*Cell_height, Cell_width, Cell_height);  
        }
        else{
          ctx.clearRect(cell.row*Cell_width, cell.col*Cell_height, Cell_width, Cell_height);  
          ctx.strokeStyle = 'rgb(200, 200, 200)';
          ctx.strokeRect(cell.row*Cell_width, cell.col*Cell_height, Cell_width, Cell_height);  
        }
      });
    }
  }
  