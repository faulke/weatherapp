const getWeather = require('./public/js/test.js');

module.exports =
  (req, res) => {
    getWeather(req.body.latitude, req.body.longitude, (weather) => {
      req.app.set('weatherData', weather);
    });
    res.send();
  };
