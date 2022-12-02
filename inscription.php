<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <title>Page d'inscription</title>
    <link rel="stylesheet" href="css/connexion_style.css">
</head>

<body>

<!-- HEADER -->
<header></header>

<!-- MAIN -->
<main>
    <div id="inscription">
        <div class="container">
            <h2>Inscrivez-vous</h2>
            <br>
            <p>Création de votre compte SNCF</p>
            <br>
            <form action= "php/envoieInscription.php" method= "post">
                Prénom : <input name="prenom" value="<?php echo $prenom="" ?>" /> <br/>
                E-mail : <input type="email" name="email" value="<?php echo $email=""?>" /> <br/>
                Mot de passe : <input type="password" name="pwd" value="<?php echo $pwd="" ?>" /> <br/>
                <button type="submit">Valider</button>
            </form>
            <p><a href="index.php">J'ai déjà un compte</a></p>
        </div>
    </div>
</main>

<!-- FOOTER -->
<footer></footer>

<script src="js/headerFooter.js"></script>

</body>
</html>