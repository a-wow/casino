<?php
/**
  * Создано A-WoW.
  * Пользователь: Солбон
  * Дата: 09-12-222
  * Время: 19:15
 */

include("../../includes/dbConnection.php");

$id = intval($_POST['id']);
$username = $_POST['username'];
$password = $_POST['pass'];
$email = $_POST['email'];
$accountStatus = intval($_POST['account_status']);
/*Hashed Password with CRYPT_BLOWFISH(Stongest algorithm supported by PHP)
 * and default adds a random salt to the Password
 * and cost =  length of hash = Longer length generate time, increase by 1 doubles the generate time
 * but it also increase the time for the time it takes to break the password
 * Default cost = 10
 */
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

$sql = "UPDATE accounts SET username = ?, pass = ?, email = ?, account_status = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssii", $username, $hashedPassword, $email, $accountStatus, $id);
$stmt->execute();

$stmt->close();
$conn->close();
