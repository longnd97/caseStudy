let size = 16;
let CPlayer = 0;
const countMax = 5;
let l_played = [], l_win = [];
let inGame = false;
let AI = false;
let mode = 0;
let seconds = 30;

function loaded() {
    CPlayer = 0;
    let imgp = document.getElementById("imgPlayer");
    imgp.style.backgroundImage = "url('images/imgPlayer.png')";
    let table = document.getElementById("table");
    let row = document.getElementsByClassName("row");
    let square = document.getElementsByClassName("square");
    for (let y = 0; y < size; y++) {
        table.innerHTML += '<tr class=row></tr>';
        for (let x = 0; x < size; x++) {
            let div = '<div class=square onClick="onClick(id)" onMouseOver="mouseOver(id)" onMouseOut="mouseOut(id)"></div>';
            row.item(y).innerHTML += "<td class=col>" + div + "</td>";
            square.item(x + y * size).setAttribute("id", (x + y * size).toString());
            square.item(x + y * size).setAttribute("player", "-1");
        }
    }
}

function onClick(id) {
    if (!inGame) return;
    let square = document.getElementsByClassName("square");
    let pos = parseInt(id);
    if (square.item(pos).getAttribute("player") != "-1") return;
    let path = "url('images/o.png')";
    if (CPlayer == 1) path = "url('images/x.png')";
    square.item(pos).style.backgroundImage = path;
    square.item(pos).setAttribute("player", CPlayer.toString());
    l_played.push(pos);
    let win = winGame();
    let playerWin = CPlayer;
    if (!AI) {
        if (CPlayer == 0) CPlayer = 1;
        else CPlayer = 0;
        let imagePlayer = "url('images/imgPlayer.png')";
        let namePlayer = "ANH THẢO";
        if (CPlayer == 1) {
            imagePlayer = "url('images/chicken.jpg')"
            namePlayer = "CON GÀ";
        }
        let imgPlayer = document.getElementById("imgPlayer");
        imgPlayer.style.backgroundImage = imagePlayer;
        document.getElementById("namePlayer").innerHTML = namePlayer;
    } else {
        if (!win) {
            aIMode();
            win = winGame();
            playerWin = 1;
        }
    }

    if (win) {
        let mess = 'Con gà thắng anh Thảo';
        if (playerWin == 0) mess = 'Anh Thảo thua con gà';
        alert(mess);
        inGame = false;
        location.reload();
    }
}

function max(a, b) {
    if (a > b) return a;
    else return b;
}

function min(a, b) {
    if (a < b) return a;
    else return b;
}

function mouseOver(id) {
    if (!inGame) return;
    let square = document.getElementsByClassName("square");
    let pos = parseInt(id);
    square.item(pos).style.backgroundColor = "#3F3";
}

function mouseOut(id) {
    if (!inGame) return;
    let square = document.getElementsByClassName("square");
    let pos = parseInt(id);
    square.item(pos).style.backgroundColor = "#BF9469";
}

function winGame() {
    let result = false;
    let Board = getBoard();
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            if (winHor(x, y, Board) || winVer(x, y, Board) || winCross1(x, y, Board)
                || winCross2(x, y, Board)) {
                result = true;
            }
        }
    }
    return result;
}

function winHor(x, y, Board) {
    let count = 0, counto = 0;
    let player = Board[x + y * size];
    if (player == -1) return false;
    if (x > 0) {
        let p = Board[x - 1 + y * size];
        if (p != player && p != -1) counto++;
    }
    for (let i = x; i < size; i++) {
        let p = Board[i + y * size];
        if (p == player && p != -1) {
            count++;
            l_win.push(i + y * size);
        } else {
            if (p != -1) counto++;
            break;
        }
    }
    if (count >= countMax) {
        if (mode == 0)
            return true;
        else {
            if (counto >= 2) return false;
            else return true;
        }
    }
    return false;
}

function winVer(x, y, Board) {
    let count = 0, counto = 0;
    let player = Board[x + y * size];
    if (player == -1) return false;
    if (y > 0) {
        let p = Board[x + (y - 1) * size];
        if (p != player && p != -1) counto++;
    }
    for (let i = y; i < size; i++) {
        let p = Board[x + i * size];
        if (p == player && p != -1) {
            count++;
            l_win.push(x + i * size);
        } else {
            if (p != -1) counto++;
            break;
        }
    }
    if (count >= countMax) {
        if (mode == 0)
            return true;
        else {
            if (counto >= 2) return false;
            else return true;
        }
    }
    return false;
}

function winCross1(x, y, Board) {
    if (x > size - countMax || y < countMax - 1) return false;
    let count = 0, counto = 0;
    let player = Board[x + y * size];
    if (player == -1) return false;
    if (y < size - 1 && x > 0) {
        let p = Board[x - 1 + (y + 1) * size];
        if (p != player && p != -1) counto++;
    }
    for (let i = 0; i <= min(size - x, y); i++) {
        let p = Board[(x + i) + (y - i) * size];
        if (p == player && p != -1) {
            count++;
            l_win.push((x + i) + (y - i) * size);
        } else {
            if (p != -1) counto++;
            break;
        }
    }
    if (count >= countMax) {
        if (mode == 0)
            return true;
        else {
            if (counto >= 2) return false;
            else return true;
        }
    }
    return false;
}

function winCross2(x, y, Board) {
    if (x > size - countMax || y > size - countMax) return false;
    let count = 0, counto = 0;
    let player = Board[x + y * size];
    if (player == -1) return false;
    if (y > 0 && x > 0) {
        let p = Board[x - 1 + (y - 1) * size];
        if (p != player && p != -1) counto++;
    }
    for (let i = 0; i < min(size - x, size - y); i++) {
        let p = Board[(x + i) + (y + i) * size];
        if (p == player && p != -1) {
            count++;
            l_win.push((x + i) + (y + i) * size);
        } else {
            if (p != -1) counto++;
            break;
        }
        ;
    }
    if (count >= countMax) {
        if (mode == 0)
            return true;
        else {
            if (counto >= 2) return false;
            else return true;
        }
    }
    return false;
}

function PvsP() {
    AI = false;
    inGame = true;
}

function PvsM() {
    let display = document.querySelector('#time');
    AI = true;
    inGame = true;
    startTimer(seconds, display);
}

function undo(time) {
    if (time < 1) return;
    if (l_played.length <= 0 || !inGame) return;
    let sqr = document.getElementsByClassName("square");
    sqr.item(l_played[l_played.length - 1]).setAttribute("player", "-1");
    sqr.item(l_played[l_played.length - 1]).style.backgroundImage = "";
    l_played.pop();
    if (CPlayer == 0) CPlayer = 1;
    else CPlayer = 0;
    let imagePlayer = "url('images/imgPlayer.png')";
    let namePlayer = "ANH THẢO"
    if (CPlayer == 1) {
        imagePlayer = "url('images/chicken.jpg')";
        namePlayer = "CON GÀ"
    }
    document.getElementById("imgPlayer").style.backgroundImage = imagePlayer;
    document.getElementById("namePlayer").innerHTML = namePlayer;
    if (AI)
        undo(time - 1);
}

function reset() {
    location.reload();
}

function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 0);
        seconds = parseInt(timer % 60, 0);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            location.reload();
            alert("Hết giờ!! Anh Thảo thua con gà")
        }
    }, 1000);
}



