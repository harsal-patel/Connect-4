function generateBoard(n, m) {
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