//im gonna f*cking hate this code at the end of this (day 1) this is stupid
document.addEventListener("DOMContentLoaded", () => {
const start_song = document.getElementById('background-music');
start_song.volume = 0.3;
//IF bla blad
//start_song.pause();


function fadeOutAudio() {
    let volume = 0.2;  // Starting volume
    start_song.volume = volume;

    const fadeOutInterval = setInterval(() => {
        if (volume > 0) {
            volume -= 0.02;
            start_song.volume = Math.max(volume, 0);
        } else {
            clearInterval(fadeOutInterval);
        }
    }, 300);
}

function unfade(faden) {
    let op = 0;  // Initialize opacity to 0
    faden.style.opacity = op;
    faden.style.display = 'block'; // Ensure the div is visible

    var timer = setInterval(function () {
        if (op >= 1) {
            clearInterval(timer);
            faden.style.opacity = 1; // Ensure opacity is exactly 1 when done
        } else {
            op += 0.1;  // Increment opacity
            faden.style.opacity = op;
        }
    }, 100);  // Update every 100ms for a smoother fade-in
}
function fadeOut(faden) {
    let op = 1;  // Initialize opacity to 1 (fully visible)
    faden.style.opacity = op;
    faden.style.display = 'block'; // Ensure the div is visible

    var timer = setInterval(function () {
        if (op <= 0) {
            clearInterval(timer);
            faden.style.opacity = 0;  // Ensure opacity is exactly 0 when done
            faden.style.display = 'none'; // Hide the div
        } else {
            op -= 0.1;  // Decrement opacity
            faden.style.opacity = op;
        }
    }, 100);  // Update every 100ms for a smoother fade-out
}


const sol_ljud = document.getElementById("sol_ljud");
const sol = document.getElementById("sol");

sol.addEventListener("click", function(){
    sol_ljud.volume = 0.9;
    sol_ljud.play()
})

const new_game = document.getElementById("new_game");
const faden = document.querySelectorAll('.transistion')
const starten = document.getElementById("starten");


new_game.addEventListener("click", function(){
    fadeOutAudio()
    faden.forEach(element => unfade(element));
    
    setTimeout(() => {
        faden.forEach(element => fadeOut(element));
        starten.style.display = "none";
    }, 2000);
})



});