var body = document.querySelector("body");
var colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
var u;

var frameSizeX = 90;
var totalXFrames = 11;
var currentXFrame = 0;
var frameSizeY = 150;
var totalYFrames = 3;
var currentYFrame = 0;
var sx = 0;
var sy = 0;
var dx = 0;
var dy = 0;

var shitcoins = ["bcash.png", "bitconnect.png", "eos.png", "eth.png", "iota.png", "litecoin.png", "namecoin.png", "ripple.png", "tron.png", "verge.png"];
var shitcoinDelay = 500;
var shitcoinSpeed = 50;
var levels = ["Level1.png", "Level2.png", "Level3.png", "Level4.png"];
var level = 0;
var nextLevel = 0;
var levelImage = new Image();

function reset(){
    sy = 0;
    sx = 0;
    dy = context.canvas.width*.2;
    dx = context.canvas.height*.5;
    shitCoinObstacles = [];
    gameOver = false;
    nextLevel = 0;
    alert("Press W, A, S, D or Arrow Keys to move.  Avoid the shitcoins!");
}

function initializeSkeleton(){
    canvas.style.display = "inline";
    reset();
    redraw();
    playGame();
}

var shitCoinObstacles = [];

var gameOver = false;

function playGame(){
    setInterval(function(){
        level = Math.floor(shitCoinObstacles.length / 25);

        shitCoinObstacles.forEach(function(e) { e.x -= shitcoinSpeed * e.speed });

        if(Math.floor(Math.random() * 100) % 10 == 0 && !gameOver){
            var shitcoin = new Image();
            var shitcoinIndex = Math.floor(Math.random() * shitcoins.length);
            shitcoin.src = shitcoins[shitcoinIndex];
            var shitcoinHeight = Math.random() * context.canvas.height;
            shitCoinObstacles.push({
                coin: shitcoin, 
                x: context.canvas.width - 10,
                y: shitcoinHeight,
                speed: Math.random() * (level + 1)
            });
        }
        if (level >= nextLevel){
            window.setTimeout(function(){
                nextLevel = level + 1;
            }, 500);
            
        }
        if(!gameOver){
            gameOver = 
            (shitCoinObstacles.find(function(e) {
                return ((e.x <= dx + 45) && (e.x + 100 >= dx) && (e.y + 100 >= dy+5) && (e.y <= dy + 145))
            }) != undefined);
            if(gameOver){
                shitCoinObstacles = [];
                level = 0;
                nextLevel = 0;
            }   
        }
        redraw();
    },100);
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
       u = user;       
    }
    else{
        window.location.href = "./authentication.html"
    }
});

var canvas = document.querySelector("canvas");
canvas.style.display = "none";
var context = canvas.getContext("2d");
context.canvas.height = window.innerHeight;
context.canvas.width = window.innerWidth;

window.addEventListener("resize", function(){
    context.canvas.height = window.innerHeight;
    context.canvas.width = window.innerWidth;
    redraw();
});

var skeleton = new Image();
    skeleton.src = "walkingsprite.png";

initializeSkeleton();

function redraw(){
    // levelImage.src = levels[level]; 
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    context.drawImage(skeleton, sx, sy, 90, 150, dx, dy, 90, 150);

    shitCoinObstacles.forEach(function(e){
        context.drawImage(e.coin, 0, 0, 100, 100, e.x, e.y, 100, 100);   
    });    

    // if (level >= nextLevel){
    //     levelImage.addEventListener("load", function(){
    //         context.drawImage(levelImage, 0, 0, context.canvas.width, context.canvas.height);    
    //     })
    // }

    if(gameOver){
        var rekt = new Image();
        rekt.src = "rekt.png"
        
        rekt.addEventListener("load", function(){
            context.drawImage(rekt, 0, 0, context.canvas.width, context.canvas.height);    
        })
    }
}

window.addEventListener("keydown", function(e){
    currentXFrame++;
    if(currentXFrame > totalXFrames){
        currentXFrame = 0;
    }
    currentYFrame++;
    if(currentYFrame > totalYFrames){
        currentYFrame = 0;
    }
    if(gameOver){
        reset();
    }
    switch(e.key){
        case "w":{
            dy -= 10;
            if (dy <= -75){
                dy = context.canvas.height-75;
            }
            sy = 3 * frameSizeY;
            sx = currentXFrame * frameSizeX;
            break;
        }
        case "a":{
            dx -= 10;
            if (dx <= 0){
                dx = 0;
            }
            sy = 1 * frameSizeY;
            sx = currentXFrame * frameSizeX;
            break;  
        }
        case "s":{
            dy += 10;
            if (dy >= context.canvas.height-75){
                dy = -75;
            }
            sy = 0 * frameSizeY;
            sx = currentXFrame * frameSizeX;
            break;
        }
        case "d":{
            dx += 10;
            if (dx >= context.canvas.width){
                dx = context.canvas.width;
            }
            sy = 2 * frameSizeY;
            sx = currentXFrame * frameSizeX;
            break;
        }        
    }
    switch(e.keyCode){
        case 38:{
            dy -= 10;
            if (dy <= -75){
                dy = context.canvas.height-75;
            }
            sy = 3 * frameSizeY;
            sx = currentXFrame * frameSizeX;
            break;
        }
        case 37:{
            dx -= 10;
            if (dx <= 0){
                dx = 0;
            }
            sy = 1 * frameSizeY;
            sx = currentXFrame * frameSizeX;
            break;  
        }
        case 40:{
            dy += 10;
            if (dy >= context.canvas.height-75){
                dy = -75;
            }
            sy = 0 * frameSizeY;
            sx = currentXFrame * frameSizeX;
            break;
        }
        case 39:{
            dx += 10;
            if (dx >= context.canvas.width){
                dx = context.canvas.width;
            }
            sy = 2 * frameSizeY;
            sx = currentXFrame * frameSizeX;
            break;
        }       
    }
    var skeleton = {
        sx: sx, 
        sy: sy, 
        dx: dx, 
        dy: dy
    }
    redraw();
})

redraw();