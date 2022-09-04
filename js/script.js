console.log("hello");

//constants
let inputDir = {x:0,y:0};//Initial
let lastPaintTime=0;
let speed=2;
let snakeArr=[{x:13,y:15}];
let food ={x:6,y:7};
let board=document.querySelector('#board');
let score=0;

//Game functions
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000 < 1/speed)
     {
        return;
     }
   
     lastPaintTime=ctime;
     gameEngine();
}
function isCollide(snakeArr){ // SNAKE DIE IF BUMPS ITSELF OR WALL

    //IF BUMPS INTO YOURSELF
    for(let i=1;i<snakeArr.length;i++)
    {
        if(snakeArr[0].x === snakeArr[i].x && snakeArr[0].y===snakeArr[i].y)
         return true;
        
    }

    //BUMPS INTO WALL

    if(snakeArr[0].x<=0 || snakeArr[0].x>=18 && snakeArr[0].y>=18 || snakeArr[0].y<=0)
     return true;
   
}

function gameEngine(){
    //part1: updating snake array
     if(isCollide(snakeArr)){
       inputDir={x:0,y:0};
       alert("Game Over, Press any key to play again");
       snakeArr=[{x:13,y:15}];
       score=0;
     }
     //IF FOOD EATEN REGERNTE FOOD AND ++FOOD
     if(snakeArr[0].y === food.y && snakeArr[0].x === food.x)
     {
        snakeArr.unshift({x: snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y});
        let a= 2;let b= 16;
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};
     }

     //MOVING THE SNAKE
      for(let i=snakeArr.length-2;i>=0;i--)
      {
       
        snakeArr[i+1]={...snakeArr[i]};
      }
      snakeArr[0].x+=inputDir.x;
      snakeArr[0].y+=inputDir.y;
    //part2:display the snake 
     board.innerHTML="";
     snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        // snakeElement.classList.add('snake');
        if(index === 0){
            snakeElement.classList.add('head'); //head of snake is going to be red
        }
        else{
            snakeElement.classList.add('snake');//body will be purple
        }
        board.appendChild(snakeElement);
     })

     //displaying the food
     foodElement = document.createElement('div');
    foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
}













//mian logics.
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir = {x:0,y:1};
    switch(e.key){
        case "ArrowUp":
             console.log("Arrow up");
             inputDir.x=0;
             inputDir.y=-1;
             break;
        case "ArrowDown":
             console.log("Arr d");
             inputDir.x=0;
             inputDir.y=1;
             break;
        case "ArrowLeft":
            console.log("Arr l");
            inputDir.x=-1;
             inputDir.y=0;
            break;
        case "ArrowRight":
            console.log("Arr r");
            inputDir.x=1;
             inputDir.y=0;
            break;
        default:
            break;
    }
})
