<?php
session_start();
if($_SESSION['profil'] == null){
  header("Location: index.php");
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Page itinéraire</title>
  <link rel="icon" href="img/logo.ico" />
  <script type="text/javascript" src="https://code.jquery.com/jquery-3.5.0.js"></script>
  <script src="https://code.jquery.com/ui/1.13.1/jquery-ui.js" integrity="sha256-6XMVI0zB8cRzfZjqKcD01PBsAy3FlDASrlC8SxCpInY=" crossorigin="anonymous"></script>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.2/dist/leaflet.css" integrity="sha256-sA+zWATbFveLLNqWO2gtiw3HL/lh1giY/Inf1BJ0z14=" crossorigin=""/>
  <script src="https://unpkg.com/leaflet@1.9.2/dist/leaflet.js" integrity="sha256-o9N1jGDZrf5tS+Ft4gbIK7mYMipq9lqpVJ91xHSyKhg=" crossorigin=""></script>
  <link rel="stylesheet" href="css/connexion_style.css">
  <link rel="stylesheet" href="css/itineraire_style.css">
</head>

<body>
<!-- HEADER -->
<header></header>

<script>
document.querySelector('header').innerHTML = `
      <div class="container">
          <div class="containerItineraire">
            <a href="php/logout.php">Deconnexion</a>
          </div>
          <img src="img/sncf_logo.png" alt="logo SNCF">
          <h1>Mon espace</h1>
      </div>
  `
</script>

<img src="img/loader.gif" class="loader" alt="" hidden>

<div id="map"></div>

<img id="back" src="img/back_arrow_14429.png" alt="">

<!-- MAIN -->
<main>
  <div id="itineraire">
    <div class="container">
      <h2>Choix des gares</h2>
      <label for="departChoix">Choix de la gare d'arrivée :</label>
      <input list="list-gare-depart" id="departChoix" name="departChoix">
      <datalist id="list-gare-depart"></datalist>
      <br>
      <img id="swipe" src="img/swipe.png" alt="">
      <label for="arriveeChoix">Choix de la gare de départ :</label>
      <input list="list-gare-arrivee" id="arriveeChoix" name="arriveeChoix">
      <datalist id="list-gare-arrivee"></datalist>
      <br><br><br><br>
      <button id="valider">Valider</button>
    </div>
  </div>

  <div id="chemin" hidden>
    <div id="scrollable">
    </div>
      <br><br><br><br>
      <button id="retour">Retour</button>
  </div>
</main>

<!-- FOOTER -->
<footer></footer>
<script src="js/script.js"></script>
<script src="js/itineraire.js"></script>

</body>
</html>