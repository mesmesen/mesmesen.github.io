document.addEventListener("DOMContentLoaded", function(){

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

    var antalRätt = 0;


    var best_score = 10000;
    var total_errors = 0;
    var total_wins = 0;


    window.onload = function(){
        setupGame(); 
        total_errors = parseInt(localStorage.getItem('total_errors')) || 0;
        total_wins = parseInt(localStorage.getItem('total_wins')) || 0;
        best_score = parseInt(localStorage.getItem('best_score')) || 1000;
    
        document.getElementById("error_total").innerText = total_errors;
        document.getElementById("total_wins").innerText = total_wins;
        document.getElementById("best_score").innerText = best_score;
    }

    function setupGame() {
        shuffleCards();
        startGame();
        const restart = document.getElementById("BAJS");
        restart.addEventListener("click", restartGame); 
        
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

        board = [];  

        
        const boardElement = document.getElementById("board");
        boardElement.innerHTML = "";


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
        errors = 0;
        antalRätt = 0;
        document.getElementById("errors").innerText = errors;
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
                total_errors +=1
                document.getElementById("errors").innerText = errors;

                saveToLocalStorage();
            }
                
            else{
                antalRätt += 1
                if (antalRätt == 10){
                    win()
                }
            }
            card1selected = null;
            card2selected = null;
            console.log(antalRätt)
            document.getElementById("error_total").innerText = total_errors;
            
            

        }


        

        
        



    }

    function woohoo(){
        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }
        
        // Define constraints for the position on the screen
        const minX = 0.1; // 10% from the left edge
        const maxX = 0.9; // 10% from the right edge
        const minY = 0.4; // Minimum Y position (40% from the top)
        const maxY = 0.7; // Maximum Y position (70% from the top)
        
        // Generate random X and Y positions


        //ja jag kanske fick lite hjälp här men hur fan skulle jag lista ut dethär???
        //lite är från hemsidan jag använde och lite må vara frånm chatgpt men DET VAR BARA FÖR ATT FÅ DE PÅ RANDOM STÄLLEN CUZ IDK HUR OCH VAR FÖR TRÖTT FÖR ATT GOOGLA
        const randomX = randomInRange(minX, maxX);
        const yPosition = randomInRange(minY, maxY);
        
        confetti({
            angle: randomInRange(55, 125),
            spread: randomInRange(50, 70),
            particleCount: randomInRange(200, 349),
            origin: { x: randomX, y: yPosition },
        });
    }


    const audioFiles = [
        'audio/party1.wav',
        'audio/party2.wav',
        'audio/party3.wav',
    ];

    function playRandomAudio() {
        const randomIndex = Math.floor(Math.random() * audioFiles.length);
        const audio = new Audio(audioFiles[randomIndex]);
        audio.play();
        console.log(audio)
    }



    const restart = document.getElementById("BAJS");

    restart.addEventListener("click",function(){
        
        startGame();
        shuffleCards();
    })

    function win(){
        for (let i = 0; i < 5; i++) {
            setTimeout(woohoo, i * 350);
        }
        playRandomAudio()
        vinst.style.display = "block";
        setTimeout(() => {
            vinst.style.display = "none"; 
        }, 3650);  

        total_wins += 1;

        if (best_score > errors) {
            best_score = errors;

        }   
        document.getElementById("total_wins").innerText = total_wins;
        document.getElementById("best_score").innerText = best_score;
    }     

    function restartGame() {
        shuffleCards();  
        startGame();
    }

    const vinst = document.getElementById("vinst");


    function saveToLocalStorage() {
        localStorage.setItem('total_errors', total_errors);
        localStorage.setItem('total_wins', total_wins);
        localStorage.setItem('best_score', best_score);
    }
   


})