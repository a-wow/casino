<?php
/**
  * Создано A-WoW.
  * Пользователь: Солбон
  * Дата: 09-12-222
  * Время: 19:15
 */

include("../../includes/dbConnection.php");

$username = $_POST['username'];
$password = $_POST['pass'];
//get users ip
$userIP = $_SERVER['REMOTE_ADDR'];

//Get row data from current IP
$sql=" SELECT attempts, lockout FROM login_attempts WHERE ip = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $userIP);
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($attempts, $lockout);
while($stmt->fetch()) {
}

if ($attempts < 14) {
// Using prepared statements means that SQL injection is not possible.
    $sql = "SELECT id, pass FROM accounts WHERE username = ? AND account_status = 1 AND is_deleted = 0";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->bind_result($id, $hashedPassword);
        while ($stmt->fetch()) {
                //Verify if the given hash matches the password
                if (password_verify($password, $hashedPassword)) {
                    echo "Succesfully logged in as " . $username;
                    header('Location: ../admin.html');
                    exit;
                }
        }
}

include("secure_bruteForce.php");
header('Location: ../adminLogin.html');
exit;
