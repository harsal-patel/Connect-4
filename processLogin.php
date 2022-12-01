<?php
session_start();

	include("connection.php");
	include("functions.php");


	if ($_SERVER['REQUEST_METHOD'] == "POST") {
		$username = $_POST['username'];
		$password = $_POST['password'];

		if (!empty($username) && !empty($password)) {

			$query = "SELECT * FROM users WHERE username = '$username' LIMIT 1";

			$result = mysqli_query($con, $query);

            if ($result) {
                if (mysqli_num_rows($result) > 0) {
                    $userdata = mysqli_fetch_assoc($result);

                    if ($userdata['password'] === $password) {
                        $_SESSION['username'] = $userdata['username'];
                        header("Location: game.html");
			            die;
                    }
					
                }
            }
            header("Location: error.html");
			die;
		}
		else {
			header("Location: error.html");
			die;
		}
	}
?>