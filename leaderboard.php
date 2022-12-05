<?php
session_start();

include('server/connection.php');
include('server/functions.php');
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Leaderboard</title>
    <link rel="stylesheet" href="styles/leaderboard-ss.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Raleway:wght@300;400;500&family=Roboto+Condensed&display=swap" rel="stylesheet">
</head>

<body>
    <div class="outer-container">
        <div class="inner-container">
            <div class="container">
                <h1>Leaderboard</h1>
            </div>
            <div class="container">
                <a href="index.html" class="goback">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="currentColor" class="bi bi-caret-left-fill" viewBox="0 0 16 16">
                        <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                    </svg>
                    Main Menu
                </a>
            </div>
            <div id="user_table" class="table-div">
                <table class="leaderboard-table">
                    <tr>
                        <th class="username"><a href="#" id="username" data-order="desc" class="col-sort">Username</a></th>
                        <th class="table-data"><a href="#" id="playtime" data-order="desc" class="col-sort">Playtime</a></th>
                        <th class="table-data"><a href="#" id="wins" data-order="desc" class="col-sort">Wins</a></th>
                        <th class="table-data"><a href="#" id="losses" data-order="desc" class="col-sort">Losses</a></th>
                        <th class="table-data"><a href="#" id="totalgames" data-order="desc" class="col-sort">Games Played</a></th>
                    </tr>
                    <?php

                    $query = "SELECT * FROM users";
                    $result = mysqli_query($con, $query);

                    if ($result) {
                        if (mysqli_num_rows($result) > 0) {
                            while ($userdata = mysqli_fetch_assoc($result)) {
                                echo "<tr><td>" . $userdata['username'] . "</td><td>" . $userdata['playtime'] . "</td><td>" . $userdata['wins'] . "</td><td>" . $userdata['losses'] . "</td><td>" . $userdata['totalgames'] . "</td></tr>";
                            }
                        }
                    }
                    ?>
                </table>
            </div>
        </div>
    </div>
    <script>
        $(document).ready(function() {
            $(document).on('click', '.col-sort', function() {
                var columnName = $(this).attr("id");
                var order = $(this).data("order");
                $.ajax({
                    url: "server/sort.php",
                    method: "POST",
                    data: {
                        columnName: columnName,
                        order: order
                    },
                    success: function(data) {
                        $('#user_table').html(data);
                        $('#' + columnName);
                    }
                })
            });
        });
    </script>
</body>

</html>