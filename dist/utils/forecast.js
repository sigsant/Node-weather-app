var request = require('postman-request');
require('dotenv').config();
var forecast_token = process.env.WEATHER_API;
var forecast = function (latitud, longitud, callback) {
    var weather_api = "http://api.weatherstack.com/current?access_key=".concat(forecast_token, "&query=").concat(latitud, ",").concat(longitud, "&units=m");
    request({
        url: weather_api,
        json: true
    }, function (error, _a) {
        var body = _a.body;
        if (error) {
            callback('Imposible conectarse al servicio WeatherStack', undefined);
        }
        else if (body.error) {
            var error_1 = body.error;
            callback("Imposible encontrar localizacion en Weather Stack.", {
                Codigo: error_1.code,
                Motivo: error_1.type,
                Mensaje: error_1.info
            });
        }
        else {
            var current = body.current;
            var data = {
                Descripcion: current.weather_descriptions[0],
                Temperatura: current.temperature,
                Precipitacion: current.precip,
                Icon: current.weather_icons[0]
            };
            callback(undefined, data);
        }
    });
};
module.exports = forecast;
