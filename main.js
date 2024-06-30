document.addEventListener("DOMContentLoaded", function(){
    const realscore = document.getElementById("text");
    const score = document.getElementById("knapp");

    let savedScore = localStorage.getItem("score");
    if (savedScore !==null){
        realscore.innerHTML = savedScore;
    }

    score.addEventListener("click",function(){
        let newscore = parseInt(realscore.innerHTML, 10);

        newscore += 1;

        realscore.innerHTML = newscore;

        localStorage.setItem("score",newscore)
    })






})