import async from 'async';
import request from 'request';

const weatherKey = process.env.WEATHER_KEY;
const googleKey = process.env.GOOGLE_KEY;

class WeatherApi {
  static getWeather(lat, long, cb) {
    const urls = [
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&APPID=${weatherKey}`,
      `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${long}&cnt=5&units=imperial&APPID=${weatherKey}`];

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
  
  static searchWeather(type, search, cb) {
    const self = this;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?${type}=${search}&key=${googleKey}`;
    request.get({
      url,
      withCredentials: false,
    }, (err, result, body) => {
      if (err) {
        cb(err);
      } else {
        cb(null, JSON.parse(body));
      }
    });
  }
}

export default WeatherApi;