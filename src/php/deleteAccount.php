<?php
/**
  * Создано A-WoW.
  * Пользователь: Солбон
  * Дата: 09-12-222
  * Время: 19:15
 */

include("../../includes/dbConnection.php");

$id = $_POST['id'];

$sql = "UPDATE accounts SET is_deleted=1 WHERE id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);

if ($stmt->execute() === FALSE) {
    echo "Error: " . $conn->error;
}

$stmt->close();
$conn->close();
