const request = require('postman-request')

require('dotenv').config()

const forecast_token = process.env.WEATHER_API;

const forecast = (latitud: number, longitud: number, callback: any) => {
    const weather_api = `http://api.weatherstack.com/current?access_key=${forecast_token}&query=${latitud},${longitud}&units=m`

    request({
        url: weather_api,
        json: true
    }, (error: (string|undefined), {body}: any) => {
        if (error){
            callback('Imposible conectarse al servicio WeatherStack', undefined)
        } else if (body.error) {

            const {error} = body
            
            callback("Imposible encontrar localizacion en Weather Stack.", {
                Codigo: error.code,
                Motivo: error.type,
                Mensaje: error.info
            });
        } else {
            const {current} = body

            let data = {
                Descripcion: current.weather_descriptions[0],
                Temperatura: current.temperature,
                Precipitacion: current.precip,
                Icon: current.weather_icons[0]
            }
            
            callback(undefined, data)
        }
    })
}

module.exports = forecast