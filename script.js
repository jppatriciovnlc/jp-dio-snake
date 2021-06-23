let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let score = document.getElementById("score");

let box = 32;       // 
let snake = [];
let counter = 0;
let direction = "right";

snake[0]= {
    x: 8 * box,
    y: 8 * box
};
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
};

score.innerText = counter;
document.addEventListener('keydown', update);





// default size: 512px x 512px  (16*32)
function createBackG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16*box, 16*box);
}

function createSnake(){
    for(let i = 0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box)
    }
}

function createFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box)
}



function update(event){
    console.log(event.keyCode)
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";    
}

function initGame(){

    

    console.log("direction=" + direction)
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    for(let i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(game);
            alert('Gamer Over! Aperte F5 para recomeçar!')
        }
    }

    createBackG();
    createSnake();
    createFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }
    else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        counter++;
        score.innerText = counter;
    }


    
    let newHead = {
        x: snakeX,
        y:snakeY
    }
    snake.unshift(newHead); 

}

let game = setInterval(initGame, 100);

initGame();

