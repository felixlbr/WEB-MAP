const map = L.map('map').setView([48.856614, 2.3522219], 11);
const API_KEY = '4583082f2742ab2992a81c092de73c65'
var tempStation
var markers = []
var polylines = []
var loader = document.querySelector('.loader')
var arret = L.icon({
    iconUrl: './../img/arret3.png',
    iconSize:     [10, 10], // size of the icon
    iconAnchor:   [5, 5], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});
const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

$("input[type='radio']").on('click change', function () {
    loader.style.display = 'block'
    var type = $(this).parent().attr("id").split(' ')
    afficherGares(type[0], $(this).attr("id"))
    afficherLigne(type[0], $(this).attr("id"))
})

$('.liste-type input').on('click change', function () {
    $.each($('.liste-type input'),function(){
        if ($(this).is(':checked'))
            $('.ligne-' + $(this).attr("id")).show()
        else
            $('.ligne-' + $(this).attr("id")).hide()
    });
})

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
            loader.style.display = 'none'
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
 * Affiche les gares d'une ligne donnée
 * @param type type de la ligne (RER, TRAIN...)
 * @param ligne la ligne en question (C, N...)
 */
function afficherGares(type, ligne){
    clearMap()
    $.ajax({
        method: 'GET',
        async: false,
        url: "https://opendata.hauts-de-seine.fr/api/records/1.0/search/?dataset=gares-et-stations-du-reseau-ferre-dile-de-france-par-ligne&q=&rows=500&facet=mode&facet=indice_lig&refine.mode=" + type.toUpperCase().trim() +"&refine.indice_lig=" + ligne.toUpperCase().trim(),
        success : function(data) {
            JSON.stringify(data)
            var existe = false
            var lon, lat;
            data.records.forEach(item => {
                lat = item.fields.geo_point_2d[0]
                lon = item.fields.geo_point_2d[1]
                marker = L.marker([lat, lon], {icon: arret})
                markers.push(marker)
                marker.bindPopup('<b>' + item.fields.nom_zdl + '</b>')
                marker.addTo(map)
            })
            if(!data.records.length) alert('La ligne ne semble pas exister')
        }
    })
    markers.forEach((item, index) => {
        item.addEventListener('click', function (){
            loader.style.display = 'block'
            meteo(item)
            console.log(item.getLatLng().lat, item.getLatLng().lng)
        })
    })
}

/** Affichage des lignes
 *  type : type de ligne (rer, metro, ter...)
 *  ligne : le numéro de la ligne (en minuscule ou majuscule pour les lettres)
 * */
function afficherLigne(type, ligne){
    let cpt=0;
    let base = 0;
    do{
        $.ajax({
            method: 'GET',
            url: "https://opendata.hauts-de-seine.fr/api/records/1.0/search/?dataset=traces-du-reseau-de-transport-ferre-dile-de-france&q=&facet=mode&facet=indice_lig&refine.mode="+ type.toUpperCase().trim() + "&refine.indice_lig=" + ligne.toUpperCase().trim() + "&rows=100&start=" + base*100,
            success : function(data){
                loader.style.display = 'none'
                cpt = data.parameters.rows;
                tracerLigne(data);
            },
        });
        ++ base;
    }while(cpt!==0);
}

/** Traçage des lignes
 *  data : résultat de l'API
 * */
function tracerLigne(data){
    var path
    for(let i=0; i<data.records.length;++i){
        var tab=[];
        for(let j=0; j<data.records[i].fields.geo_shape.coordinates.length;++j){
            tab.push(data.records[i].fields.geo_shape.coordinates[j].reverse());
            path = L.polyline(tab,{color: '#' + data.records[i].fields.colourweb_hexa, weight: 7}).addTo(map);
            polylines.push(path)
        }
    }
}

function placerPoint(lat, lon, nom){
    marker = L.marker([lat, lon], {icon: arret})
    markers.push(marker)
    marker.bindPopup('<b>' + nom + '</b>')
    meteo(marker)
}



function tracerTrajet(start, end){
    $.ajax({
        method: "GET",
        url: "https://api.external.citymapper.com/api/1/directions/transit?Citymapper-Partner-Key=TW0S3Zfv5e6H5wdq4YIkBBFAs4tX3Zva&start=" + start + "&end=" + end + "&traveltime_types=transit",
        success: function(data) {
            console.log(data)
            var route = 0
            var couleur = '#FFF'
            var nomLigne
            for (let i = 0; i < data.routes[route].legs.length; i++) {
                //Pour ne pas traiter les trajets à pied
                if (data.routes[route].legs[i].travel_mode == 'transit') {
                    if (data.routes[route].legs[i].vehicle_types[0] == 'rail') {
                        nomLigne = data.routes[route].legs[i].services[0].name.split(' ')
                        if (nomLigne[0] == 'RER') afficherLigne('RER', nomLigne[1])
                        else afficherLigne('TRAIN', nomLigne[0])
                        placerArrets(data, route, i)
                    }
                    else if (data.routes[route].legs[i].vehicle_types[0] == 'metro'){
                        var nomLigne = data.routes[route].legs[i].services[0].name
                        if(nomLigne.length == 2) afficherLigne('METRO', nomLigne.charAt(1))
                        else afficherLigne('METRO', nomLigne.charAt(1) + nomLigne.charAt(2))
                        placerArrets(data, route, i)
                    }
                    else if (data.routes[route].legs[i].vehicle_types[0] == 'bus'){
                        couleur = data.routes[route].legs[i].services[0].color
                        placerArrets(data, route, i, couleur)
                    }
                }
            }
        }
    })
}

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
        L.polyline(bus,{color: couleur, weight: 7}).addTo(map);
    }
}

var start = '48.8022643%2C1.9696688'
var end = '48.8780555%2C2.286804'
tracerTrajet(start, end)