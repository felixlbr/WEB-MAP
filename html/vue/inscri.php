<form action= "inscri.php" method= "post" >
    Prénom : <input name="prenom" value="<?php echo $prenom="" ?>" /> <br/>
    E-mail : <input type="email" name="email" value="<?php echo $email=""?>" /> <br/>
    Mot de passe : <input type="password" name="pwd" value="<?php echo $pwd="" ?>" /> <br/>
    <input type= "submit" value= "ok" />
</form>
<div id ="m"> <?php echo $msg=""; ?> </div>