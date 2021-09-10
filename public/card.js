class Card {
    constructor(img, rank, suit, x, y){	
        this.loaded = false;
        this.scale = 1;

        this.img = img;

        this.rank = rank;
        this.suit = suit;

        this.selected = false;
        this.hovered = false;

        this.selectYOffset = 50;

        this.x = x;
        this.y = y;

        this.width = this.img.width * this.scale;
        this.height = this.img.height * this.scale;
	}
    setX(x){ this.x = x; }
    setY(y){ this.y = y; }
    moveX(x){ this.x += x; }
    moveY(y){ this.y += y; }

    onCard(x, y){
        return (x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height);
    }

    toggleSelect(){
        if(this.selected){
            this.y += this.selectYOffset;
            this.selected = false;
        }
        else{
            this.y -= this.selectYOffset;
            this.selected = true;
        }
    }

    draw(){		

        /*
        if(this.hovered){
            context.drawImage(this.img, this.x, this.y - 50, this.width, this.height);
        }*/

        context.drawImage(this.img, this.x, this.y, this.width, this.height);
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.stroke();
	}
}