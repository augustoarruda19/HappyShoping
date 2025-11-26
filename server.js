// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;
const BASE_HOST = 'http://127.0.0.1:' + port;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Servir imagens estáticas
app.use('/img', express.static(path.join(__dirname, 'public/img')));

// Conexão MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'happyshopping'
});

db.connect((err) => {
  if (err) {
    console.error('❌ Erro ao conectar ao MySQL:', err);
    process.exit(1);
  }
  console.log('✅ Conectado ao MySQL!');
});

app.get('/', (req, res) => res.send('Servidor rodando 🚀'));

/* ===== PRODUTOS ===== */

// Listar produtos
app.get('/produtos', (req, res) => {
  const sql = 'SELECT id, nome, descricao, preco, imagem FROM produtos ORDER BY id DESC';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Erro ao buscar produtos:', err);
      return res.status(500).json({ error: 'Erro ao buscar produtos.' });
    }

    const produtos = results.map(p => ({
      ...p,
      imagem: p.imagem
        ? (p.imagem.startsWith('http') ? p.imagem : `${BASE_HOST}/img/${p.imagem}`)
        : `${BASE_HOST}/img/placeholder.png`
    }));

    res.json(produtos);
  });
});

// Cadastrar novo produto
app.post('/produtos', (req, res) => {
    // Pega os dados enviados pelo frontend (script-cadastro-produto.js)
    const { tipo, nome, marca, descricao, preco, imagem, categoria } = req.body;

    // ⚠️ VALIDAÇÃO BÁSICA
    if (!nome || !preco) {
        return res.status(400).json({ error: "Nome e preço do produto são obrigatórios." });
    }

    // O comando INSERT deve corresponder exatamente às colunas da sua tabela
    const sql = 'INSERT INTO produtos (nome, descricao, preco, imagem, categoria, tipo, marca) VALUES (?, ?, ?, ?, ?, ?, ?)';

    // Prepara os valores na ordem correta
    const values = [nome, descricao, preco, imagem, categoria, tipo, marca];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("❌ Erro ao cadastrar produto:", err);
            // Retorna erro 500 caso o INSERT falhe (ex: erro de tipagem no MySQL)
            return res.status(500).json({ error: "Erro interno ao cadastrar produto." });
        }

        // Retorna sucesso
        return res.status(201).json({ message: "Produto cadastrado com sucesso!", id: result.insertId });
    });
});

// Produto por ID
app.get('/produtos/:id', (req, res) => {
  const id = req.params.id;

  const sql = 'SELECT id, nome, descricao, preco, imagem FROM produtos WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('❌ Erro ao buscar produto:', err);
      return res.status(500).json({ error: 'Erro ao buscar produto.' });
    }

    if (!results.length) {
      return res.status(404).json({ error: 'Produto não encontrado.' });
    }

    const p = results[0];
    p.imagem = p.imagem
      ? (p.imagem.startsWith('http') ? p.imagem : `${BASE_HOST}/img/${p.imagem}`)
      : `${BASE_HOST}/img/placeholder.png`;

    res.json(p);
  });
});

/* ===== CARRINHO ===== */

// Adicionar ao carrinho
app.post('/carrinho', (req, res) => {
  const { usuario_id, produto_id, quantidade } = req.body;
  if (!usuario_id || !produto_id)
    return res.status(400).json({ error: 'usuario_id e produto_id são obrigatórios.' });

  const q = quantidade && Number.isInteger(quantidade) ? quantidade : 1;

  const checkSql = 'SELECT id, quantidade FROM carrinho WHERE usuario_id = ? AND produto_id = ?';
  db.query(checkSql, [usuario_id, produto_id], (err, rows) => {
    if (err) {
      console.error('❌ Erro ao verificar carrinho:', err);
      return res.status(500).json({ error: 'Erro ao verificar carrinho.' });
    }

    if (rows.length) {
      const updateSql = 'UPDATE carrinho SET quantidade = quantidade + ? WHERE usuario_id = ? AND produto_id = ?';
      db.query(updateSql, [q, usuario_id, produto_id], (err) => {
        if (err) {
          console.error('❌ Erro ao atualizar carrinho:', err);
          return res.status(500).json({ error: 'Erro ao atualizar carrinho.' });
        }
        return res.json({ message: 'Quantidade atualizada no carrinho.' });
      });
    } else {
      const insertSql = 'INSERT INTO carrinho (usuario_id, produto_id, quantidade, criado_em) VALUES (?, ?, ?, NOW())';
      db.query(insertSql, [usuario_id, produto_id, q], (err) => {
        if (err) {
          console.error('❌ Erro ao adicionar ao carrinho:', err);
          return res.status(500).json({ error: 'Erro ao adicionar ao carrinho.' });
        }
        return res.json({ message: 'Produto adicionado ao carrinho com sucesso!' });
      });
    }
  });
});

// Listar itens do carrinho
app.get('/carrinho/:usuario_id', (req, res) => {
  const usuario_id = req.params.usuario_id;

  const sql = `
    SELECT c.id as carrinho_id, c.usuario_id, c.produto_id, c.quantidade,
           p.nome, p.descricao, p.preco, p.imagem
    FROM carrinho c
    JOIN produtos p ON c.produto_id = p.id
    WHERE c.usuario_id = ?
  `;

  db.query(sql, [usuario_id], (err, results) => {
    if (err) {
      console.error('❌ Erro ao buscar carrinho:', err);
      return res.status(500).json({ error: 'Erro ao buscar carrinho.' });
    }

    const itens = results.map(r => ({
      id: r.carrinho_id,
      usuario_id: r.usuario_id,
      produto_id: r.produto_id,
      quantidade: r.quantidade,
      nome: r.nome,
      descricao: r.descricao,
      preco: parseFloat(r.preco),
      imagem: r.imagem
        ? (r.imagem.startsWith('http') ? r.imagem : `${BASE_HOST}/img/${r.imagem}`)
        : `${BASE_HOST}/img/placeholder.png`
    }));

    res.json(itens);
  });
});

// Atualizar quantidade
app.put('/carrinho/:id', (req, res) => {
  const id = req.params.id;
  const { quantidade } = req.body;

  if (!id || quantidade == null)
    return res.status(400).json({ error: 'id e quantidade são obrigatórios.' });

  const sql = 'UPDATE carrinho SET quantidade = ? WHERE id = ?';
  db.query(sql, [quantidade, id], (err) => {
    if (err) {
      console.error('❌ Erro ao atualizar quantidade:', err);
      return res.status(500).json({ error: 'Erro ao atualizar quantidade.' });
    }
    res.json({ message: 'Quantidade atualizada.' });
  });
});

// Remover item
app.delete('/carrinho/:id', (req, res) => {
  const id = req.params.id;

  const sql = 'DELETE FROM carrinho WHERE id = ?';
  db.query(sql, [id], (err) => {
    if (err) {
      console.error('❌ Erro ao remover item:', err);
      return res.status(500).json({ error: 'Erro ao remover item.' });
    }
    res.json({ message: 'Item removido com sucesso.' });
  });
});

/* ===== USUÁRIOS ===== */

// Cadastrar usuário
app.post('/usuarios', (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ error: "Campos obrigatórios faltando." });
  }

  const sql = 'INSERT INTO usuarios (nome, email, senha, criado_em) VALUES (?, ?, ?, NOW())';

  db.query(sql, [nome, email, senha], (err, result) => {
    if (err) {
      console.error("❌ Erro ao cadastrar usuário:", err);
      return res.status(500).json({ error: "Erro ao cadastrar usuário." });
    }

    return res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
  });
});

// Iniciar servidor
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Servidor rodando em: ${BASE_HOST}`);
});

/* ===== FINALIZAR COMPRA ===== */

/* ===== PEDIDOS ===== */

// Finalizar compra
app.post('/pedidos', (req, res) => {
  const { usuario_id } = req.body;

  if (!usuario_id) {
    return res.status(400).json({ error: "usuario_id é obrigatório." });
  }

  // 1. Buscar itens do carrinho
  const sqlCarrinho = `
    SELECT c.produto_id, c.quantidade, p.preco
    FROM carrinho c
    JOIN produtos p ON p.id = c.produto_id
    WHERE c.usuario_id = ?
  `;

  db.query(sqlCarrinho, [usuario_id], (err, itens) => {
    if (err) {
      console.error("❌ Erro ao buscar carrinho:", err);
      return res.status(500).json({ error: "Erro ao buscar carrinho." });
    }

    if (!itens.length) {
      return res.status(400).json({ error: "Carrinho vazio." });
    }

    // 2. Calcular valor total
    const total = itens.reduce((soma, item) => {
      return soma + (item.preco * item.quantidade);
    }, 0);

    // 3. Criar pedido
    const sqlPedido = `
      INSERT INTO pedidos (usuario_id, data_pedido, valor_total, status)
      VALUES (?, NOW(), ?, 'PENDENTE')
    `;

    db.query(sqlPedido, [usuario_id, total], (err, result) => {
      if (err) {
        console.error("❌ Erro ao criar pedido:", err);
        return res.status(500).json({ error: "Erro ao criar pedido." });
      }

      const pedidoId = result.insertId;

      // 4. Inserir itens do pedido
      const sqlItens = `
        INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, preco_unitario)
        VALUES ?
      `;

      const valores = itens.map(item => [
        pedidoId,
        item.produto_id,
        item.quantidade,
        item.preco
      ]);

      db.query(sqlItens, [valores], (err) => {
        if (err) {
          console.error("❌ Erro ao inserir itens do pedido:", err);
          return res.status(500).json({ error: "Erro ao inserir itens." });
        }

        // 5. Limpar carrinho
        db.query("DELETE FROM carrinho WHERE usuario_id = ?", [usuario_id], (err) => {
          if (err) {
            console.error("❌ Erro ao limpar carrinho:", err);
            return res.status(500).json({ error: "Erro ao limpar carrinho." });
          }

          // 6. Sucesso!
          res.status(201).json({
            message: "Pedido finalizado com sucesso!",
            pedido_id: pedidoId,
            total: total
          });
        });
      });
    });
  });
});
