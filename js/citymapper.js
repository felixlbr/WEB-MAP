var start = '48.83201646822717%2C1.943551771507983'
var end = '48.84190466356479%2C2.2679293794574162'



$.ajax({
    method: "GET",
    url: "https://api.external.citymapper.com/api/1/directions/transit?Citymapper-Partner-Key=zW8bBLhrVAODxbf3JDQXInEAvSeS6UHj&start=" + start + "&end=" + end + "&traveltime_types=transit",
    success: function(data){
        console.log(data)

        for (let i = 0; i < data.routes[0].legs.length; i++) {
            if(data.routes[0].legs[i].travel_mode == 'transit'){
                if(data.routes[0].legs[i].vehicle_types[0] == rail){
                    var nomLigne = data.routes[0].legs[i].services[0].name
                    afficherLigne('TRAIN', nomLigne)
                    var nbStations = data.routes[0].legs[i].stops.length
                    var lat_a = data.routes[0].legs[i].stops[0].coordinates.lat
                    var lng_a = data.routes[0].legs[i].stops[0].coordinates.lon
                    var lat_b = data.routes[0].legs[i].stops[nbStations - 1].coordinates.lat
                    var lng_b = data.routes[0].legs[i].stops[nbStations - 1].coordinates.lon
                    marker1 = L.marker([lat_a, lng_a], {icon: arret})
                    marker2 = L.marker([lat_b, lng_b], {icon: arret})
                    markers.push(marker1)
                    markers.push(marker2)
                    //marker.bindPopup('<b>' + item.fields.nom_zdl + '</b>')
                    marker1.addTo(map)
                    marker2.addTo(map)
                }
            }
        }
    }
})


//url: "https://api.external.citymapper.com/api/1/traveltimes?Citymapper-Partner-Key=zW8bBLhrVAODxbf3JDQXInEAvSeS6UHj&start=51.525246%2C0.084672&end=51.559098%2C0.074503&traveltime_types=walk,transit,bike,scooter,motorscooter,car",


//48.831737 1.943195
//48.800846 2.171311
//48.800846 2.171311
//48.838746 2.270171