CREATE DATABASE IF NOT EXISTS spotify;

USE spotify;

CREATE TABLE users (
    id INT(30) NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) DEFAULT NULL,
    age INT(100) DEFAULT NULL,
    email VARCHAR(255) DEFAULT NULL,
    password VARCHAR(255) DEFAULT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    PRIMARY KEY (id)
);

CREATE TABLE usuarios (
    id INT(30) NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) DEFAULT NULL,
    cedula INT(100) DEFAULT NULL,
    email VARCHAR(255) DEFAULT NULL,
    password VARCHAR(255) DEFAULT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    PRIMARY KEY (id)
);

CREATE TABLE storage (
    id INT(30) NOT NULL AUTO_INCREMENT,
    url VARCHAR(255) DEFAULT NULL,
    filename INT(30) DEFAULT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    PRIMARY KEY (id)
);

CREATE TABLE tracks (
    id INT(30) NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) DEFAULT NULL,
    album VARCHAR(255) DEFAULT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    PRIMARY KEY (id)
);