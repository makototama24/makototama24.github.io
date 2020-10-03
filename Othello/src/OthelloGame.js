
const BOARDSIZE = 8;
const CELLSIZE = 80;
const Color = {
    EMPTY: "rgba(0, 0, 0, 0)",
    BLACK: "rgb(50, 50, 50)",
    WHITE: "rgb(255, 255, 255)",
    BOARDBASED: "rgb(150, 230, 150)",
    BOARDLINE: "rgb(240, 240, 240)",
    BOARDFRAME: "rgb(100, 100, 100)"
}

class Stone{
    constructor(color, point){
        this.color = color
        this.position = {
            x: point.x,
            y: point.y
        }
        this.coordinate = this.position.x + this.position.y*BOARDSIZE;
    }

    flip(){
        //色反転
        if(this.color ==Color.BLACK) this.color = Color.WHITE;
        else if(Color.WHITE) this.color = Color.BLACK;
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

    filpStone(){

    }
}

class View{
    static initDraw(map){
        const ctx = document.getElementById("game_canvas").getContext("2d");

        ctx.fillStyle = Color.BOARDBASED;
        ctx.fillRect(0, 0, BOARDSIZE*CELLSIZE, BOARDSIZE*CELLSIZE);
        map[3+4*BOARDSIZE].color = Color.BLACK;
        map[4+3*BOARDSIZE].color = Color.BLACK;
        map[3+3*BOARDSIZE].color = Color.WHITE;
        map[4+4*BOARDSIZE].color = Color.WHITE;
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
            player1: new Player(Color.BLACK), 
            player2: new Player(Color.WHITE)
        };
        this.isPlayer1Turn = true;

        this.canvas = document.getElementById("game_canvas");
        this.canvas.addEventListener("click", e => this.click(e));
        document.getElementById("reset").addEventListener("click", e => this.reset(e));
        document.getElementById("pass").addEventListener("click", e => this.pass(e));
        
    }

    checkToPutStone(stone, map){
        const map = this.board.map;
        //up
        return true;
    }

    judgeVictoryOrDefeat(map){
        //マスが全部埋まる or Count
        //output: none or player
        return false;
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
        const stone = new Stone(person.myStoneColor, point);
        if(this.checkToPutStone(stone, map)){
            //Playerが石を設置
            person.putStone(stone, map);
            //Playerが石の反転処理
            //Viewが描画
            View.draw(map);
            //Controllerが勝敗チェック
            if(!this.judgeVictoryOrDefeat(map)){
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