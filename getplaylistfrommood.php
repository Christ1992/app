<?php
$username = "root";
$password = "root";
$servername = "localhost";
$databasename = 'playlist';
//$info = '000003 03030303 030303030 030303030 030303030';
//$info = $_POST['Result'];
//$name = $_POST['Name'];
//$antalkassa = $_POST['Antalkassa'];

$mood = $_POST['Mood'];

// Create connection
$conn = new mysqli($servername, $username, $password, $databasename);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

//$sql = 'SELECT mood,genre,keywords WHERE id="$id"';
$sql = "SELECT id FROM playlist WHERE mood='$mood'";
$result = $conn->query($sql);
$array = array();
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        //header('Content-Type: application/json');
        //echo json_encode($row);
        $array[] = $row;
        //echo "id: " . $row["id"]. " - mood: " . $row["mood"]. " " . $row["genre"]. "<br>";
    }
     echo json_encode($array);

} else {
    echo "0 results";
}

?>