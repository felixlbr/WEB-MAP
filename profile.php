<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>Profil</title>
    <link rel="icon" href="img/logo.ico" />
    <link rel="stylesheet" href="css/connexion_style.css">
</head>
<body>

<!-- HEADER -->
<header></header>

<!-- MAIN -->
<main>
    <div id="connexion">
        <div class="container">
        <h2>Connectez-vous</h2>
            <br>
            <p>Authentifiez-vous avec Mon Identifiant SNCF</p>
            <br>
            <form action= "php/envoieCompte.php" method= "post" >
                Prénom : <input name="prenom" value="<?php echo $prenom ?>" /> <br/>
                E-mail : <input type="email" name="email" value="<?php echo $email?>" required> <br/>
                Mot de passe : <input type="password" name="pwd" value="<?php echo $pwd ?>" required> <br/>
                Home : <input name="home" list="list-gare-arrivee" value="<?php echo $home?>"><br/>
                Work : <input name="work" list="list-gare-arrivee" value="<?php echo $work ?>" /> <br/>
                <input type= "submit" value= "ok" />
                <datalist id="list-gare-arrivee"></datalist><br/>
            </form>
        </div>
    </div>
    <div id ="m"> <?php echo $msg=""; ?> </div>
</main>

<!-- FOOTER -->
<footer></footer>

<script src="js/headerFooter.js"></script>
<script src="js/erreurLogin.js"></script>
</body>
</html>