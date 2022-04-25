DROP DATABASE IF EXISTS test;
CREATE DATABASE test;

USE test;

CREATE TABLE users (
	id   INTEGER PRIMARY KEY AUTO_INCREMENT,
	email	VARCHAR(255) NOT NULL,
	password	VARCHAR(255)
) CHARACTER SET utf8;

SHOW TABLES;

INSERT INTO users (email, password) VALUES("William@gmail.com","Shakespeare");
INSERT INTO users (email, password) VALUES("Edgar@mail.com", "Allan");
INSERT INTO users (email, password) VALUES("Fyodor@deez.com","Dostoyevsky");
INSERT INTO users (email, password) VALUES("Gabriel@to.com","Garcia Marquez");
