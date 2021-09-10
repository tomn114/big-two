module.exports = class Card {
    constructor(rank, suit){
        this.rank = rank;
        this.suit = suit;
        this.name = this.rank + '_of_' + this.suit;
        this.path = "res/" + this.name + ".png";
    }

    toString(){
        return this.name;
    }

    hide(){
        this.path = "res/back.png"
    }

    show(){
        this.path = "res/" + this.name + ".png";
    }
}