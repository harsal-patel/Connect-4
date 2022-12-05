<?php
session_start();

include('connection.php');
include('functions.php');

$output = '';
$order = $_POST["order"];
$order = ($order == 'desc') ? 'asc' : 'desc';

$query = "SELECT * FROM users ORDER BY ".$_POST["columnName"]." ".$_POST["order"]."";

$result = mysqli_query($con, $query);

$output .= '
<table class="leaderboard-table">
            <tr>
                <th class="username"><a href="#" id="username" data-order="'.$order.'" class="col-sort">Username</a></th>
                <th class="table-data"><a href="#" id="playtime" data-order="'.$order.'" class="col-sort">Playtime</a></th>
                <th class="table-data"><a href="#" id="wins" data-order="'.$order.'" class="col-sort">Wins</a></th>
                <th class="table-data"><a href="#" id="losses" data-order="'.$order.'" class="col-sort">Losses</a></th>
                <th class="table-data"><a href="#" id="totalgames" data-order="'.$order.'" class="col-sort">Games Played</a></th>
            </tr>
';
while ($row = mysqli_fetch_array($result)) {
    $output .= '
    <tr>
        <td>' . $row["username"] . '</td>
        <td>' . $row["playtime"] . '</td>
        <td>' . $row["wins"] . '</td>
        <td>' . $row["losses"] . '</td>
        <td>' . $row["totalgames"] . '</td>
    </tr>
    ';
}
echo $output;
?>