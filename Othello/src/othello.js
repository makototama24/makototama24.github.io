const Color = {
    Enpty: "rgba(0, 0, 0, 0)", 
    Player1: "rgb(255, 255, 255)",
    Player2: "rgb(50, 50, 50)"
}

class Player{
    constructor(turn, board){
        this.color = turn === 1 ? Color.Player1 : Color.Player2;
        this.board = board;
    }

    isAblePut(row, column, stoneMap){
        console.log(`${stoneMap} map`)
        if(stoneMap[row][column].color == Color.Enpty){
            const isOppositeStone = function(stone){ return stone.color != this.color && stone.color != Color.Enpty };
            console.log(stoneMap)
            upFarthestStone = stoneMap.slice(0,row).filter(isOppositeStone)[0]
            downFarthestStone = stoneMap.slice(row+1,this.board.ROWS).filter(isOppositeStone)[0]
            leftFarthestStone = stoneMap.slice(0,column).filter(isOppositeStone)[0]
            rightFarthestStone = stoneMap.slice(column, this.board.COLUMNS).filter(isOppositeStone)[0]
            console.log(upFarthestStone, downFarthestStone, leftFarthestStone, rightFarthestStone);
        }     
      else return false; 
    }

    putStone(row, column, stoneMap){
        stoneMap[row][column].color = this.color;
    }
}

class Stone{
    constructor(color, pos){
       this.color = color;
       this.position = pos;
    }

    flip(aftercolor){
        this.color = aftercolor;
    }
}

class View{
    static viewBoard(board){
        const ctx = document.getElementById("game_canvas").getContext("2d");
        const bc = board.CELLSIZE;

        board.stoneMap.forEach((arr, i) => {
            arr.forEach((stone, j) => {
                //boardマスの描画
               ctx.fillStyle = 'rgb(150, 230, 150)';
               ctx.fillRect(j*bc, i*bc, bc, bc);
               ctx.strokeStyle = 'rgb(240, 240, 240)';
               ctx.lineWidth = 1;
               ctx.strokeRect(j*bc, i*bc, bc, bc);  
               ctx.strokeStyle = 'rgb(100, 100, 100)';

               //stoneの描画
               ctx.beginPath();
               ctx.fillStyle = stone.color;
               ctx.moveTo((j+0.5)*bc, (i+1)*bc);
               ctx.arc((j+0.5)*bc, (i+0.5)*bc, bc*3.5/10, 0, Math.PI*2, true);
               ctx.fill();
            });
        })
        ctx.lineWidth = 10;
        ctx.strokeRect(0, 0, bc*board.ROWS, bc*board.COLUMNS);  
    }
}

//盤上に何の駒がおいてあるかというデータ
class Board{
    constructor(){
        this.ROWS = 8;
        this.COLUMNS = 8;
        this.CELLSIZE = 80;

        this.stoneMap = new Array(this.COLUMNS);
        for(let c = 0; c < this.COLUMNS; c++){
            this.stoneMap[c] = new Array(this.ROWS);
            for(let r = 0; r < this.ROWS; r++){
                this.stoneMap[c][r] = new Stone(Color.Enpty, [c, r]);
            }
        }
        this.stoneMap[3][3].color = Color.Player1;
        this.stoneMap[4][4].color = Color.Player1;
        this.stoneMap[3][4].color = Color.Player2;
        this.stoneMap[4][3].color = Color.Player2;
        View.viewBoard(this);
    }
}

//ゲーム進行を担当
class Game{
    constructor(){
    this.canvas = document.getElementById("game_canvas");
    this.view = new View();
    this.board = new Board();
    this.playerList = [new Player(0, this.board), new Player(1, this.board)]
    this.playerTurn = 0;

    this.canvas.addEventListener('click', e => this.click(e), false);
    }

    click(e){
        const rect = this.canvas.getBoundingClientRect();
        const point = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };

        const willCOLUMN = Math.floor(point.x / this.board.CELLSIZE);
        const willROW = Math.floor(point.y / this.board.CELLSIZE);
        if(this.playerList[this.playerTurn % 2].isAblePut(willROW, willCOLUMN, this.board.stoneMap)){
            this.playerList[this.playerTurn % 2].putStone(willROW, willCOLUMN, this.board.stoneMap);

            View.viewBoard(this.board);
            this.playerTurn++;
        }
    }
}

//----------------------------------------------------------------------------------

new Game();
