document.getElementById('formCadastro').addEventListener('submit', function(e) {
  e.preventDefault();

  const nome = e.target.nome.value;
  const email = e.target.email.value;
  const senha = e.target.senha.value;

  fetch('http://192.168.15.7:3000/usuarios', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nome, email, senha })
  })
  .then(response => {
    if (response.ok) {
      document.getElementById('mensagem').textContent = 'Usuário cadastrado com sucesso!';
      e.target.reset();
    } else {
      document.getElementById('mensagem').textContent = 'Erro ao cadastrar usuário.';
    }
  })
  .catch(error => {
    console.error('Erro:', error);
    document.getElementById('mensagem').textContent = 'Erro de conexão com o servidor.';
  });
});
