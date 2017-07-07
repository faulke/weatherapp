import async from 'async';
import request from 'request-promise';

const host = 'https://0d5xzqh159.execute-api.us-west-2.amazonaws.com/dev';

const fetchJson = (uri) => {
  const options = { uri, json: true };

  return request(options);
}

const getWeather = (lat, long) => {
  const uri = `${host}/weather?lat=${lat}&long=${long}`;
  return fetchJson(uri);
};

const getWeatherMultiple = (locations, cb) => {
  const urls = locations.map(x => `${host}/weather?lat=${x.lat}&lon=${x.long}&units=imperial`);

  async.map(urls, fetchJson, (err, results) => {
    if (!err && results[0].cod === 200) {
      cb(null, results);
    } else {
      cb(err);
    }
  });
};

const searchLocation = (search, cb) => {
  const url = `${host}/geocode?type=address&search=${search}`;
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
