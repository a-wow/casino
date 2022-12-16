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

// Using prepared statements means that SQL injection is not possible.
$sql = "SELECT id, pass FROM accounts WHERE username = ? AND is_deleted = 0";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->bind_result($id, $hashedPassword);

while ($stmt->fetch()) {
    if (password_verify($password, $hashedPassword)) {
        header('Location: ../wowcasino.html');
        exit;
    }
}

include("secure_bruteForce.php");
header('Location: ../index.html');
exit;
