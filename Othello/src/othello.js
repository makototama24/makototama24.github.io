const Color = {
    Enpty: "rgba(0, 0, 0, 0)", 
    Player1: "rgb(255, 255, 255)",
    Player2: "rgb(50, 50, 50)"
}

class Player{
    constructor(turn, board){
        if(turn == 1){
            this.color = Color.Player1;
            this.oppositeColor = Color.Player2;
        }
        else{
            this.color = Color.Player2;
            this.oppositeColor = Color.Player1;
        }
        this.board = board;
    }

    putStone(row, column, stoneMap){
        stoneMap[row][column].flip(this.oppositeColor);
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

    puttableCellList(row, column, player){
        const puttableCellList = new Array();

        //up
        const up = new Array();
        for(let i = 0; i < row; i++){
            up.push(this.stoneMap[i][column])
        }
        const mystone = new Array();
        for(let i = up.length-1; i >= 0; i--){
            if(up[i].color == Color.Enpty) break;
            else if(up[i].color == player.color){
                mystone.push(up[i]);
            }
        }
        if(mystone.length != 0 && mystone[0].position[0] + 1 < row){
            for(let i = mystone[0].position[0]+1; i < row; i++){
                puttableCellList.push(this.stoneMap[i][column])
            }
        }

        //down
        const down = new Array();
        for(let i = row+1; i < this.ROWS; i++){
            down.push(this.stoneMap[i][column])
        }
        mystone.length = 0;
        for(let i = 0; i < down.length; i++){
            if(down[i].color == Color.Enpty) break;
            else if(down[i].color == player.color){
                mystone.push(down[i]);
            }
        }
        if(mystone.length != 0 && mystone[0].position[0] > row + 1){
            for(let i = row+1; i < mystone[0].position[0]; i++){
                puttableCellList.push(this.stoneMap[i][column])
            }
        }


        //left
        const left = new Array();
        for(let i = 0; i < column; i++){
            left.push(this.stoneMap[row][i])
        }
        mystone.length = 0
        for(let i = left.length-1; i >= 0; i--){
            if(left[i].color == Color.Enpty) break;
            else if(left[i].color == player.color){
                mystone.push(left[i]);
            }
        }
        if(mystone.length != 0 && mystone[0].position[1] + 1 < column){
            for(let i = mystone[0].position[1]+1; i < column; i++){
                puttableCellList.push(this.stoneMap[row][i])
            }
        }

        //right
        const right = new Array();
        for(let i = column+1; i < this.COLUMNS; i++){
            right.push(this.stoneMap[row][i])
        }
        mystone.length = 0;
        for(let i = 0; i < right.length; i++){
            if(right[i].color == Color.Enpty) break;
            else if(right[i].color == player.color){
                mystone.push(right[i]);
            }
        }
        if(mystone.length != 0 && mystone[0].position[1] > column + 1){
            for(let i = column+1; i < mystone[0].position[1]; i++){
                puttableCellList.push(this.stoneMap[row][i])
            }
        }
        console.log(puttableCellList)

        return puttableCellList;
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

        const list = this.board.puttableCellList(willROW, willCOLUMN, this.playerList[this.playerTurn]);
        if(list.length){
            View.viewBoard(this.board);
            this.playerTurn++;
        }
    }
}

//----------------------------------------------------------------------------------

new Game();
