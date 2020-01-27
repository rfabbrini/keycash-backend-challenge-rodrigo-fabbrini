CREATE DATABASE dbKeycash;
USE dbKeycash;

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'root';
flush privileges;

CREATE TABLE Imovels (id INT PRIMARY KEY AUTO_INCREMENT, endereco VARCHAR(100), preco DECIMAL(12,2), metrosQuadrados SMALLINT, numQuartos SMALLINT, numBanheiros SMALLINT, numSuites SMALLINT, numVagas SMALLINT, createdAt DATE, updatedAt DATE);
