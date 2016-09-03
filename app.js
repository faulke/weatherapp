const async = require('async');
const request = require('request');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const apiKey = '881b5955fcd17cbec3fe94131e417545';

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static('public'));
app.set('view engine', 'pug');

app.get('/home', (req, res, next) => {
  res.render('index.pug');
  next();
});

app.get('/weather/:lat/:long', (req, res) => {
  console.log(req.params);
  const lat = req.params.lat;
  const long = req.params.long;
  const urls = [`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${apiKey}`,
                `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${long}&cnt=5&APPID=${apiKey}`];

  async.map(urls, (url, callback) => {
    request(url, (err, response, body) => {
      if (err) {
        console.error(err);
      } else {
        callback(null, JSON.parse(body));
      }
    });
  }, (err, results) => {
    res.render('template', { title: 'Weather', weather: results[0], forecast: results[1] })
  });
});

app.listen(3000, () => {
  console.log('App listening on port 3000');
});
