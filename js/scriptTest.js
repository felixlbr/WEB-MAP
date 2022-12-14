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
    iconUrl: '../img/arret3.png',
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
            console.log("api citymapper");
            console.log(data);
            placerPoint(48.798922, 2.072964, "citymapper")
            var route = 0
            var couleur = '#FFF'
            var nomLigne, mode, libelle
            var noms = [2]
            for (let i = 0; i < data.routes[route].legs.length; i++) {
                //Pour ne pas traiter les trajets à pied
                if (data.routes[route].legs[i].travel_mode == 'transit') {
                    couleur = data.routes[route].legs[i].services[0].color
                    if (data.routes[route].legs[i].vehicle_types[0] == 'rail') {

                        //ajout
                        //getGareChemin(data.routes[route].legs[i].stops);

                        nomLigne = data.routes[route].legs[i].services[0].name.split(' ')
                        if (nomLigne[0] == 'RER'){
                            tracerItineraire(data.routes[route].legs[i].stops, 'RER', nomLigne[1], couleur)
                            //afficherLigne('RER', nomLigne[1], couleur)
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
    console.log(departLon,departLat);
    console.log(arriveeLon,arriveeLat);
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
            console.log("liste des gares")
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

function tracerItineraire(chemin, type, ligne, couleur){
    let cheminCityMapper=[]
    console.log("chemin")
    console.log(chemin)
    cheminCityMapper.push([chemin[0].coordinates["lat"],chemin[0].coordinates["lon"]]);
    cheminCityMapper.push([chemin[chemin.length-1].coordinates["lat"],chemin[chemin.length-1].coordinates["lon"]]);

    console.log("cheminCityMapper");
    console.log(cheminCityMapper);

    let cheminApi = [];
    cheminCityMapper.forEach(item => {
            let temp=[];
            temp = gareDuTrace(item[0], item[1], 100, type, ligne, couleur);
            console.log("temp")
            console.log(temp)
            temp.forEach(obj => {
                if(!existIn(cheminApi,obj)){
                    cheminApi.push(obj);
                }
            })
        }
    )
    console.log("cheminApi");
    console.log(cheminApi);
    chemin = correspondance(cheminCityMapper, cheminApi);
    console.log("chemin")
    console.log(chemin)
    cheminCityMapper=[];
    for(let i=0; i<chemin.length;++i){
        cheminCityMapper.push(chemin[i][0])
        cheminCityMapper.push(chemin[i][1])
    }


    tracer(cheminApi, cheminCityMapper, "red")

    //path = L.polyline(cheminCityMapper,{color: couleur, weight: 7}).addTo(map);
    //polylines.push(path)
}
function gareDuTrace(lat, lon, dist, type, ligne, couleur){
    console.log("lat, lon, ligne")
    console.log(lat, lon, ligne)
    let retour=[];
    $.ajax({
        method: 'GET',
        url: "https://opendata.hauts-de-seine.fr/api/records/1.0/search/?dataset=traces-du-reseau-de-transport-ferre-dile-de-france&q=&facet=mode&facet=indice_lig&refine.mode="+ type.toUpperCase().trim() + "&refine.indice_lig=" + ligne.toUpperCase().trim() + "&rows=100&geofilter.distance="+lat+"%2C"+lon+"%2C"+dist,
        async : false,
        success : function(data){
            console.log("data")
            console.log(data)
            /*
            data.records.forEach(tab=>{
                tab.fields.geo_shape.coordinates.forEach(item=>{
                    retour.push(item);
                })
            }) */
            tracerLigne(data, couleur);
        },
    });
    return retour;
}

function tracer(data, limite, couleur){
    console.log('tracer ligne');
    console.log(data);
    console.log('limite');
    console.log(limite);

    let path;
    let tab=[];
    data.forEach(item=>{
        if(!(limite.includes(item[0]))){
            tab.push(item.reverse());
        }
    })
    console.log('tab');
    console.log(tab);
    path = L.polyline(tab,{color: couleur, weight: 7}).addTo(map);
    polylines.push(path)

    placerPoint(48.79869339775063, 2.071695582347995,"26")
    placerPoint(48.798648487350235, 2.071332370669917, "06")
    placerPoint(48.7985763346182, 2.070856322002004, "06")
    placerPoint(48.79839604796968, 2.069903062061266, "06")
    placerPoint(48.7969749777182, 2.064173185834679, "06")
placerPoint(48.78978630802902, 2.049383771745725,"")
placerPoint(48.790706871733605, 2.051178973182095,"")
placerPoint(48.791620233334456, 2.052959877315797,"")
placerPoint(48.792256336388725, 2.054245460494912,"")
placerPoint(48.79448970998739, 2.058741619891684,"")
placerPoint(48.78844003754234, 2.046741304126304,"")
placerPoint(48.838364048935155, 2.269785380384059,"der")
placerPoint(48.840763633065954, 2.27158330340678,"")
placerPoint(48.840623192923886, 2.271478953749893,"")
placerPoint(48.840506563995305, 2.271407014557939,"")
placerPoint(48.840366139227086, 2.271331500660505,"")
placerPoint(48.84021143316011, 2.271245194079831,"")
placerPoint(48.840004366914776, 2.271133725710957,"")
placerPoint(48.839763981094116, 2.271007882496791,"")
placerPoint(48.83936188363635, 2.270707708565289,"")
placerPoint(2.044851105628235, 48.7875034954854,"")
}
function existIn(list, obj){
    let bool = false;
    list.forEach(item=>{
        if(obj[0]===item[0] && obj[1]===item[1]){
            bool = true;
        }
    })
    return bool;
}


function correspondance(liste1, liste2){
    let min=0.;
    let correspondance=[];
    liste1.forEach(item1 => {
        min = [0,0];
        liste2.forEach(item2 => {
            nb1=Math.abs((min[0]+min[1])-(item1[1]+item1[0]));
            nb2=Math.abs((item2[0]+item2[1])-(item1[1]+item1[0]));
            if(nb1>nb2){
                min = item2;
            }
        });
        correspondance.push(min);
    })
    return correspondance;
}

/**
 * Trace une ligne sur la carte
 * @param data la donnée JSON récupérée de l'API
 */
function tracerLigne(data, couleur){
    console.log('tracer ligne');
    console.log(data);
    var path;
    for(let i=0; i<data.records.length;++i){
        var tab=[];
        for(let j=0; j<data.records[i].fields.geo_shape.coordinates.length;++j){
            tab.push(data.records[i].fields.geo_shape.coordinates[j].reverse());
            path = L.polyline(tab,{color: couleur, weight: 7}).addTo(map);
            polylines.push(path)
        }
    }
    placerPoint(48.78739023737062, 2.269785380384059,"26")
    placerPoint(48.78739023737062, 2.069785380384059, "06")
}
function gareDuTrace1(lat, lon, dist, type, ligne, couleur){
    let retour=[];
    $.ajax({
        method: 'GET',
        url: "https://opendata.hauts-de-seine.fr/api/records/1.0/search/?dataset=traces-du-reseau-de-transport-ferre-dile-de-france&q=&facet=mode&facet=indice_lig&refine.mode="+ type.toUpperCase().trim() + "&refine.indice_lig=" + ligne.toUpperCase().trim() + "&rows=100&geofilter.distance="+lat+"%2C"+lon+"%2C"+dist,
        async : false,
        success : function(data){
            retour=new Map();
            retour["gare"]=[];
            data.records.forEach(item=>{
                retour["gare"].push(item.fields.geo_shape.coordinates[0]);
                retour["gare"].push(item.fields.geo_shape.coordinates[item.fields.geo_shape.coordinates.length-1]);
            })
            //tracerLigne(data, couleur);
        },
    });
    return retour;
}
function traceDuChemin(lat, lon, dist, type, ligne, couleur){
    let retour=[];
    $.ajax({
        method: 'GET',
        url: "https://opendata.hauts-de-seine.fr/api/records/1.0/search/?dataset=traces-du-reseau-de-transport-ferre-dile-de-france&q=&facet=mode&facet=indice_lig&refine.mode="+ type.toUpperCase().trim() + "&refine.indice_lig=" + ligne.toUpperCase().trim() + "&rows=100",//&geofilter.distance="+lat+"%2C"+lon+"%2C"+dist,
        async : false,
        success : function(data){
            retour=[];
            data.records.forEach(item=>{
                retour.push(item.fields.geo_shape.coordinates[0]);
                retour.push(item.fields.geo_shape.coordinates[item.fields.geo_shape.coordinates.length-1]);
            })

            //tracerLigne(data, couleur);
        },
    });
    return retour;
}

function tracerItineraire2(chemin, type, ligne, couleur){
    let cheminCityMapper=[]

    chemin.forEach(item => {
        cheminCityMapper.push(item.coordinates);
    })

    console.log("cheminCityMapper")
    console.log(cheminCityMapper)

    let cheminApi = [];
    cheminCityMapper.forEach(item => {
            let temp=[];
            temp = gareDuTrace(item.lat, item.lon, 500, type, ligne, couleur);
            temp["gare"].forEach(obj => {
                console.log(obj)
                if(!existIn(cheminApi,obj)){
                    cheminApi.push(obj.reverse());
                }
            })
        }
    )
    console.log("cheminApi");
    console.log(cheminApi);
    chemin = correspondance(cheminCityMapper, cheminApi);
    console.log("chemin")
    console.log(chemin)


}