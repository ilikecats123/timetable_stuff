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

$sql = 'SELECT *
    FROM test';
$result = $mysqli->query($sql);

if (!$result) {
echo 'Query Failed!
Error: ' . $mysqli->error;
exit(0);
}

$rows = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode($rows);

$mysqli->close();
exit;
?>