import async from 'async';
import request from 'request';

const weatherKey = process.env.WEATHER_KEY;
console.log(weatherKey);

class WeatherApi {
  static getWeather(lat, long, cb) {
    const urls = [
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${weatherKey}`,
      `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${long}&cnt=5&APPID=${weatherKey}`];

    async.map(urls, (url, callback) => {
      request({
        url,
        withCredentials: false,
      }, (err, response, body) => {
        if (err) {
          callback(err);
        } else {
          callback(null, JSON.parse(body));
        }
      });
    }, (err, results) => {
      if (results[0].cod === 200) {
        cb(null, results);
      } else {
        cb(err);
      }
    });
  }
}

export default WeatherApi;