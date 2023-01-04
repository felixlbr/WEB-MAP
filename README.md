# WEB-MAP - [Félix LIBURSKI](https://github.com/felixlbr) & [Hugo PEREIRA](https://github.com/tigrou23) & François PEUCH (novembre - janvier 2023)
<div align="justify">Voici mon troisième projet de programmation mais mon premier en Java. La développement orienté objet est très différent de de l'approche en C ou C++ mais 'adaptation à ce langage n'a pas été difficile. Nous sommes très satisfait de notre projet puisqu'il a passé tous les tests et que nous avons un jeu auquel nous pouvons jouer.</div>

## <center>Table of Contents </center>

* [Introduction](#chapter1)
* [Structure du programme](#chapter2)
	* [La classe Carte](#section2_1)
	* [La classe Paquet](#section2_2)
	* [La classe Player](#section2_3)
	* [La classe Plateau](#section2_4)
	* [La classe Game](#section2_5)
* [Tests unitaires](#chapter3)
* [Bilan du projet](#chapter4)

## Introduction <a class="anchor" id="chapter1"></a>
<div align="justify">Le projet consiste à reproduire le jeu du 6 qui prend tout en l’adaptant
aux attentes du sujet. Notre programme est développé en langage JAVA. Nous avons utilisé l’IDE Eclipse pour développer ce programme. Ce dernier est encodé en ISO-8859-1 et les retours à la ligne sont ceux de Windows. Un package (util) nous a été distribué avec le sujet qui contient deux classes JAVA. Ces classes nous serviront à faire Pause et ClearScreen quand notre application sera exécutée. Ces deux méthodes servent à attendre une entrée clavier pour poursuivre le jeu et à effacer la console où le jeu est lancé.</div>
<div align="justify">Notre programme est capable de traiter une manche complète d’une partie du 6 qui prend. C’est à dire de la distribution des cartes à la dernière carte posée sur le plateau avec l’affichage des scores. Pour exécuter notre programme, il suffit de rentrer le nom des joueurs dans un fichier texte nommé de cette manière : config.txt.</div>
<div align="justify">Pour veiller au bon déroulé de ce projet, nous avons utilisé le logiciel GIT qui est un logiciel de gestion de versions. En effet, ce logiciel s'est avéré très utile lors de ce projet collaboratif plutôt long. Cela nous a permis, entre autres, de pouvoir faire des modifications simultanées, c'est-à-dire une possibilité de fusionner intelligemment notre travail. De plus, l'avantage de cette méthode est d'avoir le pouvoir de garder en mémoire toutes les anciennes versions (historique) mais aussi de savoir QUI a modifié QUOI et QUAND.</div>
<div align="justify">De plus, notre organisation a été complétée par l'utilisation de Discord pour échanger des messages, des fichiers ou même programmer des réunions hebdomadaires. Enfin nous avons utilisé Trello, qui sert à planifier des tâches
dans le temps. Le respect de ces deadlines a été primordial pour une avancée satisfaisante au cours du temps.</div>
<div align="justify">Enfin, l’extension SonarLint de notre IDE Eclipse nous a permis de corriger certaines incohérences dans notre code, comme des déclarations de variables qui se sont avérées être inutiles ou encore de nous mettre en garde
sur le fait que notre méthode Main était trop longue. Cette extension nous a donc permis d’optimiser certaines parties du code qui nous semblaient déjà optimisées (manque d’expériences).</div>

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
