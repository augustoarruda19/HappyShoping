// server.js CORRIGIDO

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

// Middlewares - DEVE VIR PRIMEIRO
app.use(cors());
app.use(bodyParser.json());

// Conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'happyshopping'
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('✅ Conectado ao MySQL!');
});

// Rota de teste
app.get('/', (req, res) => {
  res.send('Servidor rodando 🚀');
});

// Rota para cadastro de usuário
app.post('/usuarios', (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).send('Todos os campos são obrigatórios');
  }

  const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
  db.query(sql, [nome, email, senha], (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar usuário:', err);
      res.status(500).send('Erro ao cadastrar usuário');
    } else {
      res.status(201).send('Usuário cadastrado com sucesso!');
    }
  });
});

// Rota para listar usuários
app.get('/usuarios', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) {
      console.error('Erro ao buscar usuários:', err);
      res.status(500).send('Erro ao buscar usuários');
    } else {
      res.json(results);
    }
  });
});

// Rota para cadastrar um novo produto
app.post('/produtos', (req, res) => {
  const { tipo, nome, marca, descricao, preco, imagem, categoria } = req.body;
  if (!nome || !preco) {
    return res.status(400).send('Campos obrigatórios ausentes');
  }
  const sql = `INSERT INTO produtos
    (tipo, nome, marca, descricao, preco, imagem, categoria)
    VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.query(sql, [tipo, nome, marca, descricao, preco, imagem, categoria], (err, result) => {
    if (err) {
      console.error('Erro ao inserir produto:', err);
      return res.status(500).send('Erro ao cadastrar produto');
    }
    res.status(201).json({ id: result.insertId, message: 'Produto criado' });
  });
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Servidor rodando em http://0.0.0.0:3000');
});
