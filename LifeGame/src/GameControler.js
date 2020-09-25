import {Cell} from './Cell.js'
import {Board} from './Board.js';

export const ROW_MAX = 30;
export const COL_MAX = 30;
export const Cell_width = 10;
export const Cell_height = 10;

// export const drawCanvas = () => {new GameControl();};

export class GameControler{
  constructor(){
    this.canvas = document.getElementById('game_canvas');
    this.ctx = this.canvas.getContext(`2d`);
    this.board = new Board();
    this.board.render(this.ctx);

    document.getElementById("start_btn").addEventListener('click', () =>this.startGame(), false);
    document.getElementById("stop_btn").addEventListener('click', () =>this.stopGame(), false);
    document.getElementById("reset_btn").addEventListener('click', () =>this.resetGame(), false);
    this.canvas.addEventListener('click', e => this.click(e), false);
  }

  startGame(){
    this.board.map.map.forEach(cell => {
      if(this.judge(cell)){
        console.log('change')
        cell.change();
      }
    });
    this.board.render(this.ctx);
    console.log('start')
  }

  judge(cell){
     // 周囲のマスの生存状況を確認
     let count = 0;
     for(let r = cell.row-1; r < cell.row+2; r++){
       for(let c = cell.col-1; c < cell.col+2; c++){
         if((r != cell.row || c != cell.col) && this.board.map.get(r,c).isAlive){
           count++;
         }
       }
     }
     console.log(`count = ${count}`);
 
     // 生存判定
     if(cell.isAlive){
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

  stopGame(){
    console.log('stop')
  }

  resetGame(){
    console.log('reset')
  }

  click(e){
    const rect = this.canvas.getBoundingClientRect();
    const point = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    this.board.map.map.forEach(cell => {
      if(cell.isClick(point)){
        cell.change();
      }
    });
    this.board.render(this.ctx);
  }
}


