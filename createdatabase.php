<?php
include 'db-login.php';
//$info = '000003 03030303 030303030 030303030 030303030';
//$info = $_POST['Result'];
//$name = $_POST['Name'];
//$antalkassa = $_POST['Antalkassa'];
//$id = $_POST['UserId'];
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$id = $request->UserId;
//$id = "ledzappa";
// Create connection
$conn = new mysqli($servername, $username, $password, $databasename);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
//$sql = "INSERT INTO playlist (id, mood, genre, keywords)
//VALUES ('$id', '$mood', '$genre', '$keywords')";
$sql = "CREATE TABLE IF NOT EXISTS pl_$id"."_playlists". "(
  id VARCHAR(45) NOT NULL,
  mood VARCHAR(45) DEFAULT NULL,
  genre VARCHAR(45) DEFAULT NULL,
  keywords VARCHAR(45) DEFAULT NULL,
  PRIMARY KEY (id)
)";
//echo $sql;
if (mysqli_query($conn, $sql)) {
    echo "Playlist-table created! ".$id;
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}
$sql = "CREATE TABLE IF NOT EXISTS pl_$id"."_moodlabels". "(
  mood VARCHAR(45) NOT NULL,
  PRIMARY KEY (mood)
)";
if (mysqli_query($conn, $sql)) {
    echo "Moodlabel-table created!";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}
//$sql = "INSERT INTO pl_$id"."_moodlabels"." (mood)
//SELECT 'energetic' FROM DUAL
//WHERE NOT EXISTS (SELECT * FROM pl_$id"."_moodlabels".")";
//insert some default moodlabels if the table is empty (first time user)
$sql = "INSERT INTO pl_$id"."_moodlabels"." (mood)
    (SELECT  'energetic' FROM DUAL WHERE NOT EXISTS (SELECT * FROM pl_$id"."_moodlabels".")
    ) union all
    (SELECT  'romantic' FROM DUAL WHERE NOT EXISTS (SELECT * FROM pl_$id"."_moodlabels".")
    ) union all
    (SELECT  'chill' FROM DUAL WHERE NOT EXISTS (SELECT * FROM pl_$id"."_moodlabels".")
    ) union all
    (SELECT  'sleepy' FROM DUAL WHERE NOT EXISTS (SELECT * FROM pl_$id"."_moodlabels".")
    ) union all
    (SELECT  'party' FROM DUAL WHERE NOT EXISTS (SELECT * FROM pl_$id"."_moodlabels".")
    ) union all
    (SELECT  'peaceful' FROM DUAL WHERE NOT EXISTS (SELECT * FROM pl_$id"."_moodlabels".")
    ) union all
    (SELECT  'spiritual' FROM DUAL WHERE NOT EXISTS (SELECT * FROM pl_$id"."_moodlabels".")
    ) union all
    (SELECT  'angry' FROM DUAL WHERE NOT EXISTS (SELECT * FROM pl_$id"."_moodlabels".")
    ) union all
    (SELECT 'happy' FROM DUAL WHERE NOT EXISTS (SELECT * FROM pl_$id"."_moodlabels".")
    )";
//echo $sql;
if (mysqli_query($conn, $sql)) {
    echo "Moodlabel-table default labels inserted!";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}
$sql = "CREATE TABLE IF NOT EXISTS pl_$id"."_genrelabels". "(
  genre VARCHAR(45) NOT NULL,
  PRIMARY KEY (genre)
)";
if (mysqli_query($conn, $sql)) {
    echo "Genrelable-table created!";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}
$sql = "INSERT INTO pl_$id"."_genrelabels"." (genre)
    (SELECT  'rock' FROM DUAL WHERE NOT EXISTS (SELECT * FROM pl_$id"."_genrelabels".")
    ) union all
    (SELECT  'pop' FROM DUAL WHERE NOT EXISTS (SELECT * FROM pl_$id"."_genrelabels".")
    ) union all
    (SELECT  'electro' FROM DUAL WHERE NOT EXISTS (SELECT * FROM pl_$id"."_genrelabels".")
    ) union all
    (SELECT  'acoustic' FROM DUAL WHERE NOT EXISTS (SELECT * FROM pl_$id"."_genrelabels".")
    ) union all
    (SELECT  'punk' FROM DUAL WHERE NOT EXISTS (SELECT * FROM pl_$id"."_genrelabels".")
    ) union all
    (SELECT  'house' FROM DUAL WHERE NOT EXISTS (SELECT * FROM pl_$id"."_genrelabels".")
    ) union all
    (SELECT  'metal' FROM DUAL WHERE NOT EXISTS (SELECT * FROM pl_$id"."_genrelabels".")
    ) union all
    (SELECT  'dubstep' FROM DUAL WHERE NOT EXISTS (SELECT * FROM pl_$id"."_genrelabels".")
    ) union all
    (SELECT 'other' FROM DUAL WHERE NOT EXISTS (SELECT * FROM pl_$id"."_genrelabels".")
    )";
if (mysqli_query($conn, $sql)) {
    echo "Genre-table default labels inserted!";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}
?>