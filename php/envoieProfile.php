<?php
session_start();

$msg='';
$resultat = recup_infos($_SESSION['profil']['email']);
$prenom = $resultat['prenom'];
$email = $resultat['email'];
$pwd = $resultat['pwd'];
$home = $resultat['home'];
$work = $resultat['work'];
require("../profile.php");

function recup_infos($email){
    require("./connect.php");

    $sql = "SELECT * FROM utilisateur WHERE email=:email";
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
    return $resultat[0];
}

?>