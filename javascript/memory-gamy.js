var errors = 0;
var cardList = [
    "ett",
    "två",
    "tre",
    "fyra",
    "fem",
    "sex",
    "sju",
    "åtta",
    "nio",
    "tio",
]

var cardSet;
var board = [];
var rows = 4;
var columns = 5;

var card1selected
var card2selected


window.onload = function(){
    shuffleCards();
    startGame();
}


function shuffleCards (){
    cardSet = cardList .concat(cardList);
    

    for (let i = 0; i < cardSet.length; i++) {
        let j = Math.floor(Math.random() * cardSet.length);

        let temp = cardSet[i];
        cardSet[i] = cardSet[j];
        cardSet[j] = temp;
    }
    console.log(cardSet)
}

function startGame(){
    for (let r = 0; r < rows; r++) {
        let row = []
        for (let c = 0; c < columns; c++) {
            let cardImg = cardSet.pop();
            row.push(cardImg);

            let card = document.createElement("img");
            card.id = r.toString() + "-" + c.toString();
            card.src = "bilder/memory/" + cardImg + ".png"
            card.classList.add("card");
            card.addEventListener("click",selectCard);
            document.getElementById("board").append(card);
        }
        board.push(row);
    }
    console.log(board)
    setTimeout(hideCards, 1300)
}

function hideCards(){
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let card = document.getElementById(r.toString() + "-" + c.toString());
            card.src = "bilder/memory/back.png"
        }
    }
}

function selectCard(){
    if(this.src.includes("back")){
        if (!card1selected){
            card1selected = this;

            let coords = card1selected.id.split("-");
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card1selected.src ="bilder/memory/" + board[r][c] + ".png"
        }
        else if (!card2selected && this != card1selected){
            card2selected = this;

            let coords = card2selected.id.split("-");
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card2selected.src ="bilder/memory/" + board[r][c] + ".png"
            setTimeout(update, 1000);

        }
    }
    function update(){
        if(card1selected.src != card2selected.src){
            card1selected.src = "bilder/memory/back.png";
            card2selected.src = "bilder/memory/back.png";
            errors += 1;
            document.getElementById("errors").innerText = errors;
        }
        card1selected = null;
        card2selected = null;
    }
}