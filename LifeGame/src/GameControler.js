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
    this.isPlay = false;

    document.getElementById("start_btn").addEventListener('click', () =>{
      this.isPlay  = !this.isPlay;
      this.btn();
    }, false);
    document.getElementById("stop_btn").addEventListener('click', () =>{
      this.isPlay = !this.isPlay;
      this.btn();
    }, false);
    document.getElementById("reset_btn").addEventListener('click', () =>this.resetGame(), false);
    this.canvas.addEventListener('click', e => this.click(e), false);
  }

  btn(){
    let start
    
    if(this.isPlay){
      start = window.setInterval(() =>{
        let array = [];
        this.board.map.map.forEach(cell => {
          if(this.judge(cell)){
            array.push(cell);
            console.log('change')
          }
        });
        array.forEach(cell => {
          this.board.map.map[cell.row*(ROW_MAX+2)+cell.col].change();
        });
        this.board.render(this.ctx);
      }, 500);
    }
    else{
      clearInterval(start);
    }
    
      
  }

  judge(cell){
    if(cell.row != 0 && cell.col != 0 && cell.row != COL_MAX+1 && cell.col != COL_MAX+1){
      // 周囲のマスの生存状況を確認
     let count = 0;
     for(let r = cell.row-1; r <= cell.row+1; r++){
       for(let c = cell.col-1; c <= cell.col+1; c++){
         if(r != cell.row || c != cell.col){
           if(this.board.map.map[r*(ROW_MAX+2)+c].isAlive){
             count++;
           }
         }
       }
     } 
     // 生存判定
     if(this.board.map.map[cell.row*(ROW_MAX+2)+cell.col].isAlive){
       if(count ===2 || count ===3){
         return false;
       }
       else{
         return true;
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

  stopGame(){
    console.log('stop')
    this.isPlay = false;
  }

  resetGame(){
    console.log('reset')
    this.board.map.map.forEach(cell => {
      cell.change();
    });
    this.board.render(this.ctx);
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


