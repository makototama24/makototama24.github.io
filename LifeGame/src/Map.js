import {ROW_MAX, COL_MAX, Cell_height, Cell_width} from './GameControler.js';


export class Map{
    constructor(){
        this.map = new Array(ROW_MAX+2*COL_MAX+2);
    }

    push(cell){
        this.map.push(cell);
    }

    get(row, col){
        return this.map[row*(ROW_MAX+2) + col];
    }
}