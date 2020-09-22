const ROW_MAX = 30;
const COL_MAX = 30;


function drawCanvas() {
  const canvas = document.getElementById('game_canvas');
  const ctx = canvas.getContext(`2d`);
 
  for (let r = 0; r < ROW_MAX; r++){
    for (let c = 0; c < COL_MAX; c++) {
        }
  }
}

function startGame(){
  while(1){
    Judge();
    Change();
  }
}

class Cell{
  constructor(ctx, r, c){
    this.isAlive = false;
    ctx.strokeStyle = '#DDDDDD'
    ctx.strokeRect(r*canvas.width/ROW_MAX, c*canvas.height/COL_MAX, canvas.width/ROW_MAX, canvas.height/COL_MAX);
    this.rect = rect
  }

  changeLife(){
    this.isAlive = !this.isAlive;
  } 
}