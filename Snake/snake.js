window.onload = function(){
    const ROWS = 8;
    const COLUMNS = 8;
    const CELLSIZE = 50;

    class View{
        static draw(map){
            const canvas = document.getElementById("snake");
            const ctx = canvas.getContext("2d");

            map.forEach((cell, i) => {
                const c = i%(COLUMNS+2);
                const r = Math.floor(i/(COLUMNS+2));
                if(c!=0 && c!=COLUMNS+1 && r!=0 && r!=ROWS+1){
                    ctx.clearRect((c-1)*CELLSIZE, (r-1)*CELLSIZE, CELLSIZE, CELLSIZE);  
                    if(cell.isRoute){
                        ctx.fillStyle = "rgb(170, 220, 170)";
                        ctx.fillRect((c-1)*CELLSIZE, (r-1)*CELLSIZE, CELLSIZE, CELLSIZE);
                    }
                    else{
                        ctx.strokeStyle = "rgb(70, 70, 70)";
                        ctx.strokeRect((c-1)*CELLSIZE, (r-1)*CELLSIZE, CELLSIZE, CELLSIZE);
                    }
                }
            });
        }
    }

    class Cell{
        constructor(){
            this.isRoute = false;
        }

        clear(){
            this.isRoute = false;
        }

        change(){
            this.isRoute = !this.isRoute;
        }
    }

    class Board{
        constructor(){
            this.map = new Array((COLUMNS+2)*(ROWS+2));
            for(let i = 0; i < (COLUMNS+2)*(ROWS+2); i++){
                this.map[i] = new Cell();
            }
        }
    }

    class Game{
        constructor(){
            this.board = new Board();
            View.draw(this.board.map);
        
            this.snakePos = [65, 55, 45];
            this.add = [-1, 1, -COLUMNS-2, COLUMNS+2];
            this.snakeDirection = 3;
            //setIntervalのthis問題を回避
            setInterval(this.move, 400, this);
        }

        move(game){
            for(let i = game.snakePos.length-1; 0<=i; i--){
                if(i!=0) game.snakePos[i] = game.snakePos[i-1];
                else{
                    game.snakePos[i] += game.add[game.snakeDirection];
                    const col = game.snakePos[i] % (COLUMNS+2);
                    const row = Math.floor(game.snakePos[i]/(COLUMNS+2));

                    if(col== 0) game.snakePos[i] += COLUMNS;
                    else if(col == COLUMNS+1) game.snakePos[i] -= COLUMNS;
                    else if(row == 0) game.snakePos[i] += (COLUMNS+2)*ROWS;
                    else if(row == ROWS+1) game.snakePos[i] -= (COLUMNS+2)*ROWS;
                }
            }
            game.board.map.forEach(cell => cell.clear());
            game.snakePos.forEach(pos => game.board.map[pos].change());
            View.draw(game.board.map);
        }
    }

   new Game();
}