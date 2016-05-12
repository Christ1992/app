<?php
include 'db-login.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$id = $request->Id;
$mood = $request->Mood;
$genre = $request->Genre;
$keywords = $request->Keywords;
$userId = $request->UserId;

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
} else if($keywords && $genre &&! $mood){
$sql = "INSERT INTO pl_".$userId."_playlists (id, keywords, genre) VALUES('$id', '$keywords', '$genre') ON DUPLICATE KEY UPDATE keywords='$keywords', genre='$genre'";
} else if($keywords &&! $genre && $mood){
$sql = "INSERT INTO pl_".$userId."_playlists (id, keywords, mood) VALUES('$id', '$keywords', '$mood') ON DUPLICATE KEY UPDATE keywords='$keywords', mood='$mood'";
} else if($genre &&! $keywords && $mood){
$sql = "INSERT INTO pl_".$userId."_playlists (id, genre, mood) VALUES('$id', '$genre', '$mood') ON DUPLICATE KEY UPDATE genre='$genre', mood='$mood'";
}

echo $sql;

if (mysqli_query($conn, $sql)) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}
?>