<?php

$dbhost = "localhost";
$dbuser = "root";
$dbpass = "";
$dbname = "connect4";

if (!$con = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname)) {
    die('Connection to database failed');
}

?>