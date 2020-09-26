import {Cell} from './Cell.js'
import {Board} from './Board.js';

export const ROW_MAX = 50;
export const COL_MAX = 50;
export const Cell_width = 10;
export const Cell_height = 10;

// export const drawCanvas = () => {new GameControl();};

export class GameControler{
  constructor(){
    this.canvas = document.getElementById('game_canvas');
    this.ctx = this.canvas.getContext(`2d`);
    this.board = new Board();
    this.isPlay = false;
    this.InitLife();
    console.log(this.board.map.map)
    this.board.render(this.ctx, this.isPlay);
    this.startfunction;

    document.getElementById("start_btn").addEventListener('click', () =>{
      this.isPlay  = !this.isPlay;
      this.startLife();
    }, false);
    document.getElementById("stop_btn").addEventListener('click', () =>{
      this.isPlay = !this.isPlay;
      this.stopLife();
    }, false);
    document.getElementById("reset_btn").addEventListener('click', () =>this.resetGame(), false);
    this.canvas.addEventListener('click', e => this.click(e), false);
  }

  InitLife(){
    this.board.map.map[4, 10].isAlive = true;
    this.board.map.map[4, 11].isAlive = true;
    this.board.map.map[5, 10].isAlive = true;
    this.board.map.map[5, 11].isAlive = true;
    this.board.map.map[14, 10].isAlive = true;
    this.board.map.map[14, 11].isAlive = true;
    this.board.map.map[14, 12].isAlive = true;
    this.board.map.map[15, 9].isAlive = true;
    this.board.map.map[15, 13].isAlive = true;
    this.board.map.map[16, 8].isAlive = true;
    this.board.map.map[16, 14].isAlive = true;
    this.board.map.map[17, 8].isAlive = true;
    this.board.map.map[17, 14].isAlive = true;
    this.board.map.map[18, 11].isAlive = true;
    this.board.map.map[19, 9].isAlive = true;
    this.board.map.map[19, 13].isAlive = true;
    this.board.map.map[20, 10].isAlive = true;
    this.board.map.map[20, 11].isAlive = true;
    this.board.map.map[20, 12].isAlive = true;
    this.board.map.map[21, 11].isAlive = true;
    this.board.map.map[24, 8].isAlive = true;
    this.board.map.map[26, 8].isAlive = true;
    this.board.map.map[26, 9].isAlive = true;
    this.board.map.map[26, 10].isAlive = true;
    this.board.map.map[27, 8].isAlive = true;
    this.board.map.map[27, 9].isAlive = true;
    this.board.map.map[28, 7].isAlive = true;
    this.board.map.map[28, 11].isAlive = true;
    this.board.map.map[30, 6].isAlive = true;
    this.board.map.map[30, 7].isAlive = true;
    this.board.map.map[30, 11].isAlive = true;
    this.board.map.map[30, 12].isAlive = true;
    this.board.map.map[40, 8].isAlive = true;
    this.board.map.map[40, 9].isAlive = true;
    this.board.map.map[41, 8].isAlive = true;
    this.board.map.map[41, 9].isAlive = true;
  }

  startLife(){
    this.startfunction = window.setInterval(() =>{
      let array = [];
      this.board.map.map.forEach(cell => {
        if(this.judge(cell)){
          array.push(cell);
        }
      });
      array.forEach(cell => {
        this.board.map.map[cell.row*(ROW_MAX+2)+cell.col].change();
      });
      this.board.render(this.ctx, this.isPlay);
    }, 150);
  }

  stopLife(){
    clearInterval(this.startfunction);
    this.board.render(this.ctx, this.isPlay)
  }

  resetGame(){
    this.isPlay = false;
    clearInterval(this.startfunction);
    this.board.map.map.forEach(cell => {
      cell.isAlive = false;
    });
    this.board.render(this.ctx, this.isPlay);
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
    this.board.render(this.ctx, this.isPlay);
  }
}


