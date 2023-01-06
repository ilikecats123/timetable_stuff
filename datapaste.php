<?php 
$host = 'localhost';
$user = 'root';
$password = '';
$database = 'epiz_33190586_test';
$mysqli = new MySQLi($host, $user, $password, $database);

if ($mysqli->connect_error) {
    echo 'Connection Failed!
    Error #' . $mysqli->connect_errno . ': ' . $mysqli->connect_error;
    exit(0);
}

$mysqli->set_charset('utf8');

$allid = $_POST["id"];
$cellid = $allid[0];

$result = mysqli_query($mysqli, "SELECT 1 FROM test WHERE id = '$cellid'");
$num_rows = mysqli_num_rows($result);

$sql2 = "SELECT *
        FROM test
        WHERE id = 'copy'";

$result2 = $mysqli->query($sql2);

if (!$result2) {
echo 'Query Failed!
Error: ' . $mysqli->error;
exit(0);
}

$rows = $result2->fetch_all(MYSQLI_ASSOC);

$ename = $rows[0]["eventname"];
$details = $rows[0]["details"];
$colour = $rows[0]["colour"];

$returned[0] = $ename;
$returned[1] = $details;
$returned[2] = $colour;

$count = 0;

if (isset($cellid)) {
    if ($num_rows == 0) {
        foreach ($allid as $tempid) {

            $sql3 = "INSERT
            INTO test (id, eventname, details, colour)
            VALUES ('$tempid', '$ename', '$details', '$colour')";

            $result3 = $mysqli->query($sql3);

            if (!$result3) {
                echo 'Query Failed!
                Error: ' . $mysqli->error;
                exit(0);
            }
            $count += 1;
        }
    } else {
        $sql3 = "UPDATE test
            SET eventname = '$ename', details = '$details', colour = '$colour'
            WHERE id = '$cellid'";

        $result3 = $mysqli->query($sql3);

        if (!$result3) {
            echo 'Query Failed!
        Error: ' . $mysqli->error;
            exit(0);
        }
    }
}

$returned[3] = $count;
echo json_encode($returned);

$mysqli->close();
exit;
?>