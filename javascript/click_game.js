//im gonna f*cking hate this code at the end of this (day 1) this is stupid
document.addEventListener("DOMContentLoaded", () => {
const start_song = document.getElementById('background-music');
start_song.volume = 0.3;


const bajs = document.getElementById("bajs");
bajs.addEventListener("click",function(){
    bajs.style.display = "none"
    start_song.play(); 
})



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
    let op = 0;  
    faden.style.opacity = op;
    faden.style.display = 'block'; 

    var timer = setInterval(function () {
        if (op >= 1) {
            clearInterval(timer);
            faden.style.opacity = 1; 
        } else {
            op += 0.1;  
            faden.style.opacity = op;
        }
    }, 100);  
}
function fadeOut(faden) {
    let op = 1;  
    faden.style.opacity = op;
    faden.style.display = 'block';

    var timer = setInterval(function () {
        if (op <= 0) {
            clearInterval(timer);
            faden.style.opacity = 0;  
            faden.style.display = 'none'; 
        } else {
            op -= 0.1;  
            faden.style.opacity = op;
        }
    }, 100); 
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

const homeScene = document.getElementById("home_scene");

const mainMusic = document.getElementById("main_music");
new_game.addEventListener("click", function(){
    fadeOutAudio()
    faden.forEach(element => unfade(element));
    
    setTimeout(() => {
        faden.forEach(element => fadeOut(element));
        starten.style.display = "none";
        home_scene()
    }, 2000);
})



function home_scene(){
    homeScene.style.display = "block"
    mainMusic.volume ="0.1"
    setTimeout(() => {
        mainMusic.play()
    }, 1350);
    console.log(homeScene.style.display)
}


});