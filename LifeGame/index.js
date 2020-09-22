function draw() {
    const canvas = document.getElementById('game_canvas');
    const ctx = canvas.getContext(`2d`);
    const row_max = 30;
    const col_max = 30;

    for (let r = 0; r < row_max; r++){
      for (let c = 0; c < col_max; c++) {
        ctx.strokeStyle = '#DDDDDD'
        ctx.strokeRect(r*canvas.width/row_max, c*canvas.height/col_max, canvas.width/row_max, canvas.height/col_max);
      }
    }
  }