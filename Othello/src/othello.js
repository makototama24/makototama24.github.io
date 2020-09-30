enum color = {}

class GameController{
    constructor(){
        this.canvas = document.getElementById("game_canvas");
        this.width = 8;
        this.height = 8;
        this.cellSize = 80;
        this.board = new Board(this.width, this.height, this.cellSize, this.canvas);
    }
}

class Board{
    constructor(width, height, cellsize, canvas){
        this.boardWidth = width;
        this.boardHeight = height;
        this.cellSize = cellsize;
        this.ctx = canvas.getContext("2d");
        this.stoneMap = new Array(height);
        for(let i = 0; i < this.boardHeight; i++){
            this.stoneMap[i] = new Array(width);
            for(let j = 0; j < this.boardWidth; j++){
                this.stoneMap[i][j] = new Stone("B", [i, j]);
            }
        }

        this.createBasedBoard();
    }

    createBasedBoard(){
        this.stoneMap.forEach((arr, i) => {
            arr.forEach((stone, j) => {
                this.ctx.fillStyle = 'rgb(150, 230, 150)';
                this.ctx.fillRect(j*this.cellSize, i*this.cellSize, this.cellSize, this.cellSize);
                this.ctx.strokeStyle = 'rgb(240, 240, 240)';
                this.ctx.lineWidth = 1;
                this.ctx.strokeRect(j*this.cellSize, i*this.cellSize, this.cellSize, this.cellSize);  
                this.ctx.strokeStyle = 'rgb(100, 100, 100)';
                this.ctx.beginPath();
                this.ctx.lineWidth = 10;
                this.ctx.strokeRect(0, 0, this.cellSize*this.boardHeight, this.cellSize*this.boardWidth);  
            });
        });
    }
}

class Player{
    constructor(){

    }
}

class Stone{
    constructor(colorstone){
        this.color = colorstone.color;
        this.position = 
    }

    getColor(){
        this.colorstone.color();
    }
}

class BlackStone extends Stone{
    constructors(){
        this.color = 'rgb(0,0,0)'
    }
}


//----------------------------------------------------------------------------------

new GameController();
