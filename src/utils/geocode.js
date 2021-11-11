const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWVpbnNwYW5pZXIiLCJhIjoiY2t2bzh3enE0YTRtdDJwcGd0dDl2dnFxZiJ9.GL6VlSZ10RVlQ_wGbATjmA'
    request({url , json: true}, (error, {body}) => {
        if(error){
            callback('unable to connect', undefined)
        }else if(body.features.length==0){
            callback('invalid coordinates', undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
