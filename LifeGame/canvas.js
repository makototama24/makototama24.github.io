const ROW_MAX = 30;
const COL_MAX = 30;
const canvas = document.getElementById('game_canvas');

function drawCanvas(){
  console.log('draw')
  const board = new Board();
}


class Board{
  constructor(){
    console.log('board');
    this.map = new Array(ROW_MAX*COL_MAX);
    for(let r = 0; r < ROW_MAX; r++){
      for(let c = 0; c < COL_MAX; c++){
        const cell = new Cell(r, c);
        this.map.push(cell);
      }
    }
  }
}

class Cell{
  constructor(row, col){
    console.log('cell')
    this.row = row;
    this.col = col;
    if((row+col)%2 === 0){
      this.isAlive = true;
    }
    else{
      this.isAlive = false;
    }
    this.cell = canvas.getContext(`2d`);
    this.render();
  }

  render(){
    if(this.isAlive){
      this.cell.fillStyle = 'rgb(255, 190, 190)';
      this.cell.fillRect(this.row*canvas.width/ROW_MAX, this.col*canvas.height/COL_MAX, canvas.width/ROW_MAX, canvas.height/COL_MAX);
    }
    else{
      this.cell.strokeStyle = 'rgb(200, 200, 200)';
      this.cell.strokeRect(this.row*canvas.width/ROW_MAX, this.col*canvas.height/COL_MAX, canvas.width/ROW_MAX, canvas.height/COL_MAX);
    }
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
