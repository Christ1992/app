<?php
include 'db-login.php';
//$info = '000003 03030303 030303030 030303030 030303030';
//$info = $_POST['Result'];
//$name = $_POST['Name'];
//$antalkassa = $_POST['Antalkassa'];

$id = $_POST['Id'];
$mood = $_POST['Mood'];
$genre = $_POST['Genre'];
$keywords = $_POST['Keywords'];
$userId = $_POST['UserId'];


// Create connection
$conn = new mysqli($servername, $username, $password, $databasename);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

//$sql = "INSERT INTO playlist (id, mood, genre, keywords)
//VALUES ('$id', '$mood', '$genre', '$keywords')";
if($mood && $genre && $keywords){
$sql = "INSERT INTO pl_".$userId."_playlists (id, mood, genre, keywords) VALUES('$id', '$mood', '$genre', '$keywords') ON DUPLICATE KEY UPDATE    
mood='$mood', genre='$genre', keywords='$keywords'";
} else if($mood &&! $genre &&! $keywords){
$sql = "INSERT INTO pl_".$userId."_playlists (id, mood) VALUES('$id', '$mood') ON DUPLICATE KEY UPDATE    
mood='$mood'";
} else if($genre &&! $mood &&! $keywords){
$sql = "INSERT INTO pl_".$userId."_playlists (id, genre) VALUES('$id', '$genre') ON DUPLICATE KEY UPDATE    
genre='$genre'";
} else if($keywords &&! $genre &&! $mood){
$sql = "INSERT INTO pl_".$userId."_playlists (id, keywords) VALUES('$id', '$keywords') ON DUPLICATE KEY UPDATE    
keywords='$keywords'";
}


echo $sql;

if (mysqli_query($conn, $sql)) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}
?>