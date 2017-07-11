import async from 'async';
import request from 'request-promise';

const host = 'https://0d5xzqh159.execute-api.us-west-2.amazonaws.com/dev';

const fetchJson = (uri) => {
  const options = { uri, json: true };

  return request(options);
};

const getWeather = (lat, long) => {
  const uri = `${host}/weather?lat=${lat}&long=${long}`;
  return fetchJson(uri);
};

const getWeatherMultiple = (locations) => {
  return new Promise((resolve, reject) => {
    const promises = locations.map((x) => {
      const uri = `${host}/weather?lat=${x.lat}&long=${x.long}`;
      return fetchJson(uri);
    });
    return Promise.all(promises)
      .then(data => resolve(data))
      .catch((err) => {
        console.log(err);
        reject();
      });
  });
};

const getForecast = (lat, long) => {
  const uri = `${host}/forecast?lat=${lat}&long=${long}`;
  return fetchJson(uri); 
}

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
  forecast: {
    get: getForecast,
  },
  search: searchLocation,
};

export default api;
