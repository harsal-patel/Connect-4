<?php
session_start();

include("server/connection.php");
include("server/functions.php");


if ($_SERVER['REQUEST_METHOD'] == "POST") {
	$username = $_POST['username'];
	$password = $_POST['password'];
	$confirm = $_POST['confirm'];

	if (!empty($username) && !empty($password) && !empty($confirm)) {
		if ($password == $confirm) {
			$query = "SELECT * FROM users WHERE username = '$username' LIMIT 1";

			$result = mysqli_query($con, $query);

			if ($result) {
				if (mysqli_num_rows($result) > 0) {
					echo '<script>alert("Username already exists!")</script>';
				} else {
					$query = "INSERT INTO users (username,password) VALUES ('$username','$password')";

					mysqli_query($con, $query);

					echo '<script>alert("Account creation successful!");window.location.href="index.html";</script>';
				}
			}
		}
		else {
			echo '<script>alert("Passwords did not match!")</script>';
		}
	}
	else {
		echo '<script>alert("Please enter a username and a password")</script>';
	}
}
?>

<!DOCTYPE html>
<html>

<head>
	<title>Signup</title>
	<link rel="stylesheet" href="styles/create-ss.css">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Raleway:wght@300;400;500&family=Roboto+Condensed&display=swap" rel="stylesheet">
</head>

<body>
	<div class="outer-container">
		<div class="form-container">
			<form method="post">
				<div class="row centerrow">
					<h1 class="no-mt no-mb"><span class="title1">Connect</span><span class="title2">4</span></h1>
				</div>
				<div class="row centerrow no-mt">
					<h2 class="no-mb">Signup</h2>
				</div>
				<div class="row">
					<label for="username" class="label">Username:</label>
					<input id="username" type="text" name="username">
				</div>
				<div class="row">
					<label for="password" class="label">Password:</label>
					<input id="password" type="password" name="password">
				</div>
				<div class="row">
					<label for="confirm" class="label">Confirm:</label>
					<input id="confirm" type="password" name="confirm">
				</div>
				<div class="row centerrow">
					<a href="index.html">Return to Login</a>
				</div>
				<div class="row centerrow">
					<input id="button" type="submit" value="Signup" class="startbutton">
				</div>
			</form>
		</div>
	</div>
</body>

</html>