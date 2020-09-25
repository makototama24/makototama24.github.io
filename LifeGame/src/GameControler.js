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
    this.board.map.forEach(cell => {
      console.log(`${this.board.map}`)
      if(cell.judgeNextstage(this.board.map)){
        console.log('change')
        cell.change();
      }
    });
    this.board.render(this.ctx);
    console.log('start')
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
    this.board.map.forEach(cell => {
      if(cell.isClick(point)){
        cell.change();
      }
    });
    this.board.render(this.ctx);
  }
}


