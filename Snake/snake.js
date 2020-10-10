window.onload = function(){
    const ROWS = 8;
    const COLUMNS = 8;
    const CELLSIZE = 50;

    class View{
        static draw(map){
            const canvas = document.getElementById("snake");
            const ctx = canvas.getContext("2d");
            map.forEach((item, c) => {
                item.forEach((cell, r) => {
                    if(cell.isRoute){
                        ctx.fillStyle = "rgb(70, 120, 70)";
                        ctx.fillRect(c*CELLSIZE, r*CELLSIZE, CELLSIZE, CELLSIZE);
                    }
                    else{
                        ctx.strokeStyle = "rgb(70, 70, 70)";
                        ctx.strokeRect(c*CELLSIZE, r*CELLSIZE, CELLSIZE, CELLSIZE);
                    }
                });
            });
        }
    }

    class Cell{
        constructor(){
            this.isRoute = false;
        }

        change(){
            this.isRoute = !this.isRoute;
        }
    }

    class Board{
        constructor(){
            this.map = new Array(COLUMNS);
            for(let c = 0; c < COLUMNS; c++){
                this.map[c] = new Array(ROWS);
                for(let r = 0; r < ROWS; r++){
                    this.map[c][r] = new Cell();
                }
            }
        }
    }

    const board = new Board();
    View.draw(board.map);
    setInterval(() => {
    }, 1000)
    //snakeの方向によって描画
}