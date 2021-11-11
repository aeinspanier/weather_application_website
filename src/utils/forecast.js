const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f14b20e8a9b8448622e900dfe4e049c0&query=' + latitude + ',' + longitude + '&units=f'
    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('unable to connect', undefined)
        }else if(body.error){
            callback('invalid address', undefined)
        }else{
            const forecastString = body.current.weather_descriptions[0] + ' with a temperature of '
                                     + body.current.temperature + ' and feels like ' + body.current.feelslike
            callback(undefined, forecastString)
        }
    })
}

module.exports = forecast