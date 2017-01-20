import async from 'async';
import request from 'request';

const weatherKey = process.env.WEATHER_KEY;
const googleKey = process.env.GOOGLE_KEY;

class WeatherApi {

  static getWeather(lat, long, cb) {
    const urls = [
      `http://localhost:3000/api/weather?lat=${lat}&lon=${long}`,
      `http://localhost:3000/api/forecast?lat=${lat}&lon=${long}`];

    async.map(urls, (url, callback) => {
      request({
        url,
        auth: {
          user: process.env.USER,
          pass: process.env.PASSWORD,
        },
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

  static getWeatherMultiple(locations, cb) {
    const urls = locations.map(x => `http://localhost:3000/api/weather?lat=${x.lat}&lon=${x.long}&units=imperial`);

    async.map(urls, (url, callback) => {
      request({
        url,
        auth: {
          user: process.env.USER,
          pass: process.env.PASSWORD,
        },
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
  
  static searchLocation(type, search, cb) {
    const url = `http://localhost:3000/api/geocode?type=${type}&search=${search}`;
    request.get({
      url,
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
      },
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