
var start = '51.525246,0.084672'
var end = '51.559098,0.074503'
$.ajax({
    method: 'GET',
    url: "https://api.external.citymapper.com/api/1/traveltimes",
    headers: new Headers({
        'Citymapper-Partner-Key': 'TW0S3Zfv5e6H5wdq4YIkBBFAs4tX3Zva',
        'Access-Control-Allow-Origin: *',
        'Access-Control-Allow-Methods: POST, GET ',
    })
    data: {
        'start' : start,
        'end' : end,
    },
    success : function(data) {
        alert('ok')
    }
})

