DROP TABLE IF EXISTS accounts;
DROP TABLE IF EXISTS login_attempts;

CREATE TABLE accounts (
id INT(11) UNIQUE NOT NULL AUTO_INCREMENT,
username VARCHAR(255) NOT NULL UNIQUE,
pass VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL,
balance INT(255) DEFAULT 0,
location VARCHAR(255),
lt_online VARCHAR(255),
account_status BIT(1) default 0,
is_deleted BIT(1) DEFAULT 0,
PRIMARY KEY (id)
);

/* to prevent Brute Force */
CREATE TABLE login_attempts (
 ip VARCHAR( 20 ) NOT NULL UNIQUE,
 attempts INT NOT NULL ,
 lockout DATETIME,
 PRIMARY KEY (ip)
);
