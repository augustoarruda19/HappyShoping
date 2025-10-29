const express = require('express');
const router = express.Router();
const path = require('path');

// Ajuste do caminho do db.js conforme sua estrutura
// Seu db.js está em C:\Apps\saferoute\Backend\db.js
const db = require('./db');

// ==========================
// ADICIONAR PRODUTO AO CARRINHO
// ==========================
router.post('/', (req, res) => {
  const { usuario_id, produto_id, quantidade } = req.body;
  console.log('Dados recebidos:', req.body);

  if (!usuario_id || !produto_id) {
    return res.status(400).json({ error: 'Usuário e produto são obrigatórios!' });
  }

  const sql = `
    INSERT INTO carrinho (usuario_id, produto_id, quantidade)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE quantidade = quantidade + VALUES(quantidade);
  `;

  db.query(sql, [usuario_id, produto_id, quantidade || 1], (err, result) => {
    if (err) {
      console.error('Erro ao adicionar ao carrinho:', err);
      return res.status(500).json({ error: 'Erro ao adicionar ao carrinho' });
    }
    res.json({ message: 'Produto adicionado ao carrinho com sucesso!' });
  });
});

// ==========================
// LISTAR PRODUTOS DO CARRINHO DE UM USUÁRIO
// ==========================
router.get('/:usuario_id', (req, res) => {
  const usuario_id = req.params.usuario_id;

  if (!usuario_id) {
    return res.status(400).json({ error: 'ID do usuário é obrigatório!' });
  }

  const sql = `
    SELECT c.id, p.nome, p.preco, p.imagem, c.quantidade
    FROM carrinho c
    JOIN produtos p ON c.produto_id = p.id
    WHERE c.usuario_id = ?;
  `;

  db.query(sql, [usuario_id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar carrinho:', err);
      return res.status(500).json({ error: 'Erro ao buscar carrinho' });
    }
    res.json(results);
  });
});

// ==========================
// REMOVER ITEM DO CARRINHO
// ==========================
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ error: 'ID do item é obrigatório!' });
  }

  const sql = 'DELETE FROM carrinho WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao remover item do carrinho:', err);
      return res.status(500).json({ error: 'Erro ao remover item' });
    }
    res.json({ message: 'Item removido com sucesso!' });
  });
});

module.exports = router;
