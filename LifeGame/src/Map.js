import {ROW_MAX, COL_MAX, Cell_height, Cell_width} from './GameControler.js';


export class Map{
    constructor(){
        this.map = new Array();
    }

    push(cell){
        this.map.push(cell);
    }
}