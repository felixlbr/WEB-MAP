# WEB-MAP - [Félix LIBURSKI](https://github.com/felixlbr), [Hugo PEREIRA](https://github.com/tigrou23) & François PEUCH (novembre - janvier 2023)
<div align="justify">
	Dans ce projet universitaire, nous avons utilisé des APIs pour tracer et indiquer un itinéraire en temps réel entre deux gares d'Île-de-France. Des fonctionnalités supplémentaires ont été ajoutées décrites ci dessous.</div>

## <center>Table des matières</center>
* [Prérequis pour pouvoir utiliser correctement notre site](#chapter1)
	* [Cross-origin resource sharing](#section1_1)

* [Fonctionnalités détaillées](#chapter2)
 	* [Transports disponibles](#section2_1)
 	* [Inscription & Connexion](#section2_2)
	* [Stations préférées](#section2_3)
	* [Intéraction possible avec la carte](#section2_4)
	* [Détails du trajet](#section2_5)
	* [Météo disponible sur les stations](#section2_6)
	* [Modification possible des données](#section2_7)
	* [Stations préférées](#section2_8)

* [Les APIs utilisées](#chapter3)
 	* [openweather](#section3_1)
	* [opendata](#section3_2)
	* [citymapper](#section3_3)

* [Structure du projet](#chapter4)
	* [PHP/SQL](#section4_1)
	* [Javascript/JQUERY](#section4_2)
	* [CSS](#section2_3)
	* [Base données](#section4_3)

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
Un formulaire de connexion et un autre d'inscription vous permette de vous connecter et d'accèder à la page itineraire.php.
</div>
<br>
<div align="center">
<b>⚠️ Seules les personnes connectées peuvent accéder à cette page. ⚠️</b>
</div>
<br>

### 3. Stations préférées <a class="anchor" id="section2_3"></a>
<div align="justify">
	Chaque utilisateur peut définir une station <i>home</i> et une station <i>work</i>. Ces stations seront proposées à l'utilisateur pour lui apporter une expérience personnalisée.
</div>
<br>

### 4. Intéraction possible avec la carte <a class="anchor" id="section2_4"></a>
<div align="justify">
Un formulaire de connexion et un autre d'inscription vous permette de vous connecter et d'accèder à la page itineraire.php.
</div>
<br>

### 5. Détails du trajet <a class="anchor" id="section2_5"></a>
<div align="justify">
Pour chaque trajet proposé, un détail est disponible sur une fenêtre pour apporter plus de précision sur le transport en question ainsi que les gares à emprunter.
</div>
<br>

### 6. Météo disponible sur les stations <a class="anchor" id="section2_6"></a>
<div align="justify">
Nous marquons sur la carte les gares principales (gare de départ et gare d'arrivée pour chaque transport de l'itinéraire). Lorsqu'on clique sur ces dernières, il nous est renseigné le nom ainsi que la météo correspondante.
</div>
<br>

### 7. Modification possible des données <a class="anchor" id="section2_7"></a>
<div align="justify">
Un formulaire de connexion et un autre d'inscription vous permette de vous connecter et d'accèder à la page itineraire.php.
</div>
<br>

### 8. Stations préférées <a class="anchor" id="section2_8"></a>
<div align="justify">
	Une partie <i>gestion du compte</i> a été développée pour laisser libre l'utilisateur de pouvoir changer chaque information stockée dans notre base de données.
</div>
<br>
