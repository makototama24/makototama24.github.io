const Color = {Enpty: "rgba(0,0,0,1)"}

class Player{
    #color
    
}

class Stone{
    #color
    #position
    constructor(color, pos){
       this.#color = color;
       this.#position = pos;
    }

    flip(aftercolor){
        this.#color = aftercolor;
    }

    set position(pos){
        this.#position = pos;
    }
}

class View{
    static createBasedBoard(board){
        const ctx = document.getElementById("game_canvas").getContext("2d");
        const bc = board.CELLSIZE;
        console.log(board)
        board.stoneMap.forEach((arr, i) => {
            arr.forEach((stone, j) => {
                ctx.fillStyle = 'rgb(150, 230, 150)';
                ctx.fillRect(j*bc, i*bc, bc, bc);
                ctx.strokeStyle = 'rgb(240, 240, 240)';
                ctx.lineWidth = 1;
                ctx.strokeRect(j*bc, i*bc, bc, bc);  
                ctx.strokeStyle = 'rgb(100, 100, 100)';
                ctx.beginPath();
                ctx.lineWidth = 10;
                ctx.strokeRect(0, 0, bc*board.ROWS, bc*board.COLUMNS);  
            });
        });
    }
}

//盤上に何の駒がおいてあるかというデータ
class Board{
    constructor(){
        this.ROWS = 8;
        this.COLUMN = 8;
        this.CELLSIZE = 30;

        this.stoneMap = new Array(this.COLUMNS);
        for(let c = 0; c < this.COLUMNS; c++){
            this.stoneMap[c] = new Array(this.ROWS);
            for(let r = 0; r < this.ROWS; r++){
                this.stoneMap[c][r] = new Stone(Color.Enpty, [c, r]);
            }
        }

        View.createBasedBoard(this);
    }
}

//ゲーム進行を担当
class Game{
    constructor(){
    this.view = new View();
    this.board = new Board();
    }
}

//----------------------------------------------------------------------------------

new Game();
