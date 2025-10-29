cações maiores, como sistemas de compras online, cadastros de clientes ou plataformas de serviços.

## 🔧 Tecnologias Utilizadas

- **Node.js + Express**: Responsável pelo servidor backend e pelas rotas da API.
- **MySQL**: Banco de dados relacionais onde ficam armazenados os usuários.
- **JavaScript + HTML + CSS**: Interface simples para extrair uma API.
- **CORS e Body-Parser**: Usados ​​para permitir a comunicação entre frontend e backend, e para tratar dados enviados no formato JSON.

## 📂 Funcionalidades Principais

### 1. Conexão com o Banco de Dados

O sistema conectado ao banco MySQL chama `happyshopping`. Dentro desse banco, existe uma tabela `usuários`, que armazena:

| Campo | Tipo | Descrição |
|----------|-----------------|-----------------------------|
| `id` | INT (PK, Automático) | Identificador único (autoincremento) |
| `nome` | VARCHAR(255) | Nome do usuário |
| `e-mail` | VARCHAR(255) | E-mail único de login |
| `senha` | VARCHAR(255) | Senha cadastrada |

### 2. Rotas da API

O backend disponibiliza os seguintes **endpoints REST**:

#### 🔹 Rota Inicial

- **Método**: `GET /`
- **Descrição**: Retorna uma mensagem de status confirmando que o servidor está ativo.

#### 🔹 Cadastro de Usuário

- **Método**: `POST /usuários`
- **Descrição**: Recebe um objeto JSON com nome, email e senha para cadastrar um novo usuário.
  
**Exemplo de Request**:

```json
{
  "nome": "Ana Silva",
  "e-mail": "ana@email.com",
  "senha": "123456"
}
Resposta (Sucesso):

json
Copiar código
{
  "message": "Usuário cadastrado com sucesso!"
}
Resposta (Erro):

json
Copiar código
{
  "error": "Campos faltando ou falha na inserção."
}
🔹 Listagem de Usuários
Método: GET /usuários

Descrição: Retorna todos os registros de usuários cadastrados no banco de dados.

Exemplo de Resposta:

json
Copiar código
[
  { "id": 1, "nome": "Ana Silva", "email": "ana@email.com", "senha": "123456" },
  { "id": 2, "nome": "João Souza", "email": "joao@email.com", "senha": "abcdef" }
]
🚀 Fluxo de Funcionamento
O usuário acessa o frontend (HTML/JS).

O frontend envia requisições para o backend Node.js.

O backend processa os dados e acessa o banco MySQL.

O banco retorna os dados, que são exibidos na interface para o usuário.

sql
Copiar código
CRIAR BANCO DE DADOS happyshopping;
4. Iniciie o Servidor
festança
Copiar código
npm start
O servidor estará disponível em http://localhost:3000.

5. Teste como APIs
Para testar o cadastro de usuários, envie uma requisição POST para http://localhost:3000/usuarios com um JSON contendo os dados do usuário.

Para listar os usuários cadastrados, envie uma requisição GET para http://localhost:3000/usuarios.

-------CADASTRO DE PRODUTOS-------

Este projeto conta agora com a funcionalidade de cadastro de produtos, um recurso essencial em aplicações de e-commerce e gerenciamento de inventário. Ele utiliza um backend robusto para processar e armazenar informações de produtos, sendo facilmente adaptável para projetos maiores, como sistemas de compras online ou plataformas de inventário.

🔧 Tecnologias Utilizadas
Node.js + Express: Responsável pelo servidor backend e pelas rotas da API.

MySQL: Banco de dados relacional para o armazenamento dos produtos.

JavaScript + HTML + CSS: Interface de usuário simples para a interação com a API.

CORS e Body-Parser: Utilizados para permitir a comunicação entre o frontend e o backend, e para tratar os dados enviados no formato JSON.

📂 Funcionalidades Principais
1. Conexão com o Banco de Dados
O sistema se conecta ao banco de dados MySQL chamado happyshopping. Dentro desse banco, existe uma tabela produtos, que armazena as seguintes informações:

Campo	Tipo	Descrição
id	INT (PK, Automático)	Identificador único (autoincremento)
nome	VARCHAR(255)	Nome do produto
descricao	TEXT	Descrição detalhada do produto
preco	DECIMAL(10, 2)	Preço do produto
imagem	VARCHAR(255)	URL da imagem do produto
categoria	VARCHAR(100)	Categoria do produto
tipo	VARCHAR(255)	Tipo do produto
marca	VARCHAR(255)	Marca do produto

Exportar para as Planilhas
2. Rotas da API
O backend disponibiliza o seguinte endpoint REST para o cadastro de produtos:

🔹 Cadastro de Produto
Método: POST /produtos

Descrição: Recebe um objeto JSON com os dados do produto para cadastrá-lo no banco de dados.
  
Exemplo de Request:

JSON

{
  "nome": "Smart TV",
  "descricao": "TV 4K com 50 polegadas",
  "preco": 2500.00,
  "imagem": "url_imagem_tv.png",
  "categoria": "Eletrônicos",
  "tipo": "Televisor",
  "marca": "Tech Brand"
}
Resposta (Sucesso):

JSON

{
  "message": "Produto cadastrado com sucesso!"
}
Resposta (Erro):

JSON

{
  "error": "Nome, preço, tipo e marca do produto são obrigatórios."
}
🔹 Listagem de Produtos
Método: GET /produtos

Descrição: Retorna todos os registros de produtos cadastrados no banco de dados.

Exemplo de Resposta:

JSON

[
  { "id": 1, "nome": "Smart TV", "preco": 2500, "categoria": "Eletrônicos" },
  { "id": 2, "nome": "Smartphone X", "preco": 1800, "categoria": "Eletrônicos" }
]
🚀 Fluxo de Funcionamento
O usuário acessa o frontend (HTML/JS).

O frontend envia uma requisição POST com os dados do produto para o backend Node.js.

O backend processa os dados, valida os campos e os insere na tabela produtos do MySQL.

O backend retorna uma resposta de sucesso ou erro, que é exibida na interface para o usuário.

🖥️ Começando
Crie a tabela produtos no seu banco de dados MySQL:

SQL

CREATE TABLE produtos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  descricao TEXT,
  preco DECIMAL(10, 2) NOT NULL,
  imagem VARCHAR(255),
  categoria VARCHAR(100),
  tipo VARCHAR(255) NOT NULL,
  marca VARCHAR(255) NOT NULL
);
Inicie o Servidor:

Bash

node server.js
O servidor estará disponível em http://localhost:3000.

Teste a API:
Para testar o cadastro de produtos, envie uma requisição POST para http://localhost:3000/produtos com o corpo da requisição no formato JSON.
