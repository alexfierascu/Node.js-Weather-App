// Request NPM Module for retrieving data
const request = require('request');

const geocode = (address, callback) => {

    // Main API URL
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoidmR1bWl0cmVzY3UiLCJhIjoiY2pzdjBkeW9uMDIwNTQ5cDR2ZmkxMXN3ayJ9.4cf6VNXjHjPZIrWXvA01uA&limit=1`;

    request({
        url,
        json: true
    }, (error, response) => {
        
         if(error) {
             // Callback with error if network connectivity == null
             callback('Cannot connect to MapBox API Servers.', undefined);
         } else if(response.body.features.length === 0) {
             // Callback with error if location is invalid
             callback('Cannot get coordinates for the given location.', undefined);
         } else {
             callback(undefined, {
                 // Retrieving Data from MapBox API and setting object for callback
                 location: `${response.body.features[0].place_name}`,
                 longitude: `${response.body.features[0].center[0]}`,
                 latitude: `${response.body.features[0].center[1]}`
             })
         }
    });
};

module.exports = geocode;