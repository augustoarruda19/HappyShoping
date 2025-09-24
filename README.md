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
