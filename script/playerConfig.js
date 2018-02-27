var interval;
var playerId = JSON.parse(localStorage.getItem("currentPlayer"))
// var dafultPlayer = {
//     name: "default",
//     id: ++playerId, 
//     score: 0
// }
// players.push(dafultPlayer)
// localStorage.setItem("players", JSON.stringify(players))
var elements = document.querySelectorAll(".noActive")
var startScreen = document.querySelector(".start")
var gameScreen = document.querySelector('.game')
var chagnePlayerScreen = document.querySelector(".changePlayer")
var highScoresScreen = document.querySelector(".highScores")
var creditsScreen = document.querySelector(".credits")
var onAddPlayer = document.querySelector("#addPlayer")
var index = 1
var levelsNames = [{
        name: "Slow",
        speed: 200
    },
    {
        name: "Normla",
        speed: 150
    },
    {
        name: "Fast",
        speed: 80
    }, 
    {
        name: "Narkaman",
        speed: 25
    }
]

function activeClass(arrow, lastOrFirst, length){
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].classList.contains("active")) {
            elements[i].classList.remove("active")
            if (elements[i] == elements[elements.length - length]) {
                elements[lastOrFirst].classList.add("active")
                break
            }else {
                elements[i + arrow].classList.add("active")
                break
            }
            
        }
    }
}

function arrowChanger(index){
    if (index == levelsNames.length -1) {
        document.querySelector(".levelRight").textContent = ""
        
    }else{
        document.querySelector(".levelRight").textContent = ">"
        
    }
    
    if (index == 0) {
        document.querySelector(".levelLeft").textContent = ""        
    }else{
        document.querySelector(".levelLeft").textContent = "<"                
    }
}
window.addEventListener('keydown', function(e){
    if (e.keyCode == 40) {
        activeClass(1, 0, 1)
    }
    if(e.keyCode == 38){
        activeClass(-1, 4, 5)
    }
    if (e.keyCode == 39) {
        elements.forEach(elm => {
            if (elm.classList.contains("active") && elm.classList.contains("level")) {
                if (index < levelsNames.length -1) {
                    index++
                    arrowChanger(index)
                    elm.setAttribute("data-level", levelsNames[index].name)
                    elm.textContent = levelsNames[index].name    
                }                                           
            }
        })
    }
    if (e.keyCode == 37) {
        elements.forEach(elm => {
            if (elm.classList.contains("active") && elm.classList.contains("level")) {
                if (index > 0) {
                    index--
                    arrowChanger(index)
                    elm.setAttribute("data-level", levelsNames[index].name)
                    elm.textContent = levelsNames[index].name    
                }
            }
        })
    }
    if (e.keyCode == 13) {
        let elm = document.querySelector(".active")
        if (elm.textContent ==  "Start") {
            startScreen.style.display = "none"
            gameScreen.style.display = "block"
            // var script = document.createElement("script");
            // script.type = "text/javascript";
            // script.src = "script/main.js"; 
            // console.log(script)
            // document.getElementsByTagName("head")[0].appendChild(script);
                        
            interval = setInterval(AllInervals, levelsNames[index].speed) 
            console.log(levelsNames[index].speed)
                        
        }
        if (elm.textContent == "Change Player") {
            startScreen.style.display = "none"
            console.log(chagnePlayerScreen)
            chagnePlayerScreen.style.display = "block"
        }
        if (elm.textContent == "Credits") {
            startScreen.style.display = "none"
            creditsScreen.style.display = "block"
        }
        if (elm.textContent == "High Scores") {
            startScreen.style.display = "none"
            highScoresScreen.style.display = "block" 
        }

    }
});
var playersJson = JSON.parse(localStorage.getItem("players"))
if (playersJson != null) {
    var players = JSON.parse(localStorage.getItem("players"))
}else{
    let new1 = prompt("Please Type your name", "NAme")
    var players = []
    console.log(new1)
    addNewPlayer(new1)
    console.log(players)
    localStorage.setItem("currentPlayer", JSON.stringify(players[0]))        
}


function addNewPlayer(value){
    if (value == "") {
        alert("pleas fill the form")
        return
    }
    let newPlayer = {
        name: value,
        id: Date.now(),
        score: 0
    }
    players.push(newPlayer)
    console.log(players)
    
    localStorage.setItem("players", JSON.stringify(players))

}

onAddPlayer.addEventListener("click", function(e){
    let inputValue = document.querySelector("#playerName").value
    addNewPlayer(inputValue)
    // console.log(players)
    playerDisplay()
    
})
function playerDisplay(){
    // Players text
    let  playersMain = document.querySelector(".players")
    // let  playersLocal = JSON.parse(localStorage.getItem("players"))
    // console.log(playersLocal)
    playersMain.innerHTML = ""
    for (let i = 0; i < players.length; i++) {
        playersMain.innerHTML += `
            <li data-playerId="${players[i].id}"> Player Name = ${players[i].name} & score = ${players[i].score} <input class="radio" type="radio" name="currentPlayer" value="male"> <li>
        `
        
    }
}

playerDisplay()

var savePlayer = document.querySelector(".savePlayer")
savePlayer.addEventListener("click", currentPlayer)
function currentPlayer(){
    let radio = document.querySelectorAll(".radio")
    radio.forEach(elm => {
        if (elm.checked == true) {
            let id = elm.parentNode.getAttribute("data-playerId")
            for (let i = 0; i < players.length; i++) {
                if (id == players[i].id) {
                    console.log(players[i])
                    playerId = players[i]
                }
                
            }
            console.log(playerId)
            localStorage.setItem("currentPlayer", JSON.stringify(playerId))
            location.reload()
            startScreen.style.display = "block"
            gameScreen.style.display = "none"
            console.log(chagnePlayerScreen)
            chagnePlayerScreen.style.display = "none"
        }

    })
}

function highScoresRender(){
    let table = document.querySelector("#tabelScore")
    sort = players.sort((a,b) => {
        return b.score - a.score
    })
    console.log(sort)
    console.log(table)
    sort.forEach(player => {
        console.log(player.score)
        let elm = `<tr>
        <td>${player.name} </td> 
        <td>${player.score}</td>
    </tr>
    `
    table.innerHTML += elm
    })
           
}
highScoresRender()

var back = document.querySelectorAll(".back")
console.log(back)
back.forEach(elm => {
    elm.addEventListener("click", function(e){
        elm.parentElement.style.display = "none"
        startScreen.style.display = "block"
        
    })
})