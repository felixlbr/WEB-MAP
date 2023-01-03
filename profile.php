<?php
session_start();
if($_SESSION['profil'] == null){
  header("Location: index.php");
}
?>

<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>Profil</title>
    <script type="text/javascript" src="https://code.jquery.com/jquery-3.5.0.js"></script>
  <script src="https://code.jquery.com/ui/1.13.1/jquery-ui.js" integrity="sha256-6XMVI0zB8cRzfZjqKcD01PBsAy3FlDASrlC8SxCpInY=" crossorigin="anonymous"></script>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.2/dist/leaflet.css" integrity="sha256-sA+zWATbFveLLNqWO2gtiw3HL/lh1giY/Inf1BJ0z14=" crossorigin=""/>
  <script src="https://unpkg.com/leaflet@1.9.2/dist/leaflet.js" integrity="sha256-o9N1jGDZrf5tS+Ft4gbIK7mYMipq9lqpVJ91xHSyKhg=" crossorigin=""></script>
    <link rel="icon" href="img/logo.ico" />
    <link rel="stylesheet" href="../css/connexion_style.css">
    <link rel="stylesheet" href="../css/itineraire_style.css">
</head>
<body>

<!-- HEADER -->
<header>
<div class="container">
    <div class="containerItineraire">
      <div class="containerMenu">
        <h3 id="nom"><?php echo $prenom ?></h3>
        <h3 id="prof"><a href="../itineraire.php">Itineraire</a></h3>
        <a id="deco" href="./logout.php">Deconnexion</a>
      </div>
    </div>
     <img src="img/sncf_logo.png" alt="logo SNCF">
     <h1>Mon Profil</h1>
  </div>
</header>


<!-- MAIN -->
<main>
    <div id="connexion">
        <div class="container">
        <h2>Modifier mon profil</h2>
            <br>
            <p><?php echo $msg; ?><p>
            <br>
            <form action= "envoieCompte.php" method= "post" >
                Prénom : <input name="prenom" value="<?php echo $prenom ?>" /> <br/>
                E-mail : <input type="email" name="email" value="<?php echo $email?>" required> <br/>
                Mot de passe : <input type="password" name="pwd" value="<?php echo $pwd ?>" required> <br/>
                Home : <input name="home" list="list-gare-arrivee" value="<?php echo $home?>"><br/>
                Work : <input name="work" list="list-gare-arrivee" value="<?php echo $work ?>" /> <br/>
                <datalist id="list-gare-arrivee"></datalist><br>
                <input type= "submit" value= "Enregistrer" />

            </form>
        </div>
    </div>
    <div id ="m"> <?php echo $msg=""; ?> </div>
</main>

<!-- FOOTER -->
<footer></footer>
<script src="../js/getGare.js"></script>
<script src="../js/footer.js"></script>
</body>
</html>