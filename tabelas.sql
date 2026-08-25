CREATE DATABASE alunos_biblioteca21c;
USE alunos_biblioteca21c;

DROP TABLE livros;

CREATE TABLE livros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(50) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    isbn VARCHAR(13) NOT NULL,
    data_abastecimento DATE
);

USE api_crud;

SELECT * FROM livros;