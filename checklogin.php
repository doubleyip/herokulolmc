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

if(isset($_GET['userID']))
$userID=$_GET['userID'];
$password = mysqli_query($conn,"SELECT password FROM lolmclogin WHERE username = '$userID'");
$mypass=mysqli_fetch_assoc($password);
$rpass=$mypass['password'];


echo $rpass;
//


?>