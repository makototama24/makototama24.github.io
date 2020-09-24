const ROW_MAX = 30;
const COL_MAX = 30;
const Cell_width = 10;
const Cell_height = 10;
const drawCanvas = () => {new GameControl();};


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

  render(ctx){
    this.map.forEach(cell => {
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


class Cell{
  constructor(row, col){
    console.log('cell')
    this.row = row;
    this.col = col;
    this.isAlive = false;
  }

  isClick(point){
    return (this.row*Cell_width <= point.x) && (point.x < (this.row+1)*Cell_width) && (this.col*Cell_height <= point.y) && (point.y < (this.col+1)*Cell_height);
  }

  clicked(){
    this.isAlive = !this.isAlive;
    console.log('clicked')
  }
}

class GameControl{
  constructor(){
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
        cell.clicked();
      }
    });
    this.board.render(this.ctx);
  }
}


