const getWeather = require('./public/js/currentWeather.js');
const getForecast = require('./public/js/forecast.js');

module.exports =
  (req, res) => {
    getWeather(req.body.latitude, req.body.longitude, (weather) => {
      req.app.set('weatherData', weather);
      console.log(weather);
    });
    getForecast(req.body.latitude, req.body.longitude, (forecast) => {
      req.app.set('forecast', forecast);
      console.log(forecast.list[0]);
    });
    res.send();
  };
