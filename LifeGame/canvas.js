const ROW_MAX = 30;
const COL_MAX = 30;

function drawCanvas(){
  const canvas = document.getElementById('game_canvas');
  const ctx = canvas.getContext(`2d`);

  new Board();
}


class Board{
  constructor(){
    this.map = new Array(ROW_MAX*COL_MAX);
    for(let r = 0; r < ROW_MAX; r++){
      for(let c = 0; c < COL_MAX; c++){
        const cell = new Cell(r, c);
        this.generate(cell);
        this.map.push(cell);
      }
    }
  }

  generate(cell){
    ctx.stroke
  }
}

class Cell{
  constructor(row, col){
    this.row = row;
    this.col = col;
    this.isAlive = false;
  }

  changeLife(){
    this.isAlive = !this.isAlive;
  } 
}

function startGame(){
  while(1){
    Judge();
    Change();
  }
}

// document.getElementById("start_btn").addEventListener('click', () =>this.startGame(), false)
// document.getElementById("stop_btn").addEventListener('click', () =>this.startGame(), false)
// document.getElementById("reset_btn").addEventListener('click', () =>this.startGame(), false)
