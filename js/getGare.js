window.onload = function(){
    getGare()
}
const MAX_GARES = 2000
var villes = []
/**
 * Récupère toutes les gares pour les afficher dans les inputs pour choisir la gare de départ et celle d'arrivée
 */
function getGare(){
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
                $('#list-gare-arrivee').append("<option value='" + villes[index].fields.nom_zdl + "'>")
            })
        },
        error: function(){
            alert('Aucune gare trouvée')
        }
    })
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