class Player {
    constructor() {
        this.color = "";
        this.usedPower = false;
        this.threes = 0;
    }
    get Color() {
        return this.color;
    }
    get UsedPower() {
        return this.usedPower;
    }
    get Threes() {
        return this.threes;
    }
    setColor(color) {
        this.color = color;
    }
    setPower() {
        this.usedPower = true;
    }
    setThrees(n) {
        this.threes = n;
    }
    incrementThrees(n) {
        this.threes += n;
    }
}

let matrix; // matrix representing game board
let player = 1; // start as player 1
let gameWon = false; // game starts as not won

// declare settings
let boardsize;
let boardcolor;
let hints;
let powers;

// create player 1 and player 2
let p1 = new Player();
let p2 = new Player();

function generateBoard(n, m) {
    // create 2d array and fill with 0's
    matrix = new Array(n);
    for (let i = 0; i < n; i++) {
        matrix[i] = new Array(m);
        matrix[i].fill(0);
    }

    // create first row of empty slots (where player will drop pieces)
    let table = document.getElementById("board");
    let firstRow = document.createElement("tr");
    for (let i = 0; i < m; i++) {
        let dropCol = document.createElement("td");
        dropCol.classList.add("empty-col");
        if (i == 0) {
            dropCol.classList.add("left");
        }
        if (i == m - 1) {
            dropCol.classList.add("right");
        }
        let dropSlot = document.createElement("div");
        dropSlot.classList.add("empty-slot");
        dropSlot.setAttribute("data-value", i);
        dropSlot.setAttribute("onclick", "placePiece(this.getAttribute('data-value'))")
        dropCol.appendChild(dropSlot);
        firstRow.appendChild(dropCol);
    }
    table.appendChild(firstRow);

    // add actual board of size given in arguments of function
    for (let i = 0; i < n; i++) {
        let boardRow = document.createElement("tr");
        boardRow.classList.add("board-row");
        for (let j = 0; j < m; j++) {
            let slot = document.createElement("td");
            slot.classList.add("board-col");
            if (i == 0) {
                slot.classList.add("top");
            }
            if (i == n - 1) {
                slot.classList.add("bottom");
            }
            if (j == 0) {
                slot.classList.add("left");
            }
            if (j == m - 1) {
                slot.classList.add("right");
            }
            let emptySlot = document.createElement("div");
            emptySlot.classList.add("slot");
            slot.appendChild(emptySlot);
            boardRow.appendChild(slot);
        }
        table.appendChild(boardRow);
    }
}

function flipMatrix() {
    // vertically reverse order of each column
    for (let j = 0; j < matrix[0].length; j++) {
        for (let i = 0; i < matrix.length / 2; i++) {
            let temp = matrix[i][j];
            matrix[i][j] = matrix[matrix.length - 1 - i][j];
            matrix[matrix.length - 1 - i][j] = temp;
        }
    }

    // make all pieces move down into empty slots if need be
    for (let j = 0; j < matrix[0].length; j++) {
        for (let i = matrix.length - 1; i > 0; i--) {
            if (matrix[i][j] == 0 && matrix[i-1][j] != 0) {
                let index = i;
                while (index < matrix.length && matrix[index][j] == 0 && matrix[index-1][j] != 0) {
                    matrix[index][j] = matrix[index-1][j];
                    matrix[index-1][j] = 0;
                    index++;
                }
            }
        }
    }
    reprintBoard();
    (player == 1) ? p1.setPower() : p2.setPower();
    document.getElementById("powerbtn").disabled = true;
    p1.setThrees(recountThrees(1));
    p2.setThrees(recountThrees(2));
}

// update board to reflect changes to matrix
function reprintBoard() {
    let slots = document.querySelectorAll(".slot");
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 1) {
                slots[(i*matrix[i].length)+j].classList.add("player1");
                slots[(i*matrix[i].length)+j].classList.remove("player2");
            }
            if (matrix[i][j] == 2) {
                slots[(i*matrix[i].length)+j].classList.add("player2");
                slots[(i*matrix[i].length)+j].classList.remove("player1");
            }
        }
    }
    let p1s = document.querySelectorAll(".player1");
    for (p of p1s) {
        p.style.backgroundColor = p1.Color;
    }
    let p2s = document.querySelectorAll(".player2");
    for (p of p2s) {
        p.style.backgroundColor = p2.Color;
    }
}

// check if piece can be placed in column
function canPlacePiece(col) {
    return (matrix[0][col] == 0);
}

// if possible, drop a piece into selected column
function placePiece(col) {
    let j = parseInt(col);
    if (canPlacePiece(j)) {
        let i = matrix.length - 1;
        while (matrix[i][j] != 0) {
            i--;
        }
        matrix[i][j] = player;
        // check if winner
        if (checkHorizontal(i, j, player) >= 4 || checkVertical(i, j, player) >= 4 || checkLtoR(i, j, player) >= 4 || checkRtoL(i, j, player) >= 4) {
            console.log(`Player ${player} wins!`);
        }
        // increment number of threes
        let tempThrees = 0;
        if (checkHorizontal(i, j, player) == 3) tempThrees++;
        if (checkVertical(i, j, player) == 3) tempThrees++;
        if (checkLtoR(i, j, player) == 3) tempThrees++;
        if (checkRtoL(i, j, player) == 3) tempThrees++;
        (player == 1) ? p1.incrementThrees(tempThrees) : p2.incrementThrees(tempThrees);

        player = (player == 1) ? 2 : 1;
        reprintBoard();
        if (powers == '1') {
            if (player == 1) {
                (p1.UsedPower == false) ? document.getElementById("powerbtn").disabled = false : document.getElementById("powerbtn").disabled = true;
            }
            else {
                (p2.UsedPower == false) ? document.getElementById("powerbtn").disabled = false : document.getElementById("powerbtn").disabled = true;
            }
        }
    }
    else {
        alert("Column is full");
    }
}

// check how many in a row downwards
function checkVertical(i, j, player) {
    let counter = 0;
    while (i < matrix.length && matrix[i][j] == player) {
        counter++;
        i++;
    }
    return counter;
}

// check how many in a row horizontally
function checkHorizontal(i, j, player) {
    let counter = 0;
    let j_l = j;
    // check going left
    while (j_l >= 0 && matrix[i][j_l] == player) {
        counter++;
        j_l--;
    }
    let j_r = j + 1;
    // check going right
    while (j_r < matrix[i].length && matrix[i][j_r] == player) {
        counter++;
        j_r++;
    }
    return counter;
}

// check left to right diagonal
function checkLtoR(i, j, player) {
    let counter = 0;
    let i_l = i;
    let j_l = j;
    // check going up and left
    while (i_l >= 0 && j_l >= 0 && matrix[i_l][j_l] == player) {
        counter++;
        i_l--;
        j_l--;
    }
    let i_r = i + 1;
    let j_r = j + 1;
    // check going down and right
    while (i_r < matrix.length && j < matrix[i].length && matrix[i_r][j_r] == player) {
        counter++;
        i_r++;
        j_r++;
    }
    return counter;
}

// check right to left diagonal
function checkRtoL(i, j, player) {
    let counter = 0;
    let i_l = i;
    let j_l = j;
    // check going down and left
    while (i_l < matrix.length && j_l >= 0 && matrix[i_l][j_l] == player) {
        counter++;
        i_l++;
        j_l--;
    }

    let i_r = i - 1;
    let j_r = j + 1;
    // check going up and right
    while(i_r >= 0 && j_r < matrix[i].length && matrix[i_r][j_r] == player) {
        counter = 0;
        i_r--;
        j_r++;
    }
}

// check if no more pieces can be placed on board
function isDraw() {
    for (let j = 0; j < matrix[0].length; j++) {
        if (canPlacePiece(j)) return false;
    }
    return true;
}

// function to recount threes after flipping board
function recountThrees(player) {
    sum = 0;
    tempsum = 0;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == player) {
                if (checkHorizontal(i, j, player) == 3) tempsum++;
                if (checkVertical(i, j, player) == 3) sum++;
                if (checkLtoR(i, j, player) == 3) tempsum++;
                if (checkRtoL(i, j, player) == 3) tempsum++;
            }
        }
    }
    // account for redundant counting
    tempsum /= 3;

    sum += tempsum;
    return sum;
}

function start() {
    boardsize = sessionStorage.getItem("boardsize");
    boardcolor = sessionStorage.getItem("boardcolor");
    let p1color = sessionStorage.getItem("p1color");
    let p2color = sessionStorage.getItem("p2color");
    hints = sessionStorage.getItem("hints");
    powers = sessionStorage.getItem("powers");

    // generate game board
    if (boardsize == "normal") {
        generateBoard(6,7);
    }
    else {
        generateBoard(8,9);
    }

    p1.setColor(p1color);
    p2.setColor(p2color);

    if (powers == '0') {
        document.getElementById("powerbtn").disabled = true;
    }
}