/*--------------------------*/

const map = L.map('map').setView([48.86337661743164, 2.4466350078582764], 11);
const API_KEY = '4583082f2742ab2992a81c092de73c65'
var tempStation
var markers = []
var polylines = []
var loader = document.querySelector('.loader')
const MAX_GARES = 2000
var villes = []

var arret = L.icon({
    iconUrl: 'img/arret3.png',
    iconSize:     [10, 10], // size of the icon
    iconAnchor:   [5, 5], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

/*--------------------------*/

//Pour tester de porte de mairie de velizy (tram) à porte de vanves (metro)
const start = '48.7804063%2C2.191446';
const end = '48.827676%2C2.3054796';

//Pour tester de chez Eyléa à mon travail
const start1 = '48.8022643%2C1.9696688';
const end1 = '48.8780555%2C2.286804';

//Pour tester de rives gauche à rive droite
const start2 = '48.8002576%2C2.129185';
const end2 = '48.80952835083008%2C2.1350862979888916';

//Pour tester de porte de versailles (tram) à l'IUT
var start3 = '48.8324338%2C2.2879537'
var end3= '48.84297561645508%2C2.269261121749878'

//Pour tester entre deux points impossibles (bug d'API)
var start4 = '48.862725%2C2.287592'
var end4 = '44.8879431%2C1.2161321'

/*--------------------------*/

/**
 * Nettoie la carte (retire les marker et les lignes)
 */
function clearMap(){
    markers.forEach(item => {
        map.removeLayer(item)
    })
    polylines.forEach(item => {
        map.removeLayer(item)
    })
}

/**
 * Affiche la météo sur un marker
 * @param marker Le marker à modifier
 */
function meteo (marker){
    var coord = marker.getLatLng()
    $.ajax({
        method: "GET",
        async: false,
        url: "https://api.openweathermap.org/data/2.5/weather?lat=" + coord.lat + "&lon=" + coord.lng +"&lang=fr&appid=" + API_KEY,
        success: function(result){
            if(!marker.getPopup().getContent().includes("Température")){
                JSON.stringify(result)
                tempStation = Math.round(result.main.temp - 275) //merci Eyléa
                var content = marker.getPopup().getContent()
                marker.bindPopup(content + '<br>Température : ' + tempStation + '°C').addTo(map)
            }
        }
    })
}

/**
 * Affiche une ligne
 * @param type type de la ligne (RER, TRAIN...)
 * @param ligne la ligne en question (C, N...)
 */
function afficherLigne(type, ligne, couleur){
    let cpt=0;
    let base = 0;
    do{
        $.ajax({
            method: 'GET',
            url: "https://opendata.hauts-de-seine.fr/api/records/1.0/search/?dataset=traces-du-reseau-de-transport-ferre-dile-de-france&q=&facet=mode&facet=indice_lig&refine.mode="+ type.toUpperCase().trim() + "&refine.indice_lig=" + ligne.toUpperCase().trim() + "&rows=100&start=" + base*100,
            success : function(data){
                cpt = data.parameters.rows;
                tracerLigne(data, couleur);
            },
        });
        ++ base;
    }while(cpt!==0);
}

/**
 * Trace une ligne sur la carte
 * @param data la donnée JSON récupérée de l'API
 */
function tracerLigne(data, couleur){
    var path
    for(let i=0; i<data.records.length;++i){
        var tab=[];
        for(let j=0; j<data.records[i].fields.geo_shape.coordinates.length;++j){
            tab.push(data.records[i].fields.geo_shape.coordinates[j].reverse());
            path = L.polyline(tab,{color: couleur, weight: 7}).addTo(map);
            polylines.push(path)
        }
    }
}

/**
 * Place un marker sur la carte avec son nom et la météo
 * @param lat latitude du point
 * @param lon longitude du point
 * @param nom nom du lieu
 */
function placerPoint(lat, lon, nom){
    marker = L.marker([lat, lon], {icon: arret})
    markers.push(marker)
    marker.bindPopup('<b>' + nom + '</b>')
    meteo(marker)
}

/**
 * Trace le trajet entre deux points
 * @param start coordonnées du départ du trajet
 * @param end coordonnées de l'arrivée du trajet
 */
function tracerTrajet(start, end){
    loader.style.display = 'block'
    $.ajax({
        method: "GET",
        url: "https://api.external.citymapper.com/api/1/directions/transit?Citymapper-Partner-Key=TW0S3Zfv5e6H5wdq4YIkBBFAs4tX3Zva&start=" + start + "&end=" + end + "&traveltime_types=transit",
        async: true,
        success: function(data) {
            console.log(data)
            var route = 0
            var couleur = '#FFF'
            var nomLigne, mode, libelle
            var noms = [2]
            for (let i = 0; i < data.routes[route].legs.length; i++) {
                //Pour ne pas traiter les trajets à pied
                if (data.routes[route].legs[i].travel_mode == 'transit') {
                    couleur = data.routes[route].legs[i].services[0].color
                    if (data.routes[route].legs[i].vehicle_types[0] == 'rail') {
                        nomLigne = data.routes[route].legs[i].services[0].name.split(' ')
                        if (nomLigne[0] == 'RER'){
                            afficherLigne('RER', nomLigne[1], couleur)
                            libelle = nomLigne[1]
                            mode = 'RER '
                            noms = placerArrets(data, route, i)
                        }
                        else {
                            afficherLigne('TRAIN', nomLigne[0], couleur)
                            libelle = nomLigne[0]
                            mode = 'Train '
                            noms = placerArrets(data, route, i)
                        }
                    }
                    else if (data.routes[route].legs[i].vehicle_types[0] == 'metro'){
                        var nomLigne = data.routes[route].legs[i].services[0].name
                        if(nomLigne.length == 2){
                            afficherLigne('METRO', nomLigne.charAt(1), couleur)
                            mode = 'Metro '
                            libelle = nomLigne.charAt(1)
                            noms = placerArrets(data, route, i)
                        }
                        else{
                            afficherLigne('METRO', nomLigne.charAt(1) + nomLigne.charAt(2), couleur)
                            mode = 'Metro '
                            libelle = nomLigne.charAt(1) + nomLigne.charAt(2)
                            noms = placerArrets(data, route, i)
                        }
                    }
                    else if (data.routes[route].legs[i].vehicle_types[0] == 'tram'){
                        var nomLigne = data.routes[route].legs[i].services[0].name
                        afficherLigne('TRAMWAY', nomLigne.charAt(1) + nomLigne.charAt(2), couleur)
                        libelle = nomLigne
                        mode = 'Tramway '
                        noms = placerArrets(data, route, i)
                    }
                    else if (data.routes[route].legs[i].vehicle_types[0] == 'bus'){
                        var nomLigne = data.routes[route].legs[i].services[0].name
                        libelle = nomLigne
                        mode = 'Bus '
                        noms = placerArrets(data, route, i, couleur)
                    }
                    remplir(noms[1], mode, noms[2], libelle, couleur)
                }
            }
            loader.style.display = 'none'
        },
        error: function(){
            alert('Aucun trajet trouvé entre les deux points. Il est peut-être trop tard où les deux points ne sont pas joignables en transport')
        }
    })
}

/**
 * Place arrêts d'une ligne (station de départ et d'arrivée) + trace le parcours d'un bus
 * @param data la donnée JSON récupérée de l'API
 * @param route la route choisie (0, 1, 2 ou 3)
 * @param i l'étape du trajet sur laquelle on veut les arrêts
 * @param couleur couleur de la ligne (pour le tracé du bus)
 */
function placerArrets(data, route, i, couleur){
    nbArrets = data.routes[route].legs[i].stops.length
    var departLat = data.routes[route].legs[i].stops[0].coordinates.lat
    var departLon = data.routes[route].legs[i].stops[0].coordinates.lon
    var arriveeLat = data.routes[route].legs[i].stops[nbArrets - 1].coordinates.lat
    var arriveeLon = data.routes[route].legs[i].stops[nbArrets - 1].coordinates.lon
    var departNom = data.routes[route].legs[i].stops[0].name
    var arriveeNom = data.routes[route].legs[i].stops[nbArrets - 1].name
    placerPoint(departLat, departLon, departNom)
    placerPoint(arriveeLat, arriveeLon, arriveeNom)
    if(data.routes[route].legs[i].vehicle_types[0] == 'bus'){
        var bus = []
        for (let j = 0; j < nbArrets; j++) {
            var lat = data.routes[route].legs[i].stops[j].coordinates.lat
            var lng = data.routes[route].legs[i].stops[j].coordinates.lon
            bus.push([lat, lng])
        }
        var polyline = L.polyline(bus,{color: couleur, weight: 7}).addTo(map);
        polylines.push(polyline)
    }
    var noms = [2]
    noms.push(departNom)
    noms.push(arriveeNom)
    return noms
}

/**
 * compare deux gares (alphabétiquement par le nom)
 * @param a gare a
 * @param b gare b
 * @returns {number}
 */
function compare(a, b){
    if(a.fields.nom_zdl < b.fields.nom_zdl) return -1
    else if(a.fields.nom_zdl > b.fields.nom_zdl) return 1
    return 0
}

/**
 * Récupère toutes les gares pour les afficher dans les inputs pour choisir la gare de départ et celle d'arrivée
 */
function getGare(){
    loader.style.display = 'block'
    $.ajax({
        method: "GET",
        url: "https://opendata.hauts-de-seine.fr/api/records/1.0/search/?dataset=gares-et-stations-du-reseau-ferre-dile-de-france-par-ligne&q=&rows=" + MAX_GARES + "&facet=id_ref_lda&facet=idrefliga",
        async: true,
        success: function(data) {
            console.log(data)
            for (let i = 0; i < data.records.length; i++) {
                villes.push(data.records[i])
            }
            villes.sort(compare)
            for (let i = 0; i < villes.length - 1; i++) {
                if(compare(villes[i], villes[i+1]) == 0){
                    delete villes[i]
                }
            }
            villes.forEach((item, index) => {
                $('#list-gare-depart').append("<option value='" + villes[index].fields.nom_zdl + "'>")
                $('#list-gare-arrivee').append("<option value='" + villes[index].fields.nom_zdl + "'>")
            })
            loader.style.display = 'none'
        },
        error: function(){
            alert('Aucune gare trouvée')
        }
    })
}