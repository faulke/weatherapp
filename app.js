const async = require('async');
const request = require('request');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const keys = require('./config.json');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static('public'));
app.set('view engine', 'pug');

app.post('/search', (req, res) => {
  request.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.body.data}&key=${keys.google_api_key}`, (err, result, body) => {
    const data = JSON.parse(body);
    res.json(data);
  });
});

app.get('/home', (req, res, next) => {
  res.render('loading.pug');
  next();
});

app.get('/weather', (req, res) => {
  res.render('index.pug');
});

app.get('/weather/:lat/:long', (req, res) => {
  const lat = req.params.lat;
  const long = req.params.long;
  const urls = [`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${keys.openweathermap_api_key}`,
                `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${long}&cnt=5&APPID=${keys.openweathermap_api_key}`];

  async.map(urls, (url, callback) => {
    request(url, (err, response, body) => {
      if (err) {
        console.error(err);
      } else {
        callback(null, JSON.parse(body));
      }
    });
  }, (err, results) => {
    if (results[0]['cod'] == 200) {
      res.render('template', { title: 'Weather', weather: results[0], forecast: results[1] });
    } else {
      res.render('index.pug');
    }
  });
});

app.listen(3000, () => {
  console.log('App listening on port 3000');
});
