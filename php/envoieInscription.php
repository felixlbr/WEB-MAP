<?php
$prenom= isset($_POST['prenom'])?($_POST['prenom']):'';
$email= isset($_POST['email'])?($_POST['email']):'';
$pwd= isset($_POST['pwd'])?($_POST['pwd']):'';
$msg='';
if (count($_POST)==0) require("../inscription");
else {
    $profil = array();
    inscri($prenom,$email,$pwd);
}

function inscri($prenom,$email,$pwd){
    require("./connect.php");
    $sql = "INSERT INTO `user`(`prenom`, `email`, `pwd`) VALUES (:prenom,:email,:pwd)";
    $my_Insert_Statement = $my_Db_Connection->prepare($sql);
    $my_Insert_Statement->bindParam(':prenom', $prenom);
    $my_Insert_Statement->bindParam(':email', $email);
    $my_Insert_Statement->bindParam(':pwd', $pwd);
    if ($my_Insert_Statement->execute()) {
        header("Location: ../itineraire.php");
    } else {
        header("Location: ../inscription.php");
    }
}
?>