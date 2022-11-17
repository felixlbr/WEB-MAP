const map = L.map('map').setView([48.856614, 2.3522219], 11);

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var testType = "rer";
var testLigne = "D";
afficherLigne(testType,testLigne);

/** Affichage des lignes
 *  type : type de ligne (rer, metro, tramway...)
 *  ligne : le numéro de la ligne (en minuscule pour les lettres)
* */
function afficherLigne(type, ligne){
    let cpt=0;
    let base = 0;
    do{
        $.ajax({
            method: 'GET',
            success : function(data){
                cpt = data.parameters.rows;
                tracerLigne(data);
            },
            url: "https://opendata.hauts-de-seine.fr/api/records/1.0/search/?dataset=traces-du-reseau-de-transport-ferre-dile-de-france&q=&facet=mode&facet=indice_lig&refine.mode="+
                type.toUpperCase() + "&refine.indice_lig=" + ligne.toUpperCase() + "&rows=100&start=" + base*100
        });
        ++ base;
    }while(cpt!==0);

}

function tracerLigne(data){
    console.log(data);
    for(let i=0; i<data.records.length;++i){
        var tab=[];
        for(let j=0; j<data.records[i].fields.geo_shape.coordinates.length;++j){
            tab.push(data.records[i].fields.geo_shape.coordinates[j].reverse());
            var path = L.polyline(tab,{color: '#' + data.records[i].fields.colourweb_hexa}).addTo(map);
        }
    }
}

/*

L.marker([48.770611, 2.052539]).addTo(map);
L.marker([47.86181124643293, 3.967288511953102]).addTo(map);
L.marker([47.86065107913394,3.970237356926179]).addTo(map);
var latlngs = [
    [[48.770611, 2.052539], [48.770611, 3.052539]],
    [[48.870611, 2.152539], [48.870611, 3.152539]]
];
var polyline = L.polyline(latlngs,{color:'red'}).addTo(map);
map.fitBounds(polyline.getBounds());

*/

/*
const marker = L.marker([48.84169080236788, 2.2686434551720724]).addTo(map)
.bindPopup('<b>IUT de Paris</b><br />Anciennement Descartes').openPopup();

function onClick(e) {
var longitude = e.latlng.lng;
var latitude = e.latlng.lat;
console.log(longitude, latitude)
}
map.on('click', onClick);
*/

//    url: "https://ressources.data.sncf.com/api/records/1.0/search/?dataset=referentiel-gares-voyageurs&q=&rows=1000&sort=-segmentdrg_libelle&facet=departement_numero&refine.departement_numero=75",

// data.records[i].fields.rg_libelle.includes('LIGNE C') &&

// data.records[i].fields.departement_numero == 75

/*
// pour récupérer les coordonnées d'une gare
$.ajax({
    method: 'GET',
    url: "https://ressources.data.sncf.com/api/records/1.0/search/?dataset=referentiel-gares-voyageurs&q=&rows=10000&sort=gare_alias_libelle_noncontraint",
    success : function(data){
        JSON.stringify(data)
        var lon, lat, compteur
        compteur = 0
        //pas de co donc tester à la maison
        for (let i = 0; i < data.records.length; i++) {
            //if(data.records[i].fields.departement_numero == 75){
            if (data.records[i].fields.latitude_entreeprincipale_wgs84 && data.records[i].fields.longitude_entreeprincipale_wgs84 && data.records[i].fields.rg_libelle){
                if (data.records[i].fields.rg_libelle.includes('LIGNE C')){
                    lat = data.records[i].fields.latitude_entreeprincipale_wgs84
                    lon = data.records[i].fields.longitude_entreeprincipale_wgs84
                    L.marker([lat, lon]).addTo(map).bindPopup('<b>' + data.records[i].fields.gare_alias_libelle_noncontraint + '</b><br/>' + 'Capacité :' + ' '+ data.records[i].fields.rg_libelle).openPopup();
                    compteur++
                }
            }
        }
        console.log(compteur)
    }
});


//pour récupérer les gares de la ligne
var tab = []
$.ajax({
    method: 'GET',
    url: "https://ressources.data.sncf.com/api/records/1.0/search/?dataset=sncf-lignes-par-gares-idf&q=&rows=500&facet=rer&facet=a&facet=b&facet=c&facet=d&facet=e",
    success : function(data){
        JSON.stringify(data)
        for (let i = 0; i < data.records.length; i++) {
            //if(data.records[i].fields.departement_numero == 75){
            if (data.records[i].fields.c){
                tab.push(data.records[i].fields.libelle_point_arret)
            }
        }
    }
});
*/
