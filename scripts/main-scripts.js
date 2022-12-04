function saveSettings() {
    let radios = document.querySelectorAll('input[name="boardsize"]');
    let boardsize;
    for (const radio of radios) {
        if (radio.checked) {
            boardsize = radio.value;
            break;
        }
    }
    let username = document.getElementById("username").value;
    let boardcolor = document.getElementById("boardcolor").value;
    let p1color = document.getElementById("player1").value;
    let p2color = document.getElementById("player2").value;
    let hints = document.getElementById("hints").value;
    let powers = document.getElementById("powers").value;
    
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("boardsize", boardsize);
    sessionStorage.setItem("boardcolor", boardcolor);
    sessionStorage.setItem("p1color", p1color);
    sessionStorage.setItem("p2color", p2color);
    sessionStorage.setItem("hints", hints);
    sessionStorage.setItem("powers", powers);
}