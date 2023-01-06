# WEB-MAP - [Félix LIBURSKI](https://github.com/felixlbr), [Hugo PEREIRA](https://github.com/tigrou23) & François PEUCH (novembre - janvier 2023)
<div align="justify">
	Dans ce projet universitaire, nous avons utilisé des APIs pour tracer et indiquer un itinéraire en temps réel entre deux gares d'Île-de-France. Des fonctionnalités supplémentaires ont été ajoutées et décrites ci dessous.
</div>
<br>

Lien vers le site :
- https://hugopereira.fr

## <center>Table des matières</center>
* [Prérequis pour pouvoir utiliser correctement notre site](#chapter1)
	* [Cross-origin resource sharing](#section1_1)

* [Fonctionnalités détaillées](#chapter2)
 	* [Transports disponibles](#section2_1)
 	* [Inscription & Connexion](#section2_2)
	* [Stations préférées](#section2_3)
	* [Détails du trajet](#section2_5)
	* [Météo disponible sur les stations](#section2_6)
	* [Modification possible des données](#section2_7)

* [Les APIs utilisées](#chapter3)
 	* [OpenWeather](#section3_1)
	* [opendata](#section3_2)
	* [citymapper](#section3_3)

* [Structure du projet](#chapter4)
	* [PHP/SQL](#section4_1)
	* [Javascript/JQUERY](#section4_2)
	* [CSS](#section2_3)
	* [Base de données](#section4_3)

* [Architecture](#chapter5)
	* [Hébergement du projet](#section5_1)
	* [Hébergement de la base de données MySQL](#section5_2)
	* [Nom de domaine](#section5_3)
	* [Certificat SSL](#section5_4)
	
## Fonctionnalités détaillées <a class="anchor" id="chapter2"></a>

### 1. Transports disponibles <a class="anchor" id="section2_1"></a>
Les trajets proposés par WEB-MAP concernent :
- Train 🚅
- RER 🚈
- Métro 🚇
- Tramway 🚃
- Bus 🚎
<div align="justify">
Afin de simplifier l'identification de chaque ligne, elles sont identifiables (sur la carte et dans le détail des itinéraires) par leurs propres couleurs (ex: jaune pour la ligne 1 du métro).
</div>
<br>

### 2. Inscription & Connexion <a class="anchor" id="section2_2"></a>
<div align="justify">
Un formulaire de connexion et un autre d'inscription vous permette de vous connecter et d'accèder à la page <a href="itineraire.php">itinéraire</a> (⚠️ Seules les personnes connectées peuvent accéder à cette page.).
</div>
<br>

![""](readme/inscription_connexion.png "Inscription et Connexion")

### 3. Stations préférées <a class="anchor" id="section2_3"></a>
<div align="justify">
	Chaque utilisateur peut définir une station <i>home</i> et une station <i>work</i>. Ces stations seront proposées à l'utilisateur pour lui apporter une expérience personnalisée.
</div>
<br>

![""](readme/gares_preferees.png "Gares préférées")

### 5. Détails du trajet <a class="anchor" id="section2_5"></a>
<div align="justify">
Pour chaque trajet proposé, un détail est disponible sur une fenêtre pour apporter plus de précision sur le transport en question ainsi que les gares à emprunter.
</div>
<br>

![""](readme/itineraire.png "Détails itinéraire")

### 6. Météo disponible sur les stations <a class="anchor" id="section2_6"></a>
<div align="justify">
Nous marquons sur la carte les gares principales (gare de départ et gare d'arrivée pour chaque transport de l'itinéraire). Lorsqu'on clique sur ces dernières, il nous est renseigné le nom ainsi que la météo correspondante.
</div>
<br>

![""](readme/meteo.png "Météo de la gare")

### 7. Modification possible des données <a class="anchor" id="section2_7"></a>
<div align="justify">
Un formulaire de connexion et un autre d'inscription vous permette de vous connecter et d'accèder à la page itineraire.php.
</div>
<br>

![""](readme/modification.png "Modification des données")

## Les APIs utilisées <a class="anchor" id="chapter3"></a>

### 1. OpenWeather <a class="anchor" id="section3_1"></a>
<div align="justify">
Lien vers le site de l'entreprise : <a href="https://openweathermap.org/api">OpenWeather</a>
<br><br>
Nous récupérons de cette API la météo pour un point géographique donné. Cela nous permet d'ajouter la température pour les gares cliquée.
</div>
<br>

### 2. Open Data Hauts de Seine <a class="anchor" id="section3_2"></a>
<div align="justify">
Lien vers le site de l'entreprise : <a href="https://opendata.hauts-de-seine.fr/">Open Data Hauts de Seine</a>
</div>
<br>

API utilisée pour deux choses :
- Récupérer toutes les gares afin de lister les gares et aider l'utilisateur à trouver sa destination.
- Récupérer les tracés des lignes que l'on cherche. L'API renvoie un tableau de coordonnées qu'on va utiliser pour tracer à l'aide de polyline le parcours du la ligne concernée.

### 3. Citymapper <a class="anchor" id="section3_3"></a>
<div align="justify">
Lien vers le site de l'entreprise : <a href="https://docs.external.citymapper.com/api/
">Citymapper</a>
</div>
<br>
Cette API est sans doute la plus importante de notre projet. Elle permet de nous délivrer le chemin entre deux points donnés. Nous trions ensuite les données JSON pour retirer tous trajets à vélo ou à pied. Ce sont avec ses données que nous traçons le trajet et que nous délivrons tous les détails du parcours.
</div>
<br>

## Structure du projet <a class="anchor" id="chapter4"></a>

### 1. PHP/SQL <a class="anchor" id="section4_1"></a>
<div align="justify">
à rédiger
</div>
<br>

### 2. Javascript/JQUERY <a class="anchor" id="section4_2"></a>
<div align="justify">
à rédiger
</div>
<br>

### 3. CSS <a class="anchor" id="section4_3"></a>
<div align="justify">
à rédiger
</div>
<br>

### 4. Base de données <a class="anchor" id="section4_4"></a>
<div align="justify">
à rédiger
</div>
<br>

## Architecure <a class="anchor" id="chapter5"></a>

### 1. Hébergement du projet <a class="anchor" id="section5_1"></a>
<div align="justify">
Le projet est hébergé en ligne et donc accessible avec un accès internet. 
</div>
<br>

Lien vers le site :
- https://hugopereira.fr

<div align="justify">
Nous accèdons au VPS (<i>Virtual Private Server</i>) via le protocole SSH (<i>Secure Shell</i>). De ce fait, nous avons mis en place un serveur Apache2 et cloné notre répertoire GitHub. Cela nous permet de pull notre projet de manière automotisé avec un contrab (contrab permet d'exécuter des commandes périodiquement). 
</div>
<br>

### 2. Hébergement de la base de données MySQL <a class="anchor" id="section5_2"></a>
<div align="justify">
Voici le détail de notre installation de la base de données et de son accès via PhpMyAdmin.
</div>
<br>

```bash
//Installation des packages nécessaires
apt-get install mariadb-server
mysql_secure_installation
apt-get install apache2
apt-get install php7.3 php-mysql php-xml
wget du lien de phpmyadmin
tar xvf de l’archive

//Modifier le bind :
nano /etc/mysql/mariadb.conf.d/50-server.cnf

//Paramétrage de la base
mysql -p
create database webmap;
CREATE USER ‘webmap’@‘%’ IDENTIFIED BY ‘IUT_75’;
GRANT ALL PRIVILEGES ON webmap.* TO 'webmap'@'%' WITH GRANT OPTION;
GRANT ALL PRIVILEGES ON *.* TO root@localhost IDENTIFIED BY ‘****’ with GRANT OPTION; 
GRANT ALL PRIVILEGES ON webmap.* TO webmap@localhost IDENTIFIED BY ‘IUT_75’ with GRANT OPTION; 
FLUSH Privileges

//Update des changements
systemctl restart mariadb
```

<div align="justify">
Avec l'association entre Apache2 et PhpMyAdmin, nous pouvons accèder à l'interface de PhpMyAdmin depuis n'importe quel endroit. 
</div>
<br>

Adresse de la base de données :
- http://82.165.187.129/

### 3. Nom de domaine <a class="anchor" id="section5_3"></a>
<div align="justify">
Un nom de domaine a été acheté sur IONOS pour pouvoir rendre l'accès à notre site plus simple. Il a suffit de paramétrer les champs du DNS pour pouvoir rediriger le flux vers l'adresse IP de notre serveur.
</div>
<br>

### 4. Certificat SSL <a class="anchor" id="section5_4"></a>
<div align="justify">
Nous avons généré un certificat SSL (<i>Transport Layer Security</i>) avec l'outil Certbot. Cet outil est un package que l'on peut télécharger sur Linux en spécifiant le site Apache2 à certifier. De ce fait, notre site est aussi bien accessible par le protocole HTTP et HTTPS.
</div>
<br>
