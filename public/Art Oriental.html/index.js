// Importa o módulo mysql2 (instale com: npm install mysql2)
const mysql = require('mysql2');

// Configuração da conexão
const connection = mysql.createConnection({
    host: 'localhost:3000',     // Endereço do servidor MySQL
    user: 'root',          // Usuário do banco
    password: '1234',  // Senha do banco
    database: 'cadastro'  // Nome do banco de dados
});

// Conecta ao banco
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
        return;
    }
    console.log('Conexão bem-sucedida ao MySQL!');
});

// Exemplo de consulta
connection.query(sql, (err, results) => {
    if (err) {
        console.error('Erro na consulta:', err.message);
        return;
    }

    console.log('Resultados:', results);

    // Só fecha aqui depois da consulta
    connection.end((err) => {
        if (err) {
            console.error('Erro ao encerrar a conexão:', err.message);
            return;
        }
        console.log('Conexão encerrada.');
    });
});