// Request NPM Module for retrieving data
const request = require('request');

const forecast = (lat, long, units, callback) => {

    // Main API URL
    const url = `https://api.darksky.net/forecast/eec687b9bb4adf7530827ec642306ef0/${lat},${long}?units=${units}`;

    request({
        url,
        json: true
     }, (error, {body}) => {
         if(error) {
            // Callback with error if network connectivity == null
            callback('Unable to connect to DarkSKY API servers.', undefined);
         } else if(body.error) {
            // Callback with error if location or units are invalid
            callback('Invalid location or units.', undefined);
         } else {

            let degrees;

            if(units == 'si') {
               degrees = '°C';
            } else {
               degrees = '°F';
            }
            // Retrieving Data from DarkSKY API and setting object for callback
            callback(undefined, {
                forecast: `${body.hourly.summary} Currently, there are ${body.currently.temperature} ${degrees} with a ${body.hourly.data[0].precipProbability}% chance of rain.`
            })
         }
     });
}

module.exports = forecast;