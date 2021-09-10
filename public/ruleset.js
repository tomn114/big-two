const suits = ['clubs', 'diamonds', 'hearts', 'spades']
const ranks = ['3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace', '2']

const noneString = 'None selected';
const invalidString = 'Invalid combination';


// A rule that involves a certain number of ranks. (i.e High Card, Double, Full House, custom ones as well.)

class RankRule {
    constructor(name, ruleArr, numCards){
        this.name = name;
        this.ruleArr = ruleArr;
        this.numCards = numCards;
    }
}

rankRules = []

rankRules.push(new RankRule("High Card", [1], 1));
rankRules.push(new RankRule("Double", [2], 2));
rankRules.push(new RankRule("Full House", [3, 2], 5));
rankRules.push(new RankRule("Bomb: Four of a Kind", [4], 4));

//rankRules.push(new RankRule("Double Double", [2, 2], 4))
//rankRules.push(new RankRule("Three of a Kind", [3], 3))
//rankRules.push(new RankRule("Classic Bomb", [2, 2, 2], 6));

const straightSizes = [3, 5];
const excludeFromStraights = ['2'];


function selectLogic(selected){
    if(selected.length == 0)
        return noneString;

    // Check for rank based combinations
    for(var i = 0; i < rankRules.length; i++){
        if(selected.length == rankRules[i].numCards){
            var cardCounter = new Map();

            for(var j = 0; j < selected.length; j++){
                if(cardCounter.has(selected[j].rank)){
                    cardCounter.set(selected[j].rank, cardCounter.get(selected[j].rank) + 1);
                }
                else {
                    cardCounter.set(selected[j].rank, 1);
                }
            }

            let a = Array.from(cardCounter.values());
            let b = rankRules[i].ruleArr;

            a.sort();
            b.sort();

            if(arrayEquals(a, b)){
                return rankRules[i].name;
            }   
        }
    }

    // Check for straights
    for(var i = 0; i < straightSizes.length; i++){
        var startRank;
        if(selected.length == straightSizes[i]){
            var cardCounter = new Map();

            for(var j = 0; j < selected.length; j++){
                if(cardCounter.has(selected[j].rank)){
                    cardCounter.set(selected[j].rank, cardCounter.get(selected[j].rank) + 1);
                }
                else {
                    cardCounter.set(selected[j].rank, 1);
                }
            }

            let values = Array.from(cardCounter.values());

            // If any card appears more than once, it is not a valid straight.

            for(var j = 0; j < values.length; j++){
                if(values[j] != 1)
                    return invalidString;
            }

            // If any excluded values appear in the straight (eg: 2), it is not valid.

            let keys = Array.from(cardCounter.keys());

            for(var j = 0; j < keys.length; j++){
                for(var k = 0; k < excludeFromStraights.length; k++){
                    if(keys[j] == excludeFromStraights[k]){
                        return invalidString;
                    }
                }
            }

            keys = sortCards(keys);

            //console.log("sorted keys: " + keys);

            startRank = keys[0];
            let startIndex = ranks.indexOf(startRank);

            for(var j = 0; j < straightSizes[i]; j++){
                if(keys[j] != ranks[startIndex + j]){
                    return invalidString;
                }
            }
            return straightSizes[i] + " Straight " + startRank + " up";
        }
    }

    return invalidString;
    
}

// Returns true if each value in the two arrays are equal.

function arrayEquals(a, b){
    return a.every((val, index) => val === b[index]);
}

// Temporary sorting method

function sortCards(c){
    // Bubble sort

    let c_copy = Array.from(c);

    var sorted = false;

    while(!sorted){
        sorted = true;

        for(var i = 0; i < c_copy.length - 1; i++){
            var rankHigher = ranks.indexOf(c_copy[i]) > ranks.indexOf(c_copy[i+1]);
            if(rankHigher){

                [c_copy[i], c_copy[i+1]] = [c_copy[i+1], c_copy[i]];
                sorted = false;
            }
        }
    }
    return c_copy;
}