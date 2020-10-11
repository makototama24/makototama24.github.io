window.onload = function(){                   
    class Game{
        constructor(){
            this.veloX = 0;
            this.veloY = 0;
            this.posX = 10;
            this.posY = 10;
            this.gridSize = 20;
            this.tileCount = 20;
            this.applePosX = 15;
            this.applePosY = 15;
            this.trail = [];
            this.tail = 5;
            this.canv = document.getElementById("snake");
            this.ctx = this.canv.getContext("2d");
            document.addEventListener("keydown", e => this.keyPush(e));
            setInterval(this.game, 100, this);
        }

        game(g){
            g.posX += g.veloX;
            g.posY += g.veloY;

            if(g.posX < 0){
                g.posX = g.tileCount-1;
            }
            else if(g.posX > g.tileCount-1){
                g.posX = 0;
            }
            if(g.posY < 0){
                g.posY = g.tileCount-1;
            }
            else if(g.posY > g.tileCount-1){
                g.posY = 0;
            }
            g.ctx.fillStyle = "black";
            g.ctx.fillRect(0, 0, g.canv.width, g.canv.height);

            g.ctx.fillStyle = "lime";
            for(let i = 0; i < g.trail.length; i++){
                g.ctx.fillRect(g.trail[i].x*g.gridSize, g.trail[i].y*g.gridSize, g.gridSize-2, g.gridSize-2);
                if(g.trail[i].x == g.posX && g.trail[i].y == g.posY){
                    g.tail = 5;
                }
            }
            g.trail.push({x:g.posX, y:g.posY});
            while(g.trail.length > g.tail){
                g.trail.shift();
            }
            if(g.applePosX == g.posX && g.applePosY == g.posY){
                g.tail++;
                g.applePosX = Math.floor(Math.random()*g.tileCount);
                g.applePosY = Math.floor(Math.random()*g.tileCount);
            }
            g.ctx.fillStyle = "red";
            g.ctx.fillRect(g.applePosX*g.gridSize, g.applePosY*g.gridSize, g.gridSize-2, g.gridSize-2);
        }

        keyPush(evt){
            switch(evt.keyCode){
                case 37:
                    this.veloX = -1;
                    this.veloY = 0;
                    break;
                case 38:
                    this.veloX = 0;
                    this.veloY = -1;
                    break;
                case 39:
                    this.veloX = 1;
                    this.veloY = 0;
                    break;
                case 40:
                    this.veloX = 0;
                    this.veloY = 1;
                    break;
            }
        }
    }

    new Game();
}