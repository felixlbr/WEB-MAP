<?php
session_start();

$prenom = isset($_POST['prenom'])?($_POST['prenom']):'';
$email = isset($_POST['email'])?($_POST['email']):'';
$pwd = isset($_POST['pwd'])?($_POST['pwd']):'';
$home = isset($_POST['home'])?($_POST['home']):'';
$work = isset($_POST['work'])?($_POST['work']):'';
$msg='';

if (count($_POST)==0)require ("../profile.php");
else {
    $profil = array();
    if (! add_information($prenom,$email, $pwd, $home, $work, $profil)) {
        $msg ="impossible de mettre a jour";
        require ("../profile.php");
        $_SESSION['profil'] = null;
        //session_unregister($_SESSION['profil']);
    }
    else {

        $msg ="mise à jour avec succès";
        require ("../profile.php");
        //echo ("ok, bienvenue ".$nom. " ".$email);
    }
}
function add_information($prenom, $email, $pwd, $home, $work, $profil){
    require("./connect.php");

    $sql = "UPDATE utilisateur SET prenom=:prenom, pwd=:pwd, home=:home, work=:work WHERE email=:email";
    $commande = $my_Db_Connection->prepare($sql);
    $commande->bindParam(':prenom', $prenom);
    $commande->bindParam(':pwd', $pwd);
    $commande->bindParam(':home', $home);
    $commande->bindParam(':work', $work);
    $commande->bindParam(':email', $email);
    try{
        $bool = $commande->execute();
        if($bool){
            $resultat = $commande->fetchAll(PDO::FETCH_ASSOC);
            return true;
        }
        return false;
    }
    catch(PDOException $e){
        echo utf8_encode("Echec du update : " . $e->getMessage() . "\n");
        die();
    }
}