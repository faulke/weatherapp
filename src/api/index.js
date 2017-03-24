import async from 'async';
import request from 'request';

const weatherKey = process.env.WEATHER_KEY;
const googleKey = process.env.GOOGLE_KEY;
const hostName = process.env.NODE_ENV === 'production' ?
  'https://simpleweather.us' :
  'http://localhost:3000';

const fetchJson = (url, callback) => {
  request({
    url,
    auth: {
      user: process.env.USER_NAME,
      pass: process.env.PASSWORD,
    },
  }, (err, response, body) => {
    if (err) {
      callback(err);
    } else {
      callback(null, JSON.parse(body));
    }
  });
};

const getWeather = (lat, long, cb) => {
  const urls = [
    `${hostName}/api/weather?lat=${lat}&lon=${long}`,
    `${hostName}/api/forecast?lat=${lat}&lon=${long}`];

  async.map(urls, fetchJson, (err, results) => {
    if (!err && results[0].cod === 200) {
      cb(null, results);
    } else {
      cb(err);
    }
  });
};

const getWeatherMultiple = (locations, cb) => {
  const urls = locations.map(x => `${hostName}/api/weather?lat=${x.lat}&lon=${x.long}&units=imperial`);

  async.map(urls, fetchJson, (err, results) => {
    if (!err && results[0].cod === 200) {
      cb(null, results);
    } else {
      cb(err);
    }
  });
};

const searchLocation = (search, cb) => {
  const url = `${hostName}/api/geocode?type=address&search=${search}`;
  fetchJson(url, (err, res) => {
    if (err) cb(err);
    cb(null, res);
  });
};

const api = {
  weather: {
    get: getWeather,
    getMultiple: getWeatherMultiple,
  },
  search: searchLocation,
};

export default api;
