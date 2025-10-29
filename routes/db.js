// C:\Apps\saferoute\backend\db.js

const mysql = require('mysql2');

// Cria a conexão com o banco de dados
const db = mysql.createConnection({
  host: 'localhost',       // ou o IP do servidor MySQL
  user: 'root',            // seu usuário MySQL
  password: 'root',        // sua senha MySQL (deixe vazio se não tiver)
  database: 'happyshopping'    // nome do banco que você criou
});

// Conecta e exibe mensagem no console
db.connect((err) => {
  if (err) {
    console.error('❌ Erro ao conectar ao MySQL:', err);
  } else {
    console.log('✅ Conectado ao banco de dados MySQL com sucesso!');
  }
});

module.exports = db;
