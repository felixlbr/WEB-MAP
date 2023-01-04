<?php
session_start();

$msg='';
$profil = array();
recup_infos($_SESSION['profil']['email'], $profil);

$prenom = $profil['prenom'];
$email = $profil['email'];
$pwd = $profil['pwd'];
$home = $profil['home'];
$work = $profil['work'];

$_SESSION['profil'] = $profil;
require("../profile.php");

function recup_infos($email, &$profil=array()){
    require("./connect.php");

    $sql = "SELECT * FROM user WHERE email=:email";
    $commande = $my_Db_Connection->prepare($sql);
    $commande->bindParam(':email', $email);

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
    $profil=$resultat[0];
}

?>