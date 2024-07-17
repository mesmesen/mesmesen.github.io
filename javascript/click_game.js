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

//Item list basicly

let key1 = "no"




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


//SCENERNA
// ALLAL SCENERNAAAAAAAAAAA
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
const house2Scene = document.getElementById("house2_scene");

function creep_scene(){
    creepScene.style.display = "block"
    scene = 666
}
const creepScene = document.getElementById("creep_scene");


function dalen_scene(){
    dalenScene.style.display = "block"
    scene = 4
}
const dalenScene = document.getElementById("dalen_scene");


const circusScene = document.getElementById("circus_scene")
function circus_scene(){
    circusScene.style.display = "block"
    scene = 5
}

const  tentScene = document.getElementById("tent_scene")
function tent_scene(){
    tentScene.style.display = "block"
    scene = 6
}


//KANPP LYSSN MELLAN SCENERNA   
// AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA

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


const sign1 = document.getElementById("sign1");
sign1.addEventListener("click", function(){
    faden.forEach(element => unfadeFast(element));
    
    setTimeout(() => {
        faden.forEach(element => fadeOutFast(element));
        homeScene.style.display = "none";
        dalen_scene()
    }, 300);
})

const sign2 = document.getElementById("sign2");
const sign2text = document.getElementById("sign2text");

sign2.addEventListener("click",function(){
    faden.forEach(element => unfadeFast(element));
    
    setTimeout(() => {
        faden.forEach(element => fadeOutFast(element));
        dalenScene.style.display = "none";
        home_scene()
        
    }, 300);
})
sign2text.addEventListener("click",function(){
    faden.forEach(element => unfadeFast(element));
    
    setTimeout(() => {
        faden.forEach(element => fadeOutFast(element));
        dalenScene.style.display = "none";
        home_scene()
        
    }, 300);
})

const pathLeft =document.getElementById("path_left");
pathLeft.addEventListener("click",function(){
    faden.forEach(element => unfadeFast(element));
    
    setTimeout(() => {
        faden.forEach(element => fadeOutFast(element));
        dalenScene.style.display = "none";
        circus_scene()
        
    }, 300);
})

const sign3 = document.getElementById("sign3");
sign3.addEventListener("click",function(){
    faden.forEach(element => unfadeFast(element));
    
    setTimeout(() => {
        faden.forEach(element => fadeOutFast(element));
        circusScene.style.display = "none";
        dalen_scene()
        
    }, 300);
})

const tent = document.getElementById("tent");

tent.addEventListener("click", function(){
    faden.forEach(element => unfadeFast(element));
    
    setTimeout(() => {
        faden.forEach(element => fadeOutFast(element));
        circusScene.style.display = "none";
        tent_scene()
        
    }, 300);

})





//HÄR COPY PASTAR JAG FRÅN ADNRAS KÅDER BASICLY FÖR TEST ELLER LÄMNAR JAG KVAR OM DE FUNGERAR
 // Function to set the opacity of .sign2
 function setSignOpacity(opacity) {
    document.querySelector('.sign2').style.opacity = opacity;
}

// Add event listeners to .hem_text
document.querySelector('.hem_text').addEventListener('mouseover', function() {
    setSignOpacity('1');
});
document.querySelector('.hem_text').addEventListener('mouseout', function() {
    setSignOpacity('0');
});

// Add event listeners to .sign2
document.querySelector('.sign2').addEventListener('mouseover', function() {
    setSignOpacity('1');
});
document.querySelector('.sign2').addEventListener('mouseout', function() {
    setSignOpacity('0');
});

//ANNAT??????
const lockDoor = document.getElementById("lock_door");
const lockDoorSound = document.getElementById("locked_door");

lockDoor.addEventListener("click", function(){
    if (key1 == "yes"){
        //öppna dörren
    }
    else{
        const randomNumber3 = Math.floor(Math.random() * 3) + 1;
        const audioSak = "lock" + randomNumber3;
        lockDoorSound.play()
        const audioBajs = document.getElementById(audioSak);
        audioBajs.play()
    }
})
let creepCount = 1
const creepDoor = document.getElementById("creep_door");
creepDoor.addEventListener("click", function(){
    if(creepCount == 1){
        const audio = new Audio("audio/click_game/creep1.wav");
        audio.play();
    }
    if(creepCount == 2){
        const audio = new Audio("audio/click_game/creep2.wav");
        audio.play();
    }
    if(creepCount == 3){
        const audio = new Audio("audio/click_game/creep3.wav");
        audio.play();
        setTimeout(() => {
            faden.forEach(element => unfadeFast(element));
    
    setTimeout(() => {
        faden.forEach(element => fadeOutFast(element));
        house2Scene.style.display = "none";
        creep_scene()
        mainMusic.volume = "0"
        jumpscaretest = 1

    }, 300);
        }, 800);
    }
    creepCount += 1

})
const scream = document.getElementById("scream");
const jumpScare = document.getElementById("jump_scare");
creepScene.addEventListener("click", function(){
    if(jumpscaretest = 1){
    setTimeout(() => {
    scream.play()
    jumpscaretest = 0
    setTimeout(() => {
        jumpScare.style.display ="block"
        
    }, 400);

    setTimeout(() => {
        jumpScare.style.display ="none"
        creepScene.style.display ="none"
        house2_scene()
        if(sett_music == "yes"){
            mainMusic.volume = "0.1"
        }

    }, 3000);
}, 3000);}
})

//SCENER
let scene = 0
// 0 = starten liksom
// 1 = hemmagrejen
// 2 hus inne första
// 3 hus inne källare
//4 dalen
//5 circus

//6 circus tält

//666 jumpscare



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
    main_music_func()
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


function main_music_func(){
    if(scene == 1 || scene == 2 || scene == 3|| scene == 4){
        mainMusic.volume = 0.1
    }
}





});


