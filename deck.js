const Card = require('./card.js')

module.exports = class Deck {
    suits = ['spades', 'clubs', 'diamonds', 'hearts']
    ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace']

    deck = []

    // Generate Deck of Cards

    generate_deck(){
        console.log("generating");
        for(var i = 0; i < this.ranks.length; i++){
            for(var j = 0; j < this.suits.length; j++){
                this.deck.push(new Card(this.ranks[i], this.suits[j]));
            }
        }
    }

    // Print Deck

    toString(){
        deck_str = "";

        for(var i = 0; i < this.deck.length; i++){
            deck_str += this.deck[i].toString();
        }

        return deck_str;
    }

    // Shuffle Deck of Cards - Fisher-Yates Algorithm

    shuffle_deck(){
        console.log("Shuffling");

        for(var i = this.deck.length - 1; i > 0; i--){
            var r = Math.round(Math.random() * (i + 1));

            /*
            var temp = this.deck[i];
            this.deck[i] = this.deck[r];
            this.deck[r] = temp;
            */

            [this.deck[i], this.deck[r]] = [this.deck[r], this.deck[i]];
        }
    }

    deal_deck(numPlayers){
        //console.log("dealing deck: " + this.deck);
        var hands = [];

        for(var i = 0; i < numPlayers; i++){
            hands.push(new Array());
        }

        for(var i = 0; i < this.deck.length; i++){
            hands[i % numPlayers].push(this.deck[i]);
        }
        //console.log("hands: " + hands);
        return hands;
    }

    getDeck(){ return this.deck; }
}