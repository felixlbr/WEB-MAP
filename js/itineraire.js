let gare_depart = "gare_depart";
let mode = "mode";
let libelle = "libelle";
let temps = "temps";
let nb_arrets = "nb_arrets";
let gare_arrivee = "gare_arrivee";

const itineraire =
'    <div class="wrapper"> \
        <div class="one"> \
          <div class="rectangle"><div class="rond1"></div><div class="rond2"></div></div> \
        </div> \
        <div class="two"> \
          <h3>' + gare_depart+ '</h3> \
        </div> \
        <div class="three"> \
          <h4>' + mode + ' ' + libelle + '</h4> \
          <p>' + temps + '</p> \
          <h4>' + nb_arrets + ' arrêts</h4> \
        </div> \
        <div class="four"> \
          <h3>' + gare_arrivee+ '</h3> \
        </div> \
    </div> \
'

document.getElementById("scrollable").innerHTML += itineraire;