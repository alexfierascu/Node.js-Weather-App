// npm and built-in Modules
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');

// My modules
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

// Setting View Engine for Express-Handlebars
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));

// Loading Static Files
app.use(express.static(path.join(__dirname, 'assets')));

// Home Page
app.get('/', (req, res) => {
    res.render('pages/index');
});

// About Page
app.get('/about', (req, res) => {
    res.render('pages/about');
});

// Calling the request to /weather and chaining callbacks
app.get('/weather', (req, res) => {

    // Error Format if query for address == null otherwise continue
    if(!req.query.address) {
        return res.send({error: 'Address must be specified!'});
    }

    // Error Format if query for units == null otherwise continue
    if(!req.query.units) {
        return res.send({error: 'Units must be specified!'});
    }

    // Geocode API
    geocode(req.query.address, (error, {location, longitude, latitude} = {}) => {
        if(error) {
            return res.send({error});
        }
   
    // Forecast API
        forecast(latitude, longitude, req.query.units, (error, {forecast} = {}) => {
            if(error) {
                return res.send({error});
            }
   
    // Sending data to Client
            res.send({
                location,
                forecast
            });   
        });
    });
});

// 404 Page Error
app.get('*', (req, res) => {
    res.render('pages/404');
});

// Port for localhost or production
const port = process.env.PORT || 3000;

// Listening to corresponding port
app.listen(port, () => {
    console.log(`Server started on port ${port}...`);
});