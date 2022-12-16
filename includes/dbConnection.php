    <?php
/**
  * Создано A-WoW.
  * Пользователь: Солбон
  * Дата: 12.09.2017
  * Время: 19:15
 */

include_once 'global_config.php';

    $conn = mysqli_connect(HOST,USER,PASSWORD,DATABASE);

    if($conn -> connect_error) {
        die("Connection failed: " . $conn -> connect_error . " |  \n");
    }

?>
