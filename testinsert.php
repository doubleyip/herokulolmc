<?php
//Script to connect to database
$server="us-cdbr-iron-east-05.cleardb.net";
$username="be13624714f04b";
$password="3b5e47af";
$db="heroku_fc399388bb27294";


$conn = mysqli_connect($server, $username, $password, $db);

// Check connection
if (!$conn) {
    error_log("Connection failed: " . mysqli_connect_error());
}
error_log ("Connected successfully");

if(isset($_POST['userID'],$_POST['pass'],$_POST['email']))
$user=$_POST['userID'];
$pass=$_POST['pass'];
$email=$_POST['email'];


$sql="INSERT INTO lolmclogin (username, password, email)
VALUES ('$user','$pass','$email')";

if (mysqli_query($conn, $sql)) {
    error_log("New record created successfully");
} else {
    error_log("Error: " . $sql . "<br>" . mysqli_error($conn));
}




?>