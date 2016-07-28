const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static('public'));
app.set('view engine', 'pug');

app.get('/home', (req, res) => {
  res.render('index.pug');
});

app.post('/action', require('./middleware.js'));

app.get('/weather', (req, res) => {
  setTimeout(() => {
    const weather = req.app.settings.weatherData;
    res.render('template', { title: 'Hey', message: weather.name });
  }, 1000);
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
