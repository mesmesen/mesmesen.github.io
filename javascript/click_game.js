//im gonna f*cking hate this code at the end of this (day 1) this is stupid
document.addEventListener("DOMContentLoaded", () => {
const start_song = document.getElementById('background-music');
start_song.volume = 0.3;


const bajs = document.getElementById("bajs");
bajs.addEventListener("click",function(){
    bajs.style.display = "none"
    if(sett_music == "yes"){
        start_song.play(); 
    }
})



function fadeOutAudio() {
    if(sett_music == "yes"){
    
    let volume = 0.2;  // Starting volume
    
    start_song.volume = volume;
    const fadeOutInterval = setInterval(() => {
        if (volume > 0) {
            volume -= 0.02;
            start_song.volume = Math.max(volume, 0);
        } else {
            start_song.pause()
            clearInterval(fadeOutInterval);
        }
    }, 300);
    }
    if(sett_music == "no"){
        start_song.volume = 0;
    }

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
function unfadeFast(faden) {
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
    }, 15);  
}
function fadeOutFast(faden) {
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
    }, 15); 
}

const dörrLjud = document.getElementById("dörr_ljud");

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
    setTimeout(() => {
        mainMusic.play()
    }, 1350); 
    if(sett_music == "yes"){
    mainMusic.volume ="0.1"
}
    scene = 1
}

function house1_scene(){
    house1Scene.style.display = "block"
    scene = 2
}

const house1Scene = document.getElementById("house1_scene");
const dörrUt = document.getElementById("dörr_ut");

function house2_scene(){
    house2Scene.style.display = "block"
    scene = 3
}
const house2Scene = document.getElementById("house2_scene")



dörrUt.addEventListener("click", function(){
    faden.forEach(element => unfadeFast(element));
    dörrLjud.play()
    
    setTimeout(() => {
        faden.forEach(element => fadeOutFast(element));
        homeScene.style.display = "none";
        house1_scene()
        
    }, 300);

})

const dörrInne = document.getElementById("dörr_inne");

dörrInne.addEventListener("click", function(){
    faden.forEach(element => unfadeFast(element));
    dörrLjud.play()
    
    setTimeout(() => {
        faden.forEach(element => fadeOutFast(element));
        house1Scene.style.display = "none";
        home_scene()
        
    }, 300);

})

const pil1 = document.getElementById("pil1");

pil1.addEventListener("click", function(){
    faden.forEach(element => unfadeFast(element));
    
    setTimeout(() => {
        faden.forEach(element => fadeOutFast(element));
        house1Scene.style.display = "none";
        house2_scene()
        
    }, 300);
})

const stege = document.getElementById("ladder");

stege.addEventListener("click", function(){
    faden.forEach(element => unfadeFast(element));
    
    setTimeout(() => {
        faden.forEach(element => fadeOutFast(element));
        house2Scene.style.display = "none";
        house1_scene()
        
    }, 300);
})
    



//SCENER
let scene = 0
// 0 = starten liksom
// 1 = hemmagrejen




// SETTINGS HERE!!!!!!!!
let sett_music = "yes"



meny = document.getElementById("meny");

redx = document.getElementById("redx");
fullMeny = document.getElementById("full_meny");

ondiv1 = document.getElementById("ondiv1");
offdiv1 = document.getElementById("offdiv1");

valdon1 = document.getElementById("valdon1");
valdoff1 = document.getElementById("valdoff1");
meny.addEventListener("click", function(){
    fullMeny.style.display = "block"
})

redx.addEventListener("click", function(){
    fullMeny.style.display = "none"
})

ondiv1.addEventListener("click",function(){
    if(scene == 0){
        start_song.volume = 0.3
    }
    if(scene == 1 || scene == 2 || scene == 3){
        mainMusic.volume = 0.1
    }
    valdon1.style.display = "block"
    valdoff1.style.display = "none"
    sett_music = "yes"
})
offdiv1.addEventListener("click",function(){
    valdon1.style.display = "none"
    valdoff1.style.display = "block"
    sett_music = "no"
    start_song.volume = 0
    mainMusic.volume = 0
})

});


