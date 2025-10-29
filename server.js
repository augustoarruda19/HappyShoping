// server.js

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// ============================
// MIDDLEWARES
// ============================
app.use(cors());
app.use(bodyParser.json());

// Permite servir arquivos estáticos (imagens, etc.)
app.use('/img', express.static(path.join(__dirname, 'public/img')));

// ============================
// CONEXÃO COM MYSQL
// ============================
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'happyshopping'
});

db.connect((err) => {
  if (err) {
    console.error('❌ Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('✅ Conectado ao MySQL!');
});

// ============================
// ROTAS
// ============================

// Teste
app.get('/', (req, res) => {
  res.send('Servidor rodando 🚀');
});

// ----------------------------
// USUÁRIOS
// ----------------------------
app.post('/usuarios', (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
  db.query(sql, [nome, email, senha], (err) => {
    if (err) {
      console.error('❌ Erro ao cadastrar usuário:', err);
      return res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
    }
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  });
});

app.get('/usuarios', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) {
      console.error('❌ Erro ao buscar usuários:', err);
      return res.status(500).json({ error: 'Erro ao buscar usuários.' });
    }
    res.json(results);
  });
});

// ----------------------------
// PRODUTOS
// ----------------------------

// Cadastrar novo produto
app.post('/produtos', (req, res) => {
  const { tipo, nome, marca, descricao, preco, imagem, categoria } = req.body;
  if (!nome || !preco) {
    return res.status(400).json({ error: 'Nome e preço são obrigatórios.' });
  }

  const sql = `
    INSERT INTO produtos (tipo, nome, marca, descricao, preco, imagem, categoria)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, [tipo, nome, marca, descricao, preco, imagem, categoria], (err, result) => {
    if (err) {
      console.error('❌ Erro ao inserir produto:', err);
      return res.status(500).json({ error: 'Erro ao cadastrar produto.' });
    }
    res.status(201).json({ id: result.insertId, message: 'Produto criado com sucesso!' });
  });
});

// Listar todos os produtos
app.get('/produtos', (req, res) => {
  const sql = 'SELECT * FROM produtos ORDER BY id DESC';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Erro ao buscar produtos:', err);
      return res.status(500).json({ error: 'Erro ao buscar produtos.' });
    }

    // Adiciona URL completa à imagem, caso não venha do banco
    const produtos = results.map((p) => ({
      ...p,
      imagem: p.imagem
        ? p.imagem.startsWith('http')
          ? p.imagem
          : `http://192.168.15.6:3000/img/${p.imagem}`
        : 'http://192.168.15.6:3000/img/placeholder.png',
    }));

    res.json(produtos);
  });
});

// Buscar produto pelo ID (para detalhes.html)
app.get('/produtos/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM produtos WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('❌ Erro ao buscar produto:', err);
      return res.status(500).json({ error: 'Erro ao buscar produto.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Produto não encontrado.' });
    }

    const produto = results[0];
    produto.imagem = produto.imagem
      ? produto.imagem.startsWith('http')
        ? produto.imagem
        : `http://192.168.15.6:3000/img/${produto.imagem}`
      : 'http://192.168.15.6:3000/img/placeholder.png';

    res.json(produto);
  });
});

// ----------------------------
// CARRINHO
// ----------------------------
app.post('/carrinho', (req, res) => {
  const { usuario_id, produto_id, quantidade } = req.body;

  const checkQuery = 'SELECT * FROM carrinho WHERE usuario_id = ? AND produto_id = ?';
  db.query(checkQuery, [usuario_id, produto_id], (err, result) => {
    if (err) {
      console.error('❌ Erro ao verificar carrinho:', err);
      return res.status(500).json({ error: 'Erro ao verificar carrinho.' });
    }

    if (result.length > 0) {
      const updateQuery = 'UPDATE carrinho SET quantidade = quantidade + ? WHERE usuario_id = ? AND produto_id = ?';
      db.query(updateQuery, [quantidade, usuario_id, produto_id], (err) => {
        if (err) {
          console.error('❌ Erro ao atualizar carrinho:', err);
          return res.status(500).json({ error: 'Erro ao atualizar carrinho.' });
        }
        return res.json({ message: 'Quantidade atualizada no carrinho.' });
      });
    } else {
      const insertQuery = 'INSERT INTO carrinho (usuario_id, produto_id, quantidade) VALUES (?, ?, ?)';
      db.query(insertQuery, [usuario_id, produto_id, quantidade], (err) => {
        if (err) {
          console.error('❌ Erro ao adicionar ao carrinho:', err);
          return res.status(500).json({ error: 'Erro ao adicionar ao carrinho.' });
        }
        return res.json({ message: 'Produto adicionado ao carrinho com sucesso!' });
      });
    }
  });
});

// ============================
// INICIALIZA SERVIDOR
// ============================
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Servidor rodando em: http://192.168.15.6:${port}`);
});
