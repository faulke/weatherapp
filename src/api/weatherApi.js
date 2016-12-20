import async from 'async';
import request from 'request';

const weatherKey = 'weather_key';
const googleKey = 'google_key';

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
      if (!err && results[0].cod === 200) {
        cb(null, results);
      } else {
        cb(err);
      }
    });
  }
  
  static searchWeather(search, cb) {
    const self = this;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${search}&key=${googleKey}`;
    request.get({
      url,
      withCredentials: false,
    }, (err, result, body) => {
      if (err) {
        cb(err);
      } else {
        const data = JSON.parse(body);
        cb(null, data);
      }
    });
  }
}

export default WeatherApi;