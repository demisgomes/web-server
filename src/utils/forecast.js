const request = require('postman-request');
//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (latitude, longitude , callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ec2f03fed6e0166c8faea05711b85583&query=' + latitude + ',' + longitude;

    request({ url: url, json: true }, (err,  { body }) => {
        if (err) {
            callback('Unable to connect to weatherstack', undefined);
        }
        else if (body.error) {
            callback('Unable to find result', undefined)
        }
        else {
            const { weather_descriptions, temperature, feelslike } = body.current;
            callback(undefined, {
                weather_description: weather_descriptions[0],
                temperature,
                feelslike
            });
        }

    })
}

module.exports = forecast;