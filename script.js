var main = document.getElementById("canvas");
var context = main.getContext('2d');
canvas.height= 800;
canvas.width= 800;
var playerOne= 0;
var playerTwo= 0;
document.getElementById("p1score").innerHTML=playerOne;
document.getElementById("p2score").innerHTML=playerTwo;

var array = Array(3);
for(let x = 0; x != array.length; x++){
    array[x]= Array(10).fill(3);
}
var speed = 0;
var speedDown = 0;
var hardRightOne = 0;
var hardLeftOne = 0;
var hardRightTwo = 0;
var hardLeftTwo = 0;
var moveTwo = {
    HardRight:false,
    HardLeft:false,
    Down:false, 
    Right:true
}
var move = {
    HardRight:false,
    HardLeft:false,
    Down:true, 
    Right:true
}
var positionTwo = {
    x:canvas.width/2-10,
    y:300
}
var position = {
    x:canvas.width/2-10,
    y: 600
}
var BrickTwo = {
    x:(canvas.width/2)-50,
    y:0
}
var Brick = {
    x:(canvas.width/2)-50,
    y:canvas.height-20
}
draw();
document.getElementById("close").addEventListener("click",()=>{
    document.getElementById("modal").style="transform: translate(-50%, -50%) scale(0);"
    speed=5;
    speedDown=10;
})
function draw(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle="#DC143C";
    context.beginPath();
    context.moveTo(position.x, position.y);
    context.arc(position.x,position.y,20,0,2*Math.PI);
    context.fill();
    context.stroke();
    context.beginPath();
    context.arc(positionTwo.x, positionTwo.y, 20,0,2*Math.PI);
    context.fill();
    context.stroke();
    context.fillRect(Brick.x,Brick.y,100,20);//100
     context.fillRect(BrickTwo.x, BrickTwo.y, 100, 20)
    array = bricks();
}

function bricks(){
    for(let x = 0; x != array.length; x++){
        for(let y = 0; y != array[x].length; y++){
            switch (array[x][y]) {
                case 3:
                    context.beginPath();
                    context.fillStyle='#FF0000';
                    context.fillRect(y*5+5+(y*73),5*x+(x*20)+365,73,20);
                    context.stroke();
                    //console.log(5*x+x*20)
                    break;
                case 2:
                    context.beginPath();
                    context.fillStyle="#FF4700";                    
                    context.fillRect(y*5+5+(y*73),5*x+(x*20)+365,73,20);
                    context.stroke();
                    break;
                case 1:
                    context.beginPath();
                    context.fillStyle="#FFA500"
                    context.fillRect(y*5+5+(y*73),5*x+(x*20)+365,73,20);
                    context.stroke();
                default:
                    break;
            }
        }
    }
    return array;
}

function check(array){
    bricksCheck(array);
    //check left wall
    if(position.x-10 <= 0){
        move.Right=true;
        move.HardLeft=false;
    }
    //check right wall
    if(position.x >= canvas.width-20){
        move.Right=false;
        move.HardRight=false;
    }

    if(position.y-10 <= 0){
        move.Down=true;
        playerTwo++;
    }
    if(position.x-Brick.x < 30 && position.y == Brick.y-20 && position.x-Brick.x > 0){
        move.Down=false;
        move.HardLeft=true;
        move.HardRight= false;
    }
    if(position.x-Brick.x < 100 && position.y == Brick.y-20 && position.x-Brick.x > 70){
        move.Down=false;
        move.HardRight=true;
    }  
   if(position.x-Brick.x < 100 && position.y == Brick.y-20 && position.x-Brick.x > 0){
        move.Down=false;
    }
    if(positionTwo.x-Brick.x < 100 && positionTwo.y == Brick.y-20 && positionTwo.x-Brick.x > 0){
        moveTwo.Down=false;
    }
    //second 

    //check left wall
    if(positionTwo.x-10 <= 0){
        moveTwo.Right=true;
        moveTwo.HardLeft=false;
    }
    //check right wall
    if(positionTwo.x >= canvas.width-20){
        moveTwo.Right=false;
        moveTwo.HardRight=false;
    }
    //check top wall
    if(positionTwo.y-10 <= 0){
        moveTwo.Down=true;
        playerTwo++;
    }

    //check if it hit the left side of the paddle 
    if(positionTwo.x-BrickTwo.x < 30 && positionTwo.y == BrickTwo.y-20 && positionTwo.x-BrickTwo.x > 0){
        moveTwo.Down=false;
        moveTwo.HardRight=false;
        moveTwo.HardLeft=true;
        moveTwo.HardRight= false;
    }
    //check if it hit the right side of the paddle
    if(positionTwo.x-BrickTwo.x < 100 && positionTwo.y == BrickTwo.y-20 && positionTwo.x-BrickTwo.x > 70){
        moveTwo.Down=false;
        moveTwo.HardRight=true;
        moveTwo.hardLeft=false;
        moveTwo.right=true; 
    }
    //check if ball hit the paddle
   if(positionTwo.x-(BrickTwo.x) < 100 && positionTwo.y == BrickTwo.y+20 && positionTwo.x-BrickTwo.x > 0){
        moveTwo.Down=true;
    }
    if(position.x-(BrickTwo.x) < 100 && position.y == BrickTwo.y+20 && position.x-BrickTwo.x > 0){
        move.Down=true;
    }

    if(position.y+10 == canvas.height && position.x-Brick.x > 100){
        move.Down = false;
    }
    if(position.x < Brick.x && position.y-10 == canvas.height){

        move.Down= false;
    }
     if(position.y == 800-20){
         move.Down = false;
         playerOne++;
     }
     if(positionTwo.y == 800-20){
        moveTwo.Down= false;
        playerOne++;
    }
}
function bricksCheck(){
    if(position.y < 435){
        if(array[2][Math.floor(position.x/73)]!= 0){
            array[2][Math.floor(position.x/73)] -=1;
            move.Down=true;
            move.HardLeft=false;
            move.HardRight=false;
        } 
    }
    if(position.y < 410){
        if(array[1][Math.floor(position.x/73)]!= 0){
            array[1][Math.floor(position.x/73)] -=1;
            move.Down=true;
            move.HardLeft=false;
            move.HardRight=false;
        } 
    }
    if(position.y < 385){
        if(array[0][Math.floor(position.x/73)]!= 0){
            array[0][Math.floor(position.x/73)] -=1;
            move.Down=true;
            move.HardLeft=false;
            move.HardRight=false;
        } 
    }
    if(positionTwo.y > 415){
        if(array[2][Math.floor(positionTwo.x/73)]!= 0){
            array[2][Math.floor(positionTwo.x/73)] -=1;
            moveTwo.Down=false;
            moveTwo.HardLeft=false;
            moveTwo.HardRight=false;
        } 
    }
    if(positionTwo.y > 390){
        if(array[1][Math.floor(positionTwo.x/73)]!= 0){
            array[1][Math.floor(positionTwo.x/73)] -=1;
            moveTwo.Down=false;
            moveTwo.HardLeft=false;
            moveTwo.HardRight=false;
        } 
    }
    if(positionTwo.y > 365){
        if(array[0][Math.floor(positionTwo.x/73)]!= 0){
            array[0][Math.floor(positionTwo.x/73)] -=1;
            moveTwo.Down=false;
            moveTwo.HardLeft=false;
            moveTwo.HardRight=false;
        } 
    }
}
document.addEventListener('keypress', (event)=>{
    switch(event.key){
        case "d":
            if(Brick.x < canvas.width-100){
                Brick.x+=20;
            }
            break;
        case "a":
            if (Brick.x > 0) {
                Brick.x-=20;
            }
            break;
        case "j":
            if (BrickTwo.x > 0) {
                BrickTwo.x-=20;
            }
            break;
        case "l":
            if(BrickTwo.x < canvas.width-100){
                BrickTwo.x+=20;
            }
            break;
        default:
            console.log(event.key);
    }
})
setInterval(()=>{
    check();
    document.getElementById("p1score").innerHTML=playerOne;
    document.getElementById("p2score").innerHTML=playerTwo;
    if(move.HardRight){
        hardRightOne=5;
        hardLeftOne=0;
    }
    if(move.HardLeft){
        hardLeftOne=5;
        hardRightOne=0;
    }
    if(move.Down){
        position.y+=speedDown;
        move.HardLeft=false;
        move.HardRight= false;
    }else{
        position.y-=speedDown;
        move.HardLeft=false;
        move.HardRight=false;
    }
    if(move.Right){
        position.x+=speed+hardRightOne;
    }else{
        position.x-=speed+hardLeftOne;
    }
    if(moveTwo.HardRight){
        hardRight=5;
        hardLeft=0;
    }
    if(moveTwo.HardLeft){
        hardLeftTwo=5;
        hardRightTwo=0;
    }
    if(moveTwo.Down){
        positionTwo.y+=speedDown;
        moveTwo.HardLeft=false;
        moveTwo.HardRight= false;
    }else{
        positionTwo.y-=speedDown;
        moveTwo.HardLeft=false;
        moveTwo.HardRight=false;
    }
    if(moveTwo.Right){
        positionTwo.x+=speed+hardRightTwo;
    }else{
        positionTwo.x-=speed+hardLeftTwo;
    }
    draw();
    if(playerOne > 9 || playerTwo >9){
        clearInterval();
        if(playerOne == 10){
            alert("player 2 wins")
            playerOne=0;
            playerTwo=0;
                window.location.reload();
        }        
        else{
            alert("player 2 wins")
            playerOne=0;
            playerTwo=0;
            window.location.reload();
        }   
    }
},40); 

window.onload = function() {
    var secs = 0;
        var id = setInterval(function(){ 
            secs++; console.log(secs);
            document.getElementById("timer").innerHTML="time:"+secs;
        }, 1000);
};