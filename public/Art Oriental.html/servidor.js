const express = require('express');
const mysql = require('mysql2');
const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'cadastro'
});

app.get('/cadastro', (req, res) => {
    connection.query('SELECT * FROM cadastro', (err, results) => {
        if (err) {
            return res.status(500).send('Erro no banco: ' + err.message);
        }
        res.json(results);
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});