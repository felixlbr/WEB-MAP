const map = L.map('map').setView([48.856614, 2.3522219], 10);
const API_KEY = '4583082f2742ab2992a81c092de73c65'

var tempStation
var markers = []

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

$('input').on('change', function () {
    afficherGares(this.id)
})

function clearMap(){
    markers.forEach((item, index) => {
        map.removeLayer(item)
    })
}

function meteo (marker){
    var coord = marker.getLatLng()
    $.ajax({
        method: "GET",
        async: false,
        url: "https://api.openweathermap.org/data/2.5/weather?lat=" + coord.lat + "&lon=" + coord.lng +"&lang=fr&appid=" + API_KEY,
        success: function(result){
            JSON.stringify(result)
            tempStation = Math.round(result.main.temp - 275) //merci Eyléa
        },
        error: function (){
            tempStation = 'Météo indisponible'
        }
    })
    var content = marker.getPopup().getContent()
    marker.bindPopup(content + '<br>Température : ' + tempStation + '°C').addTo(map)
}

function afficherGares(ligne){
    clearMap()
    $.ajax({
        method: 'GET',
        async: false,
        url: "https://opendata.hauts-de-seine.fr/api/records/1.0/search/?dataset=gares-et-stations-du-reseau-ferre-dile-de-france-par-ligne&q=&rows=500&facet=mode&facet=indice_lig&refine.mode=RER&refine.indice_lig=" + ligne.toUpperCase().trim(),
        success : function(data) {
            JSON.stringify(data)
            var existe = false
            var lon, lat;
            data.records.forEach(item => {
                lat = item.fields.geo_point_2d[0]
                lon = item.fields.geo_point_2d[1]
                marker = L.marker([lat, lon])
                markers.push(marker)
                marker.bindPopup('<b>' + item.fields.nom_zdl + '</b>')
                marker.addTo(map)
            })
            if(!data.records.length) alert('La ligne ne semble pas exister')
        }
    })
    markers.forEach((item, index) => {
        item.addEventListener('click', function (){
            meteo(item)
        })
    })
}



