<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <title>Page d'inscription</title>
    <link rel="icon" href="img/logo.ico" />
    <link rel="stylesheet" href="css/connexion_style.css">
</head>

<body>

<!-- HEADER -->
<header></header>

<!-- MAIN -->
<main>
    <div class="alert-box" hidden>
        <img src="./img/errorLogin.png" class="alert-img" alt="">
        <p class="alert-msg"></p>
    </div>
    <div id="inscription">
        <div class="container">
            <h2>Inscrivez-vous</h2>
            <br>
            <p>Création de votre compte SNCF</p>
            <br>
            <form action= "php/envoieInscription.php" method= "post">
                Prénom : <input name="prenom" value="<?php echo $prenom="" ?>" /> <br/>
                E-mail : <input type="email" name="email" value="<?php echo $email=""?>" /> <br/>
                Mot de passe : <input type="password" class="pwd" name="pwd" value="<?php echo $pwd="" ?>" /> <br/>
                <p class ="submit">Valider</p>
            </form>
            <p><a href="index.php">J'ai déjà un compte</a></p>
        </div>
    </div>
</main>

<!-- FOOTER -->
<footer></footer>

<script src="js/headerFooter.js"></script>
<script src="js/erreurLogin.js"></script>

</body>
</html>