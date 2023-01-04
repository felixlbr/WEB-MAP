<?php
session_start();
$email= isset($_POST['email'])?($_POST['email']):'';
$pwd= isset($_POST['pwd'])?($_POST['pwd']):'';
$msg='';

if (count($_POST)==0)require ("../index.php");
else {
    $profil = array();
    if (verif_ident($email, $pwd, $profil)) {
        $_SESSION['profil'] = $profil;
        header("Location: ../itineraire.php");
    }else{
        header("Location: ../index.php");
        
    }
}

function verif_ident($email, $pwd,&$profil=array()){
    require("./connect.php");
    $sql = "SELECT email, pwd FROM user WHERE email=:email and pwd=:pwd";
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