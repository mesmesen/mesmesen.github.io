document.addEventListener("DOMContentLoaded", function(){
   
    window.addEventListener("load", function() {
        const ramImage = document.getElementById("ram");
        const gameImage = document.getElementById("games");
        const images = ["bilder/Home/ram1.png", "bilder/Home/ram2.png", "bilder/Home/ram3.png"]; 
        const images2 = ["bilder/Home/game1.png", "bilder/Home/game2.png", "bilder/Home/game3.png", "bilder/Home/game4.png", "bilder/Home/game5.png"]; 
        
        const randomIndex = Math.floor(Math.random() * images.length);
        const randomIndex2 = Math.floor(Math.random() * images2.length);
        
        ramImage.src = images[randomIndex];
        gameImage.src = images2[randomIndex2];

        lamp.src = "bilder/Home/lamp_on.png"; 
    });
    const lamp = document.getElementById("lamp");

    lamp.addEventListener("mouseover", function() {
    lamp.src = "bilder/Home/lamp_on.png"; 
    });

    lamp.addEventListener("mouseout", function() {
    lamp.src = "bilder/Home/lamp_off.png"; 
    });

    const brev = document.getElementById("brev");
    const brev2 = document.getElementById("brev2");

    brev.addEventListener("mouseover", function() {
    brev.src = "bilder/Home/brev_open.png"; 
    brev2.style.visibility = "visible";
    });

    brev.addEventListener("mouseout", function() {
    brev.src = "bilder/Home/brev_close.png"; 
    brev2.style.visibility = "hidden";
    });


})