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

if(isset($_POST['userID'],$_POST['matchID']))
$user=$_POST['userID'];
$match=$_POST['matchID'];




$checkmatch1 = mysqli_query($conn,"SELECT match1 FROM lolmclogin WHERE username = '$user'");
$mymatch1=mysqli_fetch_assoc($checkmatch1);
$m1value=$mymatch1['match1'];
	if(is_null($m1value)){
		$sql="UPDATE lolmclogin SET match1='$match' WHERE username='$user'";
		$control=mysqli_query($conn,$sql);
		echo 1;
		exit();
		}
	else 
		$checkmatch2 = mysqli_query($conn,"SELECT match2 FROM lolmclogin WHERE username = '$user'");
		$mymatch2=mysqli_fetch_assoc($checkmatch2);
		$m2value=$mymatch2['match2'];
			if(is_null($m2value)){
				$sql="UPDATE lolmclogin SET match2='$match' WHERE username='$user'";
				$control=mysqli_query($conn,$sql);
						echo 1;
						exit();
				}
			else 
				$checkmatch3 = mysqli_query($conn,"SELECT match3 FROM lolmclogin WHERE username = '$user'");
				$mymatch3=mysqli_fetch_assoc($checkmatch3);
				$m3value=$mymatch3['match3'];
					if(is_null($m3value)){
						$sql="UPDATE lolmclogin SET match3='$match' WHERE username='$user'";
						$control=mysqli_query($conn,$sql);
								echo 1;
								exit();
						}
					else 
						$checkmatch4 = mysqli_query($conn,"SELECT match4 FROM lolmclogin WHERE username = '$user'");
						$mymatch4=mysqli_fetch_assoc($checkmatch4);
						$m4value=$mymatch4['match4'];
							if(is_null($m4value)){
								$sql="UPDATE lolmclogin SET match4='$match' WHERE username='$user'";
								$control=mysqli_query($conn,$sql);
										echo 1;
										exit();
								}
							else 	
								$checkmatch5 = mysqli_query($conn,"SELECT match5 FROM lolmclogin WHERE username = '$user'");
								$mymatch5=mysqli_fetch_assoc($checkmatch5);
								$m5value=$mymatch5['match5'];
									if(is_null($m5value)){
										$sql="UPDATE lolmclogin SET match5='$match' WHERE username='$user'";
										$control=mysqli_query($conn,$sql);
												echo 1;
												exit();
										}
									else
										echo 0;
										
							



?>