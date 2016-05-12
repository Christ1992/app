<?php
include 'db-login.php';
//$info = '000003 03030303 030303030 030303030 030303030';
//$info = $_POST['Result'];
//$name = $_POST['Name'];
//$antalkassa = $_POST['Antalkassa'];

//$mood = $_POST['Mood'];
//$genre = $_POST['LabelType'];
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$userId = $_POST['UserId'];
$newLabel = $_POST['NewLabel'];
$labelType = $_POST['LabelType'];

//$userId = 'ledzappa';
//$newLabel = 'test';
//$labelType = 'genre';



// Create connection
$conn = new mysqli($servername, $username, $password, $databasename);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

//$sql = "INSERT INTO playlist (id, mood, genre, keywords)
//VALUES ('$id', '$mood', '$genre', '$keywords')";

if($labelType == 'genre'){

$sql = "INSERT INTO pl_".$userId."_genrelabels (genre) VALUES('$newLabel')";

//echo $sql;

	if (mysqli_query($conn, $sql)) {
	    echo "New record created successfully";
	} else {
	    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
	}

} else if($labelType == 'mood'){

$sql = "INSERT INTO pl_".$userId."_moodlabels (mood) VALUES('$newLabel')";

//echo $sql;

	if (mysqli_query($conn, $sql)) {
	    echo "New record created successfully";
	} else {
	    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
	}
}
?>