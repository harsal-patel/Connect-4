<?php
$dbhost = "localhost";
$dbuser = "root";
$dbpass = "";

// Create connection
$con = new mysqli($dbhost, $dbuser, $dbpass);
// Check connection
if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
}

// Create database
$sql = "CREATE DATABASE connect4";
if ($con->query($sql) === TRUE) {
    echo "Database created successfully<br>";
} else {
    echo "Error creating database: " . $con->error . "<br>";
}

$con->close();

$dbname = 'connect4';

if (!$con = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname)) {
    die('Connection to database failed<br>');
}

$sql = "CREATE TABLE users (
    id BIGINT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    playtime INT(11) DEFAULT 0 NOT NULL,
    wins INT(11) DEFAULT 0 NOT NULL,
    losses INT(11) DEFAULT 0 NOT NULL,
    totalgames INT(11) DEFAULT 0 NOT NULL
    )";

if ($con->query($sql) === TRUE) {
    echo "Table users created successfully<br>";
} else {
    echo "Error creating table: " . $con->error . "<br>";
}

$con->close();

?>