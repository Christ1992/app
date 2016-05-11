<?php
include 'db-login.php';
//$info = '000003 03030303 030303030 030303030 030303030';
//$info = $_POST['Result'];
//$name = $_POST['Name'];
//$antalkassa = $_POST['Antalkassa'];

$userid = $_POST['UserId'];
//$userid = "ledzappa";
$label = $_POST['LabelType'];
//$label = "genre";

//echo "SELECT id FROM pl_".$userid."_playlists";

// Create connection
$conn = new mysqli($servername, $username, $password, $databasename);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

if($label == "mood"){
$sql = "SELECT * FROM pl_".$userid."_moodlabels";
//echo $sql;

$result = $conn->query($sql);

	if ($result->num_rows > 0) {
		$array = array();
	    while($row = $result->fetch_assoc()) {
	    	$array[] = $row;
	    }
	    echo json_encode($array);
	} else {
	    echo "0 results";
	}
} else if ($label == "genre"){
$sql = "SELECT * FROM pl_".$userid."_genrelabels";
//echo $sql;

$result = $conn->query($sql);

	if ($result->num_rows > 0) {
		$array = array();
	    while($row = $result->fetch_assoc()) {
	    	$array[] = $row;
	    }
	    echo json_encode($array);
	} else {
	    echo "0 results";
	}


}
/*
if ($id){
	//RETURNS THE ROW FOR A SPECIFIC ID
	$sql = "SELECT * FROM playlist WHERE id='$id'";
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
*/

?>