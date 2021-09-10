const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const rect = canvas.getBoundingClientRect();

var handSelectText = document.getElementById("handSelectText");

const handY = 550;
const handX = 300;
const cardSpace = 50;

/*
const playAreaX = 300;
const playAreaY = 200;
const playAreaW = 680;
const playAreaH = 320;

const playAreaColor = '#184a0d';*/

const boardColor = '#2a7e19';

const imageMap = new Map();

var cardsGenerated = false;

var deck; // Server sided deck
var cards = []; // Client sided cards
var hand = [];
var selected = [];


//var onCard = false;

var lastMouseX;
var lastMouseY;


function loadImages(){
    for(var i = 0; i < suits.length; i++){
        for(var j = 0; j < ranks.length; j++){
            const path = ranks[j] + "_of_" + suits[i];
            const img = new Image();
            img.onload = function(){
                imageMap.set(path, img);
                //console.log(i + ", " + j +  " image loaded at " + path);
            }
            img.src = "res/" + path + ".png";
        }
    }
}

/*
function setDeck(deck){
    this.deck = deck;

    var x = 0;
    for(var i = 0; i<deck.length; i++){
        if(i % 2 != 0)
            cards.push(new Card(this.deck[i].path, x, 200));
        else {
            cards.push(new Card(this.deck[i].path, x, 100));
            x += 15;
        }
        
    }

    //cardsGenerated = true;
}*/

function setHand(hand){
    var x = handX;

    for(var i = 0; i<hand.length; i++){
        //console.log(hand[i].name)
        this.hand.push(new Card(imageMap.get(hand[i].name), hand[i].rank, hand[i].suit, x, handY));
        x += cardSpace;
    }

    cardsGenerated = true;
    update();
}

function sortHand(){
    // Bubble sort 
    var sorted = false;

    while(!sorted){
        sorted = true;

        for(var i = 0; i < hand.length - 1; i++){
            var rankHigher = ranks.indexOf(hand[i].rank) > ranks.indexOf(hand[i+1].rank);
            var rankEqual = ranks.indexOf(hand[i].rank) === ranks.indexOf(hand[i+1].rank);
            var suitHigher = suits.indexOf(hand[i].suit) > suits.indexOf(hand[i+1].suit);

            if(rankHigher || (rankEqual && suitHigher)){
                [hand[i], hand[i+1]] = [hand[i+1], hand[i]];
                sorted = false;
            }
        }
    }

    var x = handX;
    for(var i = 0; i < hand.length; i++){
        hand[i].setX(x);
        //hand[i].setY(handY);
        //console.log(hand[i].rank + " of " + hand[i].suit);
        x += cardSpace;
    }
}

function draw(){
	context.fillStyle = boardColor;
	context.fillRect(0, 0, canvas.width, canvas.height);

    //context.fillStyle = playAreaColor;
    //context.fillRect(playAreaX, playAreaY, playAreaW, playAreaH);
	
	if(cardsGenerated){
        //drawCards(deck);
        drawHand();
    }
}

function drawCards(deck){
    for(var i = 0; i<cards.length; i++){
        cards[i].draw();
    }
}

function drawHand(){
    //console.log("drawing hand");
    for(var i = 0; i<hand.length; i++){
        hand[i].draw();
    }
}

function getMouseX(e){ return e.clientX - rect.left; }
function getMouseY(e){ return e.clientY - rect.top; }

// Moves recently clicked card to the end of cards array (so it is rendered on top)

function shiftRenderOrder(startIndex){
    if(i == hand.length - 1) return;

    var temp = hand[startIndex];

    for(var i = startIndex; i < hand.length - 1; i++){
        hand[i] = hand[i+1];
    }

    hand[hand.length - 1] = temp;
}

function clicked(e){
    for(var i = hand.length - 1; i >= 0; i--){
        if(hand[i].onCard(getMouseX(e), getMouseY(e))){
            hand[i].toggleSelect();
            if(hand[i].selected){
                selected.push(hand[i]);
                //console.log("Pushed, Selected: " + selected);
            }
            else{
                selected.splice(selected.indexOf(hand[i]), 1);
                //console.log("Removed, Selected: " + selected);
            }
            return;
        }
    }

    
}

function mouseUp(e){
    //onCard = false;
}

function mouseLeave(e){
    //onCard = false;
}

function mouseDown(e){
    /*
    for(var i = hand.length - 1; i >= 0; i--){
        console.log("Checking " + i)
        if(hand[i].onCard(getMouseX(e), getMouseY(e))){
            console.log("On card " + i)

            shiftRenderOrder(i);
            onCard = true;

            lastMouseX = getMouseX(e);
            lastMouseY = getMouseY(e);

            return;
        }
    }*/
}

function mouseMove(e){
    /*
    if(!onCard)
        return;
    
    hand[hand.length - 1].moveX(getMouseX(e) - lastMouseX);
    hand[hand.length - 1].moveY(getMouseY(e) - lastMouseY);

    lastMouseX = getMouseX(e);
    lastMouseY = getMouseY(e);*/

    /*
    for(var i = hand.length - 1; i >= 0; i--){
        hand[i].hovered = false;
        if(hand[i].onCard(getMouseX(e), getMouseY(e))){
            //shiftRenderOrder(i);
            hand[i].hovered = true;
        }
    }*/


}

/*

function selectLogic(){
    // High card
    if(selected.length == 0){
        handSelectText.innerHTML = "None selected";
    }

    else if(selected.length == 1){
        let card = selected[0];
        handSelectText.innerHTML = "High card " + card.rank + " of " + card.suit;
    }

    else if(selected.length == 2){
        let card1 = selected[0];
        let card2 = selected[1];

        if(card1.rank != card2.rank){
            handSelectText.innerHTML = "Invalid combination";
        }
        else {
            handSelectText.innerHTML = "Double " + card1.rank;

        }
    }

    else if(selected.length == 3){
        handSelectText.innerHTML = "Invalid combination";
    }

    else if(selected.length == 4){
        let card1 = selected[0];
        let card2 = selected[1];
        let card3 = selected[2];
        let card4 = selected[3];

        if(card1.rank == card2.rank == card3.rank == card4.rank){
            handSelectText.innerHTML = "Bomb: Four of a kind " + card1.rank;
        }
        else {
            handSelectText.innerHTML = "Invalid combination";
        }
    }

    else if(selected.length == 5){
        let card1 = selected[0];
        let card2 = selected[1];
        let card3 = selected[2];
        let card4 = selected[3];
        let card5 = selected[4];

        // Full house
    }

    
}*/

function update(){
    handSelectText.innerHTML = selectLogic(selected);
	draw();
	requestAnimationFrame(update);
}

loadImages();
update();