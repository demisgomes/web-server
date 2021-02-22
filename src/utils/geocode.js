const request = require('postman-request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGVtaXNnb21lc3R3IiwiYSI6ImNrbGEwOHJ4MTI3ZXUyb21ncTRyeXB6bDgifQ.GhsYEaQftz7bKdDiNBkmPA&limit=1';

    request({ url, json: true }, (err, { body }) => {

        if (err) {
            callback('Unable to connect to location services', undefined);
        }
        else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        }
        else {
            const { center:latLong, place_name:location} = body.features[0];
            callback(undefined, {
                latitude: latLong[1],
                longitude: latLong[0],
                location
            });
        }

    })
}

module.exports = geocode;