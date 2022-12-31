<!doctype html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <title>Titre de la page</title>
    <link rel="stylesheet" href="style.css">
    <script src="script.js"></script>
</head>
<body>
<form action= "php/envoieCompte.php" method= "post" >
    Prénom : <input name="prenom" value="<?php echo $prenom="" ?>" /> <br/>
    E-mail : <input type="email" name="email" value="<?php echo $email=""?>" required> <br/>
    Mot de passe : <input type="password" name="pwd" value="<?php echo $pwd="" ?>" required> <br/>
    Home : <input name="home" list="loc" value="<?php echo $home="" ?>"><br/>
    Work : <input name="work" list="loc" value="<?php echo $work="" ?>" /> <br/>
    <input type= "submit" value= "ok" />
    <datalist id="loc">
        <option value="Maison">
        <option value="IUT">
        <option value="Urban">
        <option value="Bouygues">
    </datalist><br/>
</form>
<div id ="m"> <?php echo $msg=""; ?> </div>
</body>
</html>