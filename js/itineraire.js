window.onload = function(){
    getGare()
}

let rotation = 0


$('#valider').click(function () {
    $('#connexion').hide()
    $('#itineraire').show()
    let index = getIndex($('#departChoix').val())
    let coordonneesDepart = villes[index].fields.geo_point_2d
    index = getIndex($('#arriveeChoix').val())
    let coordonneesArrivee = villes[index].fields.geo_point_2d
    tracerTrajet(coordonneesDepart, coordonneesArrivee)
})

$('#retour').click(function () {
    $('#connexion').show()
    $('#itineraire').hide()
    $('.loader').hide()
    clearMap()
    document.getElementById("scrollable").innerHTML = ''
})

$('#swipe').click(function(){
    tmp = $('#departChoix').val()
    $('#departChoix').val($('#arriveeChoix').val())
    $('#arriveeChoix').val(tmp)
    rotation += 180;
    $(this).css('transform', 'rotateY(' + rotation + 'deg)');
})

/**
 * Ajout dynamique du récapitulatif du trajet (div à droite quand le trajet est affiché)
 * @param gare_depart explicite
 * @param mode type de la ligne (RER pour le RER C)
 * @param gare_arrivee explicite
 * @param libelle nom de la ligne (C pour le RER C)
 * @param couleur couleur de la ligne
 * @param temps pas encore en place
 * @param nb_arrets pas encore en place
 */
function remplir(gare_depart, mode, gare_arrivee, libelle, couleur,temps, nb_arrets,) {
    document.getElementById("scrollable").innerHTML += `    \
    <div class="wrapper"> \
        <div class="one"> \
            <div class="rectangle" style="background-color: ${couleur}"><div class="rond1"></div><div class="rond2"></div></div> \
        </div> \
        <div class="two"> \
            <h3>${gare_depart}</h3> \
        </div> \
        <div class="three"> \
          <h4>${mode} ${libelle} </h4> \
          <!--<p>' + temps + '</p> -->\
          <!--<h4>' + nb_arrets + ' arrêts</h4> \--> \
        </div> \
        <div class="four"> \
          <h3>${gare_arrivee}</h3> \
        </div> \
    </div> \
    `
}

/**
 * Récupère l'index de la gare avec le nom pour pouvoir utiliser l'objet de cette gare
 * @param valeur le nom de la gare à comparer
 * @returns {number} l'index
 */
function getIndex(valeur){
    let retour = 0
    villes.forEach((item, index) => {
        if(villes[index].fields.nom_zdl == valeur)
            retour = index
    })
    return retour
}