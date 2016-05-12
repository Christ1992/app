<?php
include 'db-login.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$userId = $request->UserId;
$removeLabel = $request->RemoveLabel;
$labelType = $request->LabelType;

//$userId = 'ledzappa';
//$removeLabel = 'test';
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

//$sql = "INSERT INTO pl_".$userId."_genrelabels (genre) VALUES('$newLabel')";
$sql = "DELETE FROM pl_".$userId."_genrelabels WHERE genre = '$removeLabel'";

//echo $sql;

	if (mysqli_query($conn, $sql)) {
	    echo "New record created successfully";
	} else {
	    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
	}

} else if($labelType == 'mood'){

$sql = "DELETE FROM pl_".$userId."_moodlabels WHERE mood = '$removeLabel'";

//echo $sql;

	if (mysqli_query($conn, $sql)) {
	    echo "New record created successfully";
	} else {
	    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
	}
}
?>