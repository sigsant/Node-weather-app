var request = require('postman-request');
require('dotenv').config();
var geomap_token = process.env.GEO_TOKEN;
/**
 * Geolocalización de un lugar, devolviendo las coordenadas
 *
 * @param address Nombre del lugar en inglés
 * @param callback
 */
var geomap = function (address, callback) {
    var geo_api = "https://api.mapbox.com/geocoding/v5/mapbox.places/".concat(address, ".json?access_token=").concat(geomap_token, "&limit=1");
    request({
        url: geo_api,
        json: true
    }, function (error, response) {
        var features = response.body.features;
        if (error) {
            callback("Unable to connect to Mapbox service", undefined);
        }
        else if (features.length === 0 || response.statusCode != 200) {
            callback("No location found. Please, perform another search", response.statusCode);
        }
        else {
            var geoData = {
                longitud: features[0].center[0],
                latitud: features[0].center[1],
                localizacion: features[0].place_name
            };
            callback(undefined, geoData);
        }
    });
};
module.exports = geomap;
