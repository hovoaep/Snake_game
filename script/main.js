// Eduard jan qnum em lav mna, mi qani ban chi stacvel, harcer unem, 
// p.s. shokolads cmoarnas :PPP


function Game(){
    
}
Game.cavnas = document.getElementById("mgh");
Game.ctx = Game.cavnas.getContext("2d")
// ClearBoard
Game.clearBoard = function () {
    Game.ctx.fillStyle = "blue"
    Game.ctx.fillRect(0,0, Game.cavnas.width, Game.cavnas.height)    
}
// Food
function Food(posX, posY){
    this.posX = Math.floor(Math.random() * Game.cavnas.width/30) * 30
    this.posY = Math.floor(Math.random() * Game.cavnas.height/30) * 30
    // eats draw
    this.draw = function(){
        Game.ctx.fillStyle = "red"        
        Game.ctx.fillRect(this.posX, this.posY, 30, 30)        
    }
    // eats update
    this.update = function(){
        this.posX = Math.floor(Math.random() * Game.cavnas.width/30) * 30
        this.posY = Math.floor(Math.random() * Game.cavnas.height/30) * 30        
    }
    this.bigFodd = function() {
        Game.ctx.fillStyle = "blac"        
        Game.ctx.fillRect(this.posX, this.posY, 50, 50)      
    }
}
// Snake
function Snake (headX, headY) {
    this.score = 0
    this.headX = headX
    this.headY = headY
    this.eatX = Game.cavnas.width/2
    this.eatY = Game.cavnas.height/2
    this.vx = 1
    this.vy = 0
    this.body = []
    this.limit = 3
    this.speed = 150
    this.playerId = JSON.parse(localStorage.getItem("currentPlayer"))
    // console.log(this.playerId.name)
    // Snake Update
    this.update =function () {
        this.headX += this.vx
        this.headY += this.vy
        if (this.headX * 30 > Game.cavnas.width) {
            this.headX = 0
        }else if (this.headY * 30 > Game.cavnas.height) {
            this.headY = 0
        }else if (this.headY * 30 < 0) {
            this.headY = Game.cavnas.height/30
        }else if(this.headX * 30 < 0){
            this.headX = Game.cavnas.width/30            
        }
    }
    // Snake Direction
    this.dir = function(vx, vy){
        if (this.vx != -vx) {
            this.vx = vx        
        }
        if (this.vy != -vy) {
            this.vy = vy
        }
        
    }
    // Snake Draw
    this.draw = function () {
        Game.ctx.fillStyle = "#FACE30"
        for (let cube of this.body) {
            // var shadowRenderer = new CanvasLongShadow.Renderer(400, 400);
            // shadowRenderer.render(Game.ctx, drawShape, {angleDeg: 10, throwDistance: 10});
            // drawShape(Game.ctx)
            // function drawShape(ctx) {
                Game.ctx.fillRect(cube.headX * 30, cube.headY * 30, 30, 30)            
                // ctx.fillRect(cube.headX - 30, cube.headY - 30, 40, 40)  
            // ctx.fillRect(0, -0, 100, 100);
        // }
        }
        this.update()
        
        this.body.push({headX:this.headX, headY:this.headY})
        while (this.body.length > this.limit) {
            this.body.shift()
            // console.log(this.body)
        }
    }
    // Eating
    this.eats = function (elm) {
        if (this.headX == elm.posX/30  && this.headY == elm.posY/30  ) {
            this.limit++
            elm.update()
            this.score++
            document.getElementById("scorePlaceholder").textContent = `Your current score is ${this.score}` 
            if (this.score%3 == 0) {
                gameFood.bigFodd()
                
                this.speed = this.speed / 3
            }
        }
    }
    // OverBody
    this.over = function(){
        let elm = this.body
        for (let i = elm.length - 2; i >= 0; i--) {
            if (this.body[i].headX == this.body[elm.length -1].headX  && this.body[i].headY == this.body[elm.length -1].headY  ) {
                clearInterval(interval) 
                if (this.score > this.playerId.score ) {
                        let temp = JSON.parse(localStorage.getItem("players"))
                        temp.forEach(elm => {
                            if (elm.id == this.playerId.id) {
                                elm.score = this.score
                                localStorage.setItem("players", JSON.stringify(temp))                    
                                localStorage.setItem("currentPlayer", JSON.stringify(elm))       
                                alert("Game Over")
                            }
                        });

                    console.log(temp)
                }
            }
        }
    }
    this.message = function(){ 
        this.playerId = JSON.parse(localStorage.getItem("currentPlayer"))

        let text = `Welcome dear ${this.playerId.name}. Your best Score is ${this.playerId.score}`
        console.log(text)
        $("#message").text(text)
    }
}
var test = 100
// Make
var gameFood = new Food()
Game.snake = new Snake(0,0)
let speedSnake = Number(Game.snake.speed)
console.log(gameFood.draw)
Game.snake.message()
function AllInervals(){
    // console.log(interval)
    // console.log(playerId.name)

    Game.clearBoard();
    Game.snake.draw()
    gameFood.draw()
    Game.snake.eats(gameFood)
    Game.snake.over()
}

// setTimeout(function(){
//     console.log(1)  
//     clearInterval(interval)
//     console.log(typeof interval)
//     // setInterval(interval, 100)
// }, 500)
// Controls
$(document).keydown((e) => {
    switch (e.keyCode) {
        case 87: // w 
        case 38:
        Game.snake.dir(0, -1)       
            break;
        case 83: // s
        case 40:
        Game.snake.dir(0, 1)               
            break
        case 65: //a
        case 37:
        Game.snake.dir(-1, 0)
            break
        case 68: // d
        case 39:
        Game.snake.dir(1, 0)                       
            break;        
        default:
            break;            
    }
})

// Speed For space
// $(document).on({
//     keydown: function(e){
//         test = test / 2
//         // console.log(test)
//      }
//     // },} 
//     // keyup: function(e){
//     //     speedSnake = Game.snake.speed
//     //     // console.log(speedSnake)
//     // }
// })
