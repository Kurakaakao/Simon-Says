// Simon says color order that needs to be followed to win
let order = [];
// Order that is inputted by the player
let playerOrder = [];
let flash;
let turn;
let good;
let compTurn;
let intervalId;
let strict = false;
let noise = true;
let on = false;
let win;

//const _turnCounter = document.querySelector("#turn")
const _turnCounter = document.getElementById("turn");
const _topLeft = document.getElementById("topleft");
const _topRight = document.getElementById("topright");
const _bottomLeft = document.getElementById("bottomleft");
const _bottomRight = document.getElementById("bottomright");
const _strictButton = document.getElementById("strict");
const _onButton = document.getElementById("on");
const _startButton = document.getElementById("start");

_strictButton.addEventListener("click", (event) => {   //"click" works as well
    if (_strictButton.checked == true) {
        strict = true;
    } else {
        strict = false;
    }
});
_onButton.addEventListener("click", (event) => {
    if (_onButton.checked == true) {
        on = true;
        _turnCounter.innerHTML = "-";
    } else {
        on = false;
        _turnCounter.innerHTML = "";
        clearColor();
        clearInterval(intervalId);
    }
});

_startButton.addEventListener("click", (event) => {
    if (on || win) {
        play();
    }
});

function play() {
    win = false;
    order = [];
    playerOrder = [];
    flash = 0;
    intervalId = 0;
    turn = 1;
    _turnCounter.innerHTML = 1;
    good = true;
    for (let i = 0; i < 20; i++) {
        order.push(Math.floor(Math.random() * 4) + 1);  // A number between 1 and 5
    }
    compTurn = true;
    intervalId = setInterval(gameTurn, 800);
}

function gameTurn() {
    on = false; // On variable decides whether the player is capable of interacting with the game
    if (flash == turn) {
        clearInterval(intervalId);
        compTurn = false;
        clearColor();
        on = true;
    }
    if (compTurn) {
        clearColor();
        setTimeout(() => {
            if (order[flash] == 1) one();
            if (order[flash] == 2) two();
            if (order[flash] == 3) three();
            if (order[flash] == 4) four();
            flash++;
        }, 200);
    }
}

function one() {
    if (noise) {
        let audio = document.getElementById("clip1");
        audio.play();
    } 
    noise = true;
    _topLeft.style.backgroundColor = "lightgreen";
}
function two() {
    if (noise) {
        let audio = document.getElementById("clip2");
        audio.play();
    } 
    noise = true;
    _topRight.style.backgroundColor = "tomato";
}
function three() {
    if (noise) {
        let audio = document.getElementById("clip3");
        audio.play();
    } 
    noise = true;
    _bottomLeft.style.backgroundColor = "yellow";
}
function four() {
    if (noise) {
        let audio = document.getElementById("clip4");
        audio.play();
    } 
    noise = true;
    _bottomRight.style.backgroundColor = "lightskyblue";
}

function clearColor() {
    _topLeft.style.backgroundColor = "darkgreen";
    _topRight.style.backgroundColor = "darkred";
    _bottomLeft.style.backgroundColor = "goldenrod";
    _bottomRight.style.backgroundColor = "darkblue";
}
function flashColor() {
    _topLeft.style.backgroundColor = "lightgreen";
    _topRight.style.backgroundColor = "tomato";
    _bottomLeft.style.backgroundColor = "yellow";
    _bottomRight.style.backgroundColor = "lightskyblue";
}

_topLeft.addEventListener("click", (event) => {
    if (on) {
        playerOrder.push(1);
        check();
        one();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});
_topRight.addEventListener("click", (event) => {
    if (on) {
        playerOrder.push(2);
        check();
        two();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});
_bottomLeft.addEventListener("click", (event) => {
    if (on) {
        playerOrder.push(3);
        check();
        three();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});
_bottomRight.addEventListener("click", (event) => {
    if (on) {
        playerOrder.push(4);
        check();
        four();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});

function check() {
    if (playerOrder[playerOrder.length -1] !== order[playerOrder.length - 1])
        good = false;

    if (playerOrder.length == 20 && good == true) {
        winGame();
    }
    
    if (good == false) {
        flashColor();
        _turnCounter.innerHTML = "NO!";
        setTimeout(() => {
            _turnCounter.innerHTML = turn;
            clearColor();

            if (strict) {
                play();
            } else {
                compTurn = true;
                flash = 0;
                playerOrder = [];
                good = true;
                intervalId = setInterval(gameTurn, 800);
            }
        }, 800);

        noise = false;
    }

    if (turn == playerOrder.length && good && !win) {
        turn++;
        playerOrder = [];
        compTurn = true;
        flash = 0;
        _turnCounter.innerHTML = turn;
        intervalId = setInterval(gameTurn, 800);
    }
}

function winGame() {
    flashColor();
    _turnCounter.innerHTML = "WIN!"
    on = false;
    win = true;
}