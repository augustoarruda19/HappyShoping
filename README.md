------ INDEX HTML ------

<!DOCTYPE html>
<html>

<head>
    <!-- Required meta tags-->
    <meta charset="utf-8">
    <meta name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <!-- Color theme for statusbar (Android only) -->
    <meta name="theme-color" content="#2196f3">
    <!-- Your app title -->
    <title>Template Tab</title>
    <!-- Path to Framework7 Library Bundle CSS -->
    <link rel="stylesheet" href="lib/framework7-bundle.min.css">
    <!-- CSS PERSONALIZADO PARA MENU-->
    <link rel="stylesheet" href="css/index.css">
    <!--Ícones Material Design-->
    <link rel="stylesheet" href="css/materialdesignicons.min.css">
    <!-- Ícones do Remix icon-->
    <link rel="stylesheet" href="css/remixicon/remixicon.css">


</head>

<body>
    <!-- App root element -->
    <div id="app">

        <!-- Your main view, should have "view-main" class -->
        <div class="view view-main">

            <!-- TAB BAR-->
            <div class="toolbar toolbar-bottom">
                <div class="toolbar-inner display-flex">
                    <a href="/index/" class="tab-link link active">
                        <i class="ri-home-4-fill"></i>
                        <span>Home</span>
                    </a>
                    <a href="/link2/" class="tab-link link">
                        <i class="ri-search-line"></i>
                        <span>Busca</span>
                    </a>
                    <a href="/link3/" class="tab-link link">
                        <i class="ri-heart-fill"></i>
                        <span>Favoritos</span>
                    </a>
                     <a href="/link4/" class="tab-link link">
                        <i class="ri-user-3-fill"></i>
                        <span>Conta</span>
                    </a>

                </div>
            </div>

            <!-- Initial Page, "data-name" contains page name -->
            <div data-name="index" class="page color-theme-blue">

              <!-- NAV TOPO -->
                   <div class="top-nav">
                        <h1 class="tittle-logo">H<span>app</span>yShopping</h1>
                        <a href="#" class="btn-cart" data-count="0" >
                            <i class="ri-shopping-bag-4-fill"></i>
                        </a>
                        </div> 
                        
                        <form>
                            <input placeholder="O que você procura?" type="text" class="search-box">
                            <i class="icone-busca ri-search-line"></i>
                        </form>



                <!-- Scrollable page content -->
                <div class="page-content">
                    <div class="block no-margin-top">
                        <!-- Swiper -->
  <div class="swiper mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <img src="img/propaganda.png">
      </div>
      <div class="swiper-slide">
        <img src="img/propaganda2.png">
      </div>
      <div class="swiper-slide">
        <img src="img/propaganda3.png">
      </div>
      <div class="swiper-slide"><img src="img/propaganda4.png"></div>
  </div>
                <div class="display-flex align-items-center justify-content-space-between">
                    <h2>Categorias</h2>
                    <a href="#">Ver todas<i class="mdi mdi-arrow-right"></i>
                    </div>

                        <div class="swiper categorias">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <button class="filter-btn active">
            Todas
        </button>
      </div>
      <div class="swiper-slide">
    <button class="filter-btn">Celulares</button>
</div>
<div class="swiper-slide">
    <button class="filter-btn">Eletrônicos</button>
</div>
<div class="swiper-slide">
    <button class="filter-btn">Informática</button>
</div>
<div class="swiper-slide">
    <button class="filter-btn">Acessórios</button>
</div>
<div class="swiper-slide">
    <button class="filter-btn">Moda</button>
</div>
<div class="swiper-slide">
    <button class="filter-btn">Calçados</button>
</div>
<div class="swiper-slide">
    <button class="filter-btn">Casa</button>
</div>
<div class="swiper-slide">
    <button class="filter-btn">Cozinha</button>
</div>
<div class="swiper-slide">
    <button class="filter-btn">Eletrodomésticos</button>
</div>
<div class="swiper-slide">
    <button class="filter-btn">Ferramentas</button>
</div>
<div class="swiper-slide">
    <button class="filter-btn">Esportes</button>
</div>
<div class="swiper-slide">
    <button class="filter-btn">Brinquedos</button>
</div>
<div class="swiper-slide">
    <button class="filter-btn">Bebês</button>
</div>
<div class="swiper-slide">
    <button class="filter-btn">Beleza</button>
</div>
<div class="swiper-slide">
    <button class="filter-btn">Saúde</button>
</div>
<div class="swiper-slide">
    <button class="filter-btn">Automotivo</button>
</div>
<div class="swiper-slide">
    <button class="filter-btn">Jardinagem</button>
</div>
<div class="swiper-slide">
    <button class="filter-btn">Pets</button>
</div>
<div class="swiper-slide">
    <button class="filter-btn">Livros</button>
</div>
<div class="swiper-slide">
    <button class="filter-btn">Música</button>
</div>

    </div>
    <div class="swiper-pagination"></div>
  </div>

  <div id="produtos" class="row display-flex align-items-center justify-content-bet">
  
  <!-- ITEM CARD 1 -->
  <div class="item-card">
    <a href="#" class="item">
      <div class="img-container">
        <img src="img/airpod_resized.png" alt="Airpod">
      </div>
      <div class="nome-rating">
        <span>AirPod Apple</span>
        <span><i class="mdi mdi-star"></i> 5.0</span>
      </div>
      <div class="price">R$ 1.699,99</div>
    </a>
  </div>

  <!-- ITEM CARD 2 -->
  <div class="item-card">
    <a href="#" class="item">
      <div class="img-container">
        <img src="img/xbox.png" alt="Airpod">
      </div>
      <div class="nome-rating">
        <span>Xbox Series X</span>
        <span><i class="mdi mdi-star"></i> 5.0</span>
      </div>
      <div class="price">R$ 5.499,99</div>
    </a>
  </div>

  <!-- ITEM CARD 3 -->
  <div class="item-card">
    <a href="#" class="item">
      <div class="img-container">
        <img src="img/macbook_resized.png" alt="Airpod">
      </div>
      <div class="nome-rating">
        <span>Macbook Apple</span>
        <span><i class="mdi mdi-star"></i> 5.0</span>
      </div>
      <div class="price">R$ 8.499,99</div>
    </a>
  </div>

  <!-- ITEM CARD 4 -->
  <div class="item-card">
    <a href="#" class="item">
      <div class="img-container">
        <img src="img/iphone_resized.png" alt="Airpod">
      </div>
      <div class="nome-rating">
        <span>Iphone 16 Pro Max</span>
        <span><i class="mdi mdi-star"></i> 5.0</span>
      </div>
      <div class="price">R$ 6.499,99</div>
    </a>
  </div>

</div>

<br><br><br><br><br><br><br><br>

 
    <!-- Path to Framework7 Library Bundle JS-->
    <script type="text/javascript" src="lib/framework7-bundle.min.js"></script>
	<!-- jQuery -->
	<script type="text/javascript" src="lib/jquery-3.7.0.min.js"></script>	
    <!-- Roteamento do app-->
    <script type="text/javascript" src="js/routes.js"></script>
    <script src="cordova.js"></script>
</body>

</html>
