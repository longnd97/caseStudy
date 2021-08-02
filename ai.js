let aIAtk = [0, 2, 4, 20, 100, 105, 110, 115, 120, 130];
let aIDef = [0, 1, 3, 15, 55, 56, 57, 58, 60, 62];

function aIMode() {
    if (!inGame) return;
    let vmax = -Infinity;
    let px = py = -1;
    let TBoard = getBoard();
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            if (TBoard[x + y * size] == -1) {
                TBoard[x + y * size] = 1;
                let mark = getMark(x, y, TBoard);
                TBoard[x + y * size] = -1;
                if (mark > vmax) {
                    px = x;
                    py = y;
                    vmax = mark;
                }
            }
        }
    }
    try {
        let sqr = document.getElementsByClassName("square");
        sqr.item(px + py * size).setAttribute("player", "1");
        sqr.item(px + py * size).style.backgroundImage = "url('images/x.png')";
        l_played.push(px + py * size);
    } catch (e) {
        alert(e.message)
    }
}

function getBoard() {
    let TBoard = [];
    let sqr = document.getElementsByClassName("square");
    for (let i = 0; i < size * size; i++)
        TBoard.push(parseInt(sqr.item(i).getAttribute("player")));

    return TBoard;
}

function getMark(x, y, Tboard) {
    let val = Tboard[x + y * size];
    if (val == -1) return 0;

    let result = aIAtk[getMarkHor(x, y, Tboard, 1)] + aIAtk[getMarkVer(x, y, Tboard, 1)]
        + aIAtk[getMarkCross1(x, y, Tboard, 1)] + aIAtk[getMarkCross2(x, y, Tboard, 1)];

    result += aIDef[getMarkHor(x, y, Tboard, 0)] + aIDef[getMarkVer(x, y, Tboard, 0)]
        + aIDef[getMarkCross1(x, y, Tboard, 0)] + aIDef[getMarkCross2(x, y, Tboard, 0)];

    return result;
}

function getMarkHor(x, y, TBoard, player) {
    let count = 0, counto = 0;
    for (let i = x - 1; i > 0; i--) {
        if (TBoard[i + y * size] == player) count++;
        else {
            if (TBoard[i + y * size] != -1) counto++;
            break;
        }
    }
    for (let i = x + 1; i < size; i++) {
        if (TBoard[i + y * size] == player) count++;
        else {
            if (TBoard[i + y * size] != -1) counto++;
            break;
        }
    }
    if (mode == 1 && counto >= 2) return 0;
    if ((x == 0 || x == size - 1) && count < 4) counto++;
    if (count <= counto) return 0;
    else if (count - counto >= 3) return count + counto;
    else return count - counto;
}

function getMarkVer(x, y, TBoard, player) {
    let count = 0, counto = 0;
    for (let i = y - 1; i > 0; i--) {
        if (TBoard[x + i * size] == player) count++;
        else {
            if (TBoard[x + i * size] != -1) counto++;
            break;
        }
    }
    for (let i = y + 1; i < size; i++) {
        if (TBoard[x + i * size] == player) count++;
        else {
            if (TBoard[x + i * size] != -1) counto++;
            break;
        }
    }
    if (mode == 1 && counto >= 2) return 0;
    if ((y == 0 || y == size - 1) && count < 4) counto++;
    if (count <= counto) return 0;
    else if (count - counto >= 3) return count + counto;
    else return count - counto;
}

function getMarkCross1(x, y, TBoard, player) {
    let count = 0, counto = 0;
    for (let i = 1; i < min(size - x, y + 1); i++) {
        if (TBoard[(x + i) + (y - i) * size] == player) count++;
        else {
            if (TBoard[(x + i) + (y - i) * size] != -1) counto++;
            break;
        }
    }
    for (let i = 1; i < min(x + 1, size - y); i++) {
        if (TBoard[(x - i) + (y + i) * size] == player) count++;
        else {
            if (TBoard[(x - i) + (y + i) * size] != -1) counto++;
            break;
        }
    }
    if (mode == 1 && counto >= 2) return 0;
    if ((x == 0 || x == size - 1 || y == 0 || y == size - 1) && count < 4) counto++;
    if (count <= counto) return 0;
    else if (count - counto >= 3) return count + counto;
    else return count - counto;
}

function getMarkCross2(x, y, TBoard, player) {
    let count = 0, counto = 0;
    for (let i = 1; i < min(x + 1, y + 1); i++) {
        if (TBoard[(x - i) + (y - i) * size] == player) count++;
        else {
            if (TBoard[(x - i) + (y - i) * size] != -1) counto++;
            break;
        }
    }
    for (let i = 1; i < min(size - x, size - y); i++) {
        if (TBoard[(x + i) + (y + i) * size] == player) count++;
        else {
            if (TBoard[(x + i) + (y + i) * size] != -1) counto++;
            break;
        }
    }
    if (mode == 1 && counto >= 2) return 0;
    if ((x == 0 || x == size - 1 || y == 0 || y == size - 1) && count < 4) counto++;
    if (count <= counto) return 0;
    else if (count - counto >= 3) return count + counto;
    else return count - counto;
}