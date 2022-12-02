<?php
session_start();
$email= isset($_POST['email'])?($_POST['email']):'';
$pwd= isset($_POST['pwd'])?($_POST['pwd']):'';
$msg='';
if (count($_POST)==0)require ("./vue/ident.php");
else {
    $profil = array();
    if (! verif_ident($email, $pwd, $profil)) {
        $msg ="erreur de saisie OU utilisateur inconnu";
        require ("./vue/ident.php");
        $_SESSION['profil'] = null;
        //session_unregister($_SESSION['profil']);
    }
    else {
        $_SESSION['profil'] = $profil;
        print_r($_SESSION['profil']['prenom']);
        echo '<a href="./accueil.php">Je vais a l accueil</a>';

        //echo ("ok, bienvenue ".$nom. " ".$email);
    }
}

function verif_ident($email, $pwd,&$profil=array()){
    require("./connect.php");
    $sql = "SELECT email, pwd FROM utilisateur WHERE email=:email and pwd=:pwd";
    $commande = $my_Db_Connection->prepare($sql);
    $commande->bindParam(':email', $email);
    $commande->bindParam(':pwd', $pwd);

    try{
        $bool = $commande->execute();
        if($bool){
            $resultat = $commande->fetchAll(PDO::FETCH_ASSOC);
        }
    }
    catch(PDOException $e){
        echo utf8_encode("Echec du select : " . $e->getMessage() . "\n");
        die();
    }
    if(count($resultat)==0)return false;
    else{ $profil=$resultat[0]; return true;}
}

?>