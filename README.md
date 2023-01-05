# WEB-MAP - [Félix LIBURSKI](https://github.com/felixlbr), [Hugo PEREIRA](https://github.com/tigrou23) & François PEUCH (novembre - janvier 2023)
<div align="justify">
	Dans ce projet universitaire, nous avons utilisé des APIs pour tracer et indiquer un itinéraire en temps réel entre deux gares d'Île-de-France.</div>

## <center>Table des matières</center>
* [Prérequis pour pouvoir utiliser correctement notre site](#chapter1)
	* [Cross-origin resource sharing](#section1_1)

* [Fonctionnalités détaillées](#chapter2)
 	* [Transports disponibles](#section2_1)
 	* [Création du compte et connexion](#section2_2)
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
<div align="justify">
	Les trajets proposés par WEB-MAP concernent :
		- Train 🚅
		- RER 🚈
		- Métro 🚇
		- Tramway 🚃
		- Bus 🚎
	Afin de simplifier l'identification de chaque ligne, elles sont identifiables (sur la carte et dans le détail des itinéraires) par leurs propres couleurs (ex: jaune pour la ligne 1 du métro).
</div>


## Structure du programme <a class="anchor" id="chapter2"></a>
Nous avons construit notre jeu à partir de 4 classes. Les classes : <strong>Plateau, Paquet, Carte, Player et Game.</strong>
<center>Chaque classe symbolise un objet essentiel du jeu :</center>

### 1. La classe Carte <a class="anchor" id="section2_1"></a>
<div align="justify">La classe Carte définit une carte, avec son numéro et son nombre de tête(s) de boeufs.</div>

### 2. La classe Paquet <a class="anchor" id="section2_2"></a>
<div align="justify">La classe Paquet définit le paquet de cartes de la partie en cours. Elle est définie par une ArrayList de Carte appelé “paquet” et d’un compteur du nombre de cartes restantes dans le paquet. Cette classe est composée et utilise donc la classe Carte. Il y a au maximum 104 cartes et au minimum 4 cartes dans le paquet de la classe Paquet.</div>

### 3. La classe Player <a class="anchor" id="section2_3"></a>
<div align="justify">La classe Player définit le joueur. Elle est définie par un nom, un nombre de pénalités, le numéro de la carte jouée et sa main. La main est l’ensemble de cartes que possède le joueur. Elle est définie par une ArrayList de Carte appelée “hand”. Le joueur commence la partie avec 10 cartes et la partie s’arrête lorsque les joueurs n’ont plus de carte. La
main du joueur est ainsi composée d’au maximum 10 cartes (début de partie) et au minimum 0 carte (fin de la partie). La classe Player est donc composée de variables de la classe Carte.</div>

### 4. La classe Plateau <a class="anchor" id="section2_4"></a>
<div align="justify">La classe Plateau définit le plateau d’une partie. Elle est définie par un double tableau de Carte appelé “plateau”. On utilise un tableau de taille fixe car le nombre de cases lors d’une partie est relativement stable et
faible. Le nombre de séries est toujours de 4 et dans chaque série, il y a entre 1 et 5 cartes. La classe Plateau est donc composé et utilise aussi la classe Carte.<div>

### 5. La classe Game <a class="anchor" id="section2_5"></a>
<div align="justify">La classe Game définit la partie en cours. Elle est composée de tous les paramètres d’une partie. Elle est composée d’un paquet, de type Paquet, d’un plateau, de type Plateau, d’une ArrayList Joueur “listeJoueur” qui représente la liste de joueurs, d’un tableau d’entiers pour contenir toutes les cartes posées d’un tour, d’une ArrayList Joueur qui représente tous les joueurs qui ont ramassé des têtes de boeufs et d’une ArrayList Integer qui représente tous les numéros de cartes ramassées. Cette classe est donc composée des classes Plateau, Paquet, Carte et Player.</div>

<div align="justify">Toutes ces classes se trouvent dans le paquetage “game”. Le paquetage “appli” a une seule classe : Application. Celle-ci permet d’exécuter le programme selon les contraintes du sujet. Elle utilise ainsi la classe Game. Pour adapter le 6 qui prend, par exemple pour qu’il se déroule sur plusieurs manches, il suffira principalement de modifier la classe Application. Le paquetage “util” contient les méthodes “pause” et “clearScreen” pour mettre en pause la console et effacer l’écran.</div>

## Tests unitaires <a class="anchor" id="chapter3"></a>
<div align="justify">La dernière étape, après avoir construit chaque classe, est la conception des tests unitaires. Après la construction d’une classe, nous avons fait sa classe test correspondante. Et à chaque ajout de méthode nous avons ajouté à la classe test correspondante, le test de la méthode. Ainsi, tout au long de la réalisation du projet, on a pu s’assurer que nos méthodes fonctionnaient et ainsi détecter rapidement certains bugs. </div>

## Bilan du projet<a class="anchor" id="chapter4">
<div align="justify">Les principales difficultés que nous avons rencontrées ont été dans la répartition des tâches car le développement objet est nouveau pour nous deux. Cela nous a obligé à bien décortiquer l’ensemble de la structure de notre
programme pour pouvoir anticiper un maximum de problèmes. Nous n’avons pas réussi à partager le travail comme nous aurions aimé. En effet, Hugo s’est principalement chargé de la structure du projet (classes, constructeurs, attributs…) et Félix plutôt du déroulement de la partie (méthodes) et donc de l’algorithmie. Cependant, nous trouvons que nos compétences s’équilibrent et se compensent bien. Notre communication a été un réel atout. Nous avons trouvé les règles de ce jeux assez claires, cela nous a permis de finir assez vite ce projet.</div>
