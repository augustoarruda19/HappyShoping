var app = new Framework7({
  root: '#app',
  name: 'HappyShopping',
  id: 'com.happy.shopping',
  routes: routes, 
});

var app = new Framework7({
  root: '#app',
  routes: [
    { path: '/', url: 'index.html' },
    { path: '/cadastro-produtos/', url: 'cadastro-produtos.html' }
  ]
});