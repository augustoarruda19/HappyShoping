document.getElementById('form-cadastro').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Coleta os dados do formulário
    const tipo = document.getElementById('tipo').value;
    const nome = document.getElementById('nome').value;
    const marca = document.getElementById('marca').value;
    const descricao = document.getElementById('descricao').value;
    const preco = document.getElementById('preco').value;
    const imagem = document.getElementById('imagem').value;
    const categoria = document.getElementById('categoria').value;

    // Cria um objeto com os dados
    const novoProduto = {
        tipo,
        nome,
        marca,
        descricao,
        preco,
        imagem,
        categoria
    };

    const app = new Framework7({
  root: '#app',
  name: 'HappyShopping',
  theme: 'auto',
  routes: [
    {
      path: '/',
      url: 'index.html',
    },
      ]
});

    try {
        // Envia os dados para o back-end usando fetch()
        const response = await fetch('http://localhost:3000/produtos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoProduto) // Converte o objeto para JSON
        });

        // Verifica se a resposta foi bem-sucedida (código 200-299)
        if (response.ok) {
            const mensagem = await response.text();
            alert(mensagem);
            app.views.main.router.navigate('/');
            
        } else {
            const errorMessage = await response.text();
            alert(`Erro ao cadastrar: ${errorMessage}`);
        }

    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao se comunicar com o servidor.');
    }
});