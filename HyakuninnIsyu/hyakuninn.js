window.onload = function(){new Data();} 

class Data{
    constructor(){
        const requestURL = 'https://gist.githubusercontent.com/wakaba/8363dc27f4c54f76b4a7/raw/hyakunin.json';
        const request = new XMLHttpRequest();
        this.json = new Array();
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.send();
        request.onload = function(){
            console.log(request.response);
            this.json = request.response.concat();
            console.log("json")
        }
        document.getElementById("next").addEventListener('click', e => this.next(e));
    }

    next(eve){
        const num = Math.floor(Math.random()*100);
        console.log(this.json)
        const isyu = this.hyakunin[num];
    }
}