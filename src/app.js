const express = require('express');
const path = require('path');
const hbs = require('hbs');

const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const port = process.env.PORT || 3000;

const app = express();

app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, '../templates/views'));
app.set('partials', path.join(__dirname, '../templates/partials'));

hbs.registerPartials(path.join(__dirname, '../templates/partials'));

app.get('', (req, res) => {
    res.render('index', { title: 'Weather', description: 'Here you put the location and we give the forecast!', name: 'Demis' });
});

app.get('/help', (req, res) => {
    res.render('help', { title: 'Help', helpText: 'Here you can get more information about the app', name: 'Demis' });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About', name: 'Demis' });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must to provide a search term'
        })
    }
    console.log(req.query.search)

    return res.send({
        products: []
    })
})

app.get('/weather', (req, res) => {

    const address = req.query.address;

    if (!address) {
        return res.send({
            error: 'You must to provide an address term'
        })
    }
    console.log(address);

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error: error })
        }

        forecast(latitude, longitude, (error, forecast) => {
            if (error) {
                return res.send({ error: error })
            }

            return res.send({
                forecast,
                location,
                address
            });
        });


    });




});

app.get('*', (req, res) => {
    res.render('404', { title: '404', name: 'Demis' });
});

app.listen(port);
//example
//example 2
