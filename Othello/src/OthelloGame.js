
class Stone{

}

class player{
    putStone(){
        //input: map
        //stoneのcolorを変更
        //output: 
    }
}

class View{
    static draw(){
        //input: map
    }
}

class GameController{
    constructor(){
        this.board = new Board();
    }

    static checkToPutStone(){
        //input: stone, map
        //output: Bool
    }

    judgeVictoryOrDefeat(){
        //input: map
        //マスが全部埋まる or 
        //output: none or player
    }

    click(){
        //input: event
        //クリック座標を取得
        //Controllerが石が置けるか判定
        //Playerが石を設置
        //描画
        //勝敗チェック
        //output: none
    }

    reset(){
        //input: event
        //リセットされたとき
    }

    pass(){
        //input: event
        //パスをするとき
    }
}