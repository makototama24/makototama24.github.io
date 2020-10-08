
const BOARDSIZE = 8;
const CELLSIZE = 80;
const Color = {
    EMPTY: "rgba(0, 0, 0, 0)",
    PLAYER1: "rgb(50, 50, 50)",
    PLAYER2: "rgb(255, 255, 255)",
    BOARDBASED: "rgb(150, 230, 150)",
    BOARDLINE: "rgb(240, 240, 240)",
    BOARDFRAME: "rgb(100, 100, 100)"
}

class Stone{
    constructor(color, point){
        this.color = color;
        this.coordinate = point
        this.position = {
            x: point%BOARDSIZE,
            y: Math.floor(point/BOARDSIZE)
        }
    }

    flip(){
        //色反転
        if(this.color == Color.PLAYER1) this.color = Color.PLAYER2;
        else if(Color.PLAYER2) this.color = Color.PLAYER1;
    }
}

class Player{
    constructor(color){
        this.myStoneColor = color;
    }
    putStone(stone, map){
        //stoneを設置
        map[stone.coordinate] = stone;
    }
}

class View{
    static initDraw(map){
        const ctx = document.getElementById("game_canvas").getContext("2d");

        ctx.fillStyle = Color.BOARDBASED;
        ctx.fillRect(0, 0, BOARDSIZE*CELLSIZE, BOARDSIZE*CELLSIZE);
        map[3+4*BOARDSIZE].color = Color.PLAYER1;
        map[4+3*BOARDSIZE].color = Color.PLAYER1;
        map[3+3*BOARDSIZE].color = Color.PLAYER2;
        map[4+4*BOARDSIZE].color = Color.PLAYER2;
        this.draw(map);
    }

    static draw(map){
        const ctx = document.getElementById("game_canvas").getContext("2d");

        map.forEach((stone, i) => {
            const y = Math.floor(i / BOARDSIZE);
            const x = i - BOARDSIZE * y;
            //cellの描画
            ctx.strokeStyle = Color.BOARDLINE;
            ctx.lineWidth = 1;
            ctx.strokeRect(x*CELLSIZE, y*CELLSIZE, CELLSIZE, CELLSIZE);  

            ctx.beginPath();
            ctx.fillStyle = stone.color;
            ctx.moveTo((x+0.5)*CELLSIZE, (y+1)*CELLSIZE);
            ctx.arc((x+0.5)*CELLSIZE, (y+0.5)*CELLSIZE, CELLSIZE*3.5/10, 0, Math.PI*2, true);
            ctx.fill();
        });

        ctx.lineWidth = 10;
        ctx.strokeStyle = Color.BOARDFRAME
        ctx.strokeRect(0, 0, BOARDSIZE*CELLSIZE, BOARDSIZE*CELLSIZE);
    }
}

class Board{
    constructor(){
        this.map = new Array();
        for(let i = 0; i < BOARDSIZE*BOARDSIZE; i++){
            this.map.push(new Stone(Color.EMPTY, i));
        }
        View.initDraw(this.map);
    }
}

class GameController{
    constructor(){
        this.board = new Board();
        this.players = {
            player1: new Player(Color.PLAYER1), 
            player2: new Player(Color.PLAYER2)
        };
        this.isPlayer1Turn = true;

        this.canvas = document.getElementById("game_canvas");
        this.p1Count = document.getElementById("p1_count");
        this.p2Count = document.getElementById("p2_count");
        this.canvas.addEventListener("click", e => this.click(e));
        document.getElementById("reset").addEventListener("click", e => this.reset(e));
        document.getElementById("pass").addEventListener("click", e => this.pass(e));
    }

    checkToPutStone(stone){
        this.flippableStones = new Array();
        const map = this.board.map;
        //left-up, left, left-dwon, up, down, right-up, right, right-down
        const moveCell = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
        for(let i = 0; i < 8; i++){
            const arr = new Array();
            let x = stone.position.x;
            let y = stone.position.y;
            while(0<=x && x<8 && 0<=y && y<8){
                arr.push(map[x+y*BOARDSIZE])
                x += moveCell[i][0];
                y += moveCell[i][1];
            }
            let index = 1;
            for(let j = 1; j < arr.length; j++){
                if(arr[j].color == Color.EMPTY) {
                    index = -1;
                    break;
                }
                else if(arr[j].color != stone.color) {
                    index++;
                }
                else if (arr[j].color == stone.color){
                    for(let k = 1; k < index; k++){
                        this.flippableStones.push(arr[k])
                    }
                    break;
                }
            }
        }
        return this.flippableStones.length != 0;
    }

    judgeVictoryOrDefeat(){
        //マスが全部埋まる or Count
        if(this.board.map.some(stone => stone.color == Color.EMPTY)){
            let p1_count = 0;
            let p2_count = 0;
            this.board.map.forEach(stone => {
                if(stone.color == Color.PLAYER1) p1_count++;
                else if(stone.color == Color.PLAYER2) p2_count++;
            })
           this.p1Count.textContent = p1_count;
           this.p2Count.textContent = p2_count;
            return p1_count == 0 || p2_count == 0;
        }
        return true;

    }

    click(e){
        //手番を確認
        const person = this.isPlayer1Turn ? this.players.player1 : this.players.player2;
        const map = this.board.map;
        //クリック座標を取得
        const rect = this.canvas.getBoundingClientRect();
        const point = {
            x: Math.floor((e.clientX - rect.left)/CELLSIZE),
            y: Math.floor((e.clientY - rect.top)/CELLSIZE)
        };
        //Controllerが石が置けるか判定
        const stone = new Stone(person.myStoneColor, point.x+point.y*BOARDSIZE);   
        if(this.checkToPutStone(stone)){
            //Playerが石を設置
            person.putStone(stone, map);
            //石の反転処理
            this.flippableStones.forEach(stone => {
                stone.flip();
            })
            //Viewが描画
            View.draw(map);
            //Controllerが勝敗チェック
            if(!this.judgeVictoryOrDefeat()){

                 //手番交換
                this.isPlayer1Turn = !this.isPlayer1Turn;
            }
        }
    }

    reset(e){
        //リセットされたとき
        location.reload();
    }

    pass(e){
        //パスをするとき
        this.isPlayer1Turn = !this.isPlayer1Turn;
    }
}

//-----------------------------------------------------------
new GameController();