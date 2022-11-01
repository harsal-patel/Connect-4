let matrix; // matrix representing game board

function generateBoard(n, m) {
    matrix = new Array(n);
    for (let i = 0; i < n; i++) {
        matrix[i] = new Array(m);
        matrix[i].fill(0);
    }

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
    for (let j = 0; j < matrix[0].length; j++) {
        for (let i = 0; i < matrix.length / 2; i++) {
            let temp = matrix[i][j];
            matrix[i][j] = matrix[matrix.length - 1 - i][j];
            matrix[matrix.length - 1 - i][j] = temp;
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
}

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