<?php
session_start();

include('connection.php');
include('functions.php');

$user_data = check_login($con);
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Main Menu</title>
    <link rel="stylesheet" href="styles/main-ss.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Raleway:wght@300;400;500&family=Roboto+Condensed&display=swap" rel="stylesheet">
</head>

<body>

    <div class="nav-bar">
        <a href="help.html">
            <svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" fill="currentColor" class="bi bi-question-circle help" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
            </svg>
        </a>
        <a href="leaderboard.html">
            <svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" fill="currentColor" class="bi bi-trophy leaderboard" viewBox="0 0 16 16">
                <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935zM3.504 1c.007.517.026 1.006.056 1.469.13 2.028.457 3.546.87 4.667C5.294 9.48 6.484 10 7 10a.5.5 0 0 1 .5.5v2.61a1 1 0 0 1-.757.97l-1.426.356a.5.5 0 0 0-.179.085L4.5 15h7l-.638-.479a.501.501 0 0 0-.18-.085l-1.425-.356a1 1 0 0 1-.757-.97V10.5A.5.5 0 0 1 9 10c.516 0 1.706-.52 2.57-2.864.413-1.12.74-2.64.87-4.667.03-.463.049-.952.056-1.469H3.504z" />
            </svg>
        </a>
        <a href="about.html">
            <svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" fill="currentColor" class="bi bi-person-square person" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z" />
            </svg>
        </a>
        <a href="https://github.com/harsal-patel/Connect-4" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" fill="currentColor" class="bi bi-github github" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
        </a>
    </div>
    <div class="outer-container">
        <div class="form-container">
            <form method="post" action="processLogin.php">
                <div class="row centerrow">
                    <h1><span class="title1">Connect</span><span class="title2">4</span></h1>
                </div>
                <div class="row">
                    <label for="username" class="label">Username:</label>
                    <input type="text" name="username" id="username">
                </div>
                <div class="row">
                    <label for="password" class="label">Password:</label>
                    <input type="password" name="password" id="password">
                </div>
                <div class="row centerrow">
                    <a href="createaccount.php">Create An Account</a>
                </div>
                <div class="row centerrow">
                    <fieldset class="boardsize">
                        <legend>Board Size</legend>
                        <input type="radio" name="boardsize" id="normal" class="radio" value="normal" checked>
                        <label for="normal">6 x 7</label>
                        <input type="radio" name="boardsize" id="large" class="radio" value="large">
                        <label for="large">8 x 9</label>
                    </fieldset>
                </div>
                <div class="row">
                    <label for="boardcolor">Board Color:</label>
                    <input type="color" name="boardcolor" id="boardcolor" value="#1D63F4">
                </div>
                <div class="row">
                    <label for="player1">Player 1:</label>
                    <input type="color" name="player1color" id="player1" value="#CF1B31">
                    <label for="player2">Player 2:</label>
                    <input type="color" name="player2color" id="player2" value="#FFCA32">
                </div>
                <div class="row">
                    <label for="hints" class="rangelabel">Enable hints?</label>
                    <input type="range" name="hints" id="hints" min="0" max="1" value="0">
                </div>
                <div class="row">
                    <label for="powers" class="rangelabel">Enable powers?</label>
                    <input type="range" name="powers" id="powers" min="0" max="1" value="0">
                </div>
                <div class="row centerrow">
                    <button class="startbutton" onclick="saveSettings()">Start Game</button>
                </div>
            </form>
        </div>
    </div>

    <script src="scripts/main-scripts.js"></script>
</body>

</html>