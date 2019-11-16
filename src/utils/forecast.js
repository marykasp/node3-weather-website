const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/e987fd14a90ba105ca9f26c89f7d4a97/${latitude},${longitude}`


    request({ url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('unable to find location', undefined)
        } else {
            const temperature = body.currently.temperature;
            const minimumTemperature = body.daily.data[0].temperatureMin;
            const precipitation= body.currently.precipProbability;
            const summary = body.daily.data[0].summary
            const forecast = `${summary}. It is currently ${temperature} degrees out. With a low around ${minimumTemperature} degrees and a ${precipitation}% chance of rain`
            callback(undefined, forecast)
        }
    })
}

module.exports = forecast