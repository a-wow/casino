DELIMITER //

DROP PROCEDURE IF EXISTS account_creation//
CREATE PROCEDURE account_creation
(IN create_username VARCHAR(255), create_pass VARCHAR(16), create_email VARCHAR(255))
BEGIN
	INSERT INTO accounts(username, pass, email) VALUES (create_username, create_pass, create_email);
END//

DROP PROCEDURE IF EXISTS admin_account_creation//
CREATE PROCEDURE admin_account_creation
(IN create_username VARCHAR(255), create_pass VARCHAR(16), create_email VARCHAR(255), create_account_status INT(2))
BEGIN
	INSERT INTO accounts(username, pass, email, account_status) VALUES (create_username, create_pass, create_email, create_account_status);
END//

DROP PROCEDURE IF EXISTS admin_account_read//
CREATE PROCEDURE admin_account_read
(IN read_username VARCHAR(255), read_pass VARCHAR(16), read_email VARCHAR(255), read_account_status INT(2))
BEGIN
	SELECT * FROM accounts;
END//

DROP PROCEDURE IF EXISTS admin_account_read//
CREATE PROCEDURE admin_account_read
(IN update_id INT(11), update_username VARCHAR(255), update_pass VARCHAR(16), update_email VARCHAR(255), update_account_status INT(2), update_is_deleted BOOLEAN)
BEGIN
	UPDATE accounts SET username = update_username, pass = update_pass, email = update_email, account_status = update_account_status, is_deleted = update_is_deleted WHERE accounts.id = update_id;
END//

DROP PROCEDURE IF EXISTS admin_account_read//
CREATE PROCEDURE admin_account_read
(IN delete_id INT(11))
BEGIN
	DELETE FROM accounts WHERE accounts.id = delete_id;
END//

DELIMITER ;
