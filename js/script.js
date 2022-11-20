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

/** Nettoie la carte (retire les marker et les lignes)
 * */
function clearMap(){
    markers.forEach(item => {
        map.removeLayer(item)
    })
    polylines.forEach(item => {
        map.removeLayer(item)
    })
}

/** Affichage de la météo
 *  marker : le point sur la carte où l'on souhaite connaître la météo
 * */
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

/** Affichage des gare
 *  type : type de ligne (rer, metro, ter...)
 *  ligne : le numéro de la ligne (en minuscule ou majuscule pour les lettres)
 * */
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

/** Traçage des lignes
 *  x : la valeur à convertir
 * */
function deg2rad(x){
    return Math.PI*x/180;
}

/** Calcule la distance à vole d'oiseau entre deux markers sur la carte
 *  m1 : marker 1
 *  m2 : marker 2
 * */
function distance(m1, m2) {
    $earth_radius = 6378137;   // Terre = sphère de 6378km de rayon
    $rlo1 = deg2rad(m1.getLatLng().lng);    // CONVERSION
    $rla1 = deg2rad(m1.getLatLng().lat);
    $rlo2 = deg2rad(m2.getLatLng().lng);
    $rla2 = deg2rad(m2.getLatLng().lat);
    $dlo = ($rlo2 - $rlo1) / 2;
    $dla = ($rla2 - $rla1) / 2;
    $a = (Math.sin($dla) * Math.sin($dla)) + Math.cos($rla1) * Math.cos($rla2) * (Math.sin($dlo) * Math.sin($dlo
    ));
    $d = 2 * Math.atan2(Math.sqrt($a), Math.sqrt(1 - $a));
    return Math.round((($earth_radius * $d) / 1000 ) * 100) / 100 ;
}

function pointLePlusProche(m1){

}



house = L.marker([48.816673278808594, 1.9433393478393555], {icon: arret})
fifi = L.marker([48.8022643, 1.9696688], {icon: arret})

console.log(distance(house, fifi))


