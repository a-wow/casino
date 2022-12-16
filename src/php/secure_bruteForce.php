<?php
/**
  * Создано A-WoW.
  * Пользователь: Солбон
  * Дата: 09-12-222
  * Время: 19:15
 */

include("../../includes/dbConnection.php");

//get users ip
$userIP = $_SERVER['REMOTE_ADDR'];
$count = 1;
//Get row data from current IP
$sql=" SELECT attempts, lockout FROM login_attempts WHERE ip = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $userIP);
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($attempts, $lockout);
while($stmt->fetch()) {
}

if($attempts >= 14) {
    $sql = "DELETE FROM login_attempts WHERE ip = ? AND lockout < (NOW() - INTERVAL 10 MINUTE)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $userIP);
    $stmt->execute();
}

if($attempts == 0) {
    $sql = "INSERT INTO login_attempts(ip, attempts) VALUES (?,?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $userIP, $count);
    $stmt->execute();
    $stmt->close();
    $conn->close();
    //echo $userIP; // ::1 = IPv6 localhost IP adresse, når de anvendes XAAMP
    echo "<script type='text/javascript'>alert('First Login Count Failed');</script>";
    header('Location: ../adminLogin.html');
}

if($attempts >= 14){
    $sql ="UPDATE login_attempts SET attempts = attempts + 1, lockout = DATE_ADD(NOW(), INTERVAL 0 SECOND) WHERE ip = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $userIP);
    $stmt->execute();
    $stmt->close();
    $conn->close();
    echo "<script type='text/javascript'>alert('To many invalid logins try again in 10 minutes');</script>";
}

else {
    $sql="UPDATE login_attempts SET attempts = attempts+1 WHERE ip = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $userIP);
    $stmt->execute();
    $stmt->close();
    $conn->close();
    echo "<script type='text/javascript'>alert('Invalid username or password');</script>";
}
?>
