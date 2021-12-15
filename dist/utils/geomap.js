"use strict";
const request = require('postman-request');
require('dotenv').config();
const geomap_token = process.env.GEO_TOKEN;
/**
 * Geolocalización de un lugar, devolviendo las coordenadas
 *
 * @param address Nombre del lugar en inglés
 * @param callback
 */
const geomap = (address, callback) => {
    const geo_api = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${geomap_token}&limit=1`;
    request({
        url: geo_api,
        json: true
    }, (error, response) => {
        if (error) {
            callback("Imposible conectarse al servicio de MapBox", undefined);
        }
        else if (response.body.features.length === 0 || response.statusCode != 200) {
            callback("No se ha hallado ninguna localización. Realice otra búsqueda", response.statusCode);
        }
        else {
            callback(undefined, {
                longitud: response.body.features[0].center[0],
                latitud: response.body.features[0].center[1],
                localizacion: response.body.features[0].place_name
            });
        }
    });
};
module.exports = geomap;
//# sourceMappingURL=geomap.js.map