fetch('js/baclend.json')
.then(response => response.json())
.then(data => {
    //SALVAR OS DADOS VINDO DO BACK_END LOCALMENTE
    //VAMOS UTILIZAR LOCALSTORAGE
    localStorage.setItem('produtos', JSON.stringify (data));
    console.log('Dados salvos no localStorage com sucesso!');

    // Limpa o conteúdo existente
    $("#produtos").empty();
    
    data.forEach(produto => {
        var produtoHTML = `
        <!-- ITEM CARD-->
        <div class="item-card">
             <a  data- id= "${produto.id}" href="#" class="item" data-id="1">
                 <div class="img-container">
                     <img src="${produto.imagem}">
                 </div>
                 <div class="nome-rating">
                     <span>${produto.nome}</span>
                     <span><i class="mdi mdi-star"></i> ${produto.rating}</span>
                 </div>
                 <div class="price">${produto.preco_promocional.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})}</div>
                     </a>
                 </div>
        `;

        $("#produtos").append(produtoHTML);
    });

})   
.cath(error => console.error('Erro ao fazer fetch dos dados: '+error));
