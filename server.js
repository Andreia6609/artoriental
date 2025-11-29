const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const config = require('./config.development');

const app = express();
app.use(cors());
app.use(express.json());

// IMPORTANTE: serve os arquivos da pasta public
app.use(express.static('public'));

// Conexão com o MySQL

const developmentDB = config.development;

const connection = mysql.createConnection({

    host:     developmentDB.host,

    user:     developmentDB.user,

    password: developmentDB.password,

    database: developmentDB.database,

    port:     developmentDB.port                                                                                                                        

});
 

connection.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco:', err.message);
    
    } else{
        console.log('Conectado ao banco de dados MySQL!');
    }
   
});

// Rota para listar usuários
app.get('/cadastro', (req, res) => {
    connection.query('SELECT * FROM cadastro', (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
});

// (Opcional) rota para /
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
// Rota para adicionar usuário
app.post('/cadastro', (req, res) => {

    const nome = req.body.nome
    const email = req.body.email;
    const senha = req.body.senha;

    const sql = `INSERT INTO tbcadastrope (nome, email, senha) VALUES ('${nome}',  '${email}', '${senha}');`;
    
    connection.query(sql, [nome, email], (err, result) => {
        
        if (err) {
            console.log(err)
            return res.status(500).json({ error: err.message });
        }

        res.json({ message: 'Usuário cadastrado com sucesso!', id: result.insertId });
    });

});

// Iniciar servidor
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000/');
});
