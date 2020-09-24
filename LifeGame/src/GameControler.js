import {Cell} from './Cell.js'
import {Board} from './Board.js';

const ROW_MAX = 30;
const COL_MAX = 30;
const Cell_width = 10;
const Cell_height = 10;

// export const drawCanvas = () => {new GameControl();};

export class GameControler{
  constructor(){
    console.log('gamecontrol')
    this.canvas = document.getElementById('game_canvas');
    this.ctx = this.canvas.getContext(`2d`);
    this.board = new Board();
    this.board.render(this.ctx);

    document.getElementById("start_btn").addEventListener('click', () =>this.startGame(), false);
    document.getElementById("stop_btn").addEventListener('click', () =>this.stopGame(), false);
    document.getElementById("reset_btn").addEventListener('click', () =>this.resetGame(), false);
    this.canvas.addEventListener('click', e => this.clickCanvas(e), false);
  }

  startGame(){
    this.board.map.forEach(cell => {
      if(cell.judgeNextstage(this.board.map)){
        cell.change();
      }
    })
    console.log('start')
  }

  stopGame(){
    console.log('stop')
  }

  resetGame(){
    console.log('reset')
  }

  clickCanvas(e){
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


