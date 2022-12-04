<?php 
session_start();

include("connection.php");
include("functions.php");

    // receive array
    if (isset($_POST['Array'])) {
        $arr = $_POST['Array'];
        $arr = json_decode($arr);
    }

    $username = $arr[0];
    $time = $arr[1];
    $win = ($arr[2] == 1) ? 1 : 0;
    $loss = ($win == -1) ? 1 : 0;
    $totalgames = 1;

    $query = "SELECT * FROM users WHERE username = '$username' LIMIT 1";

	$result = mysqli_query($con, $query);

    if ($result) {
        if (mysqli_num_rows($result) > 0) {
            $userdata = mysqli_fetch_assoc($result);
            $time += $userdata['playtime'];
            $win += $userdata['wins'];
            $loss += $userdata['losses'];
            $totalgames += $userdata['totalgames'];
        }
    }

    $query = "UPDATE users SET playtime='$time' WHERE username='$username'";
    mysqli_query($con, $query);

    $query = "UPDATE users SET wins='$win' WHERE username='$username'";
    mysqli_query($con, $query);

    $query = "UPDATE users SET losses='$loss' WHERE username='$username'";
    mysqli_query($con, $query);

    $query = "UPDATE users SET totalgames='$totalgames' WHERE username='$username'";
    mysqli_query($con, $query);
?>