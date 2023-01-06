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

$ename = $_POST["name"];
$details = $_POST["details"];
$colour = $_POST["colour"];
$allid = $_POST["id"];
$cellid = $allid[0];
$count = 0;

$result = mysqli_query($mysqli, "SELECT 1 FROM test WHERE id = '$cellid'");
$num_rows = mysqli_num_rows($result);

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

echo json_encode($count);

$mysqli->close();
exit;
?>