let matrix; // matrix representing game board

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
}

// update board to reflect changes to matrix
function reprintBoard() {
    let slots = document.querySelectorAll(".slot");
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 1) {
                slots[(i*matrix[i].length)+j].classList.add("yellow");
                slots[(i*matrix[i].length)+j].classList.remove("red");
            }
            if (matrix[i][j] == 2) {
                slots[(i*matrix[i].length)+j].classList.add("red");
                slots[(i*matrix[i].length)+j].classList.remove("yellow");
            }
        }
    }
}

// check if piece can be placed in column
function canPlacePiece(col) {
    return (matrix[0][col] == 0);
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

function testBoard() {
    generateBoard(6,7);
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            matrix[i][j] = Math.floor(Math.random() * 3);
        }
    }
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
}