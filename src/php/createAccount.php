<?php
/**
  * Создано A-WoW.
  * Пользователь: Солбон
  * Дата: 09-12-222
  * Время: 19:15
 */

include("../../includes/dbConnection.php");


$username = $_POST['username'] ;
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

//CREATE ACCOUNT FROM ADMIN
    $sql = "INSERT INTO accounts (username, pass, email, account_status) VALUES (?,?,?,?)";
//Prepare SQL statement for execution
    $stmt = $conn->prepare($sql);
//Binds the variables to a prepared statement as parameters ("sss" | s = string | d = double | i = integer | b = blob, send in packets

    $stmt->bind_param("sssi", $username, $hashedPassword, $email, $accountStatus);
    $stmt->execute();

    $stmt->close();
    $conn->close();

header('Location: ../index.html');
exit;
