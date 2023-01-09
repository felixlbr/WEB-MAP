<?php
	$servername = "localhost"; 
	$database = "webmap";
	$username = "webmap";
	$password = "";
	$sql = "mysql:server=$servername;dbname=$database;";
	$dsn_Options = [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION];

	try { 
	  $my_Db_Connection = new PDO($sql, $username, $password);

	} catch (PDOException $error) {
	  echo 'Échec de la connexion : ' . $error->getMessage();
	}
?>
