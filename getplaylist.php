<?php
include 'db-login.php';
//$id = $_POST['Id'];
//$userid = $_POST['UserId'];
//$userid = "ledzappa";
//echo "SELECT id FROM pl_".$userid."_playlists";
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$id = $request->Id;
$userid = $request->UserId;
// Create connection
$conn = new mysqli($servername, $username, $password, $databasename);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
if ($id){
	//RETURNS THE ROW FOR A SPECIFIC ID
	$sql = "SELECT * FROM pl_".$userid."_playlists WHERE id='$id'";
	$result = $conn->query($sql);
	if ($result->num_rows > 0) {
	    while($row = $result->fetch_assoc()) {
	    	echo json_encode($row);}
	} else {
	    echo "0 results";}
} else {
	//RETURNS ALL THE ID's IN THE DB
	$sql = "SELECT id FROM pl_".$userid."_playlists";
	$result = $conn->query($sql);
	$array = array();
	$error = array("error");
	if ($result->num_rows > 0) {
	    while($row = $result->fetch_assoc()) {
	    	$array[] = $row;}
	echo json_encode($array);
	} else {
	    echo json_encode($error);
	}
}
?>