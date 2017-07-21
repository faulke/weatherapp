const request = require('request-promise');

exports.handler = (event, context, callback) => {
  const uri = `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${event.lat}&lon=${event.long}&cnt=5&units=imperial&APPID=${process.env.WEATHER_KEY}`;
  const options = {
    uri,
    json: true,
  };

  request(options)
    .then((data) => {
      const response = {
        statusCode: 200,
        data,
      };
      callback(null, response);
    })
    .catch((err) => {
      callback(null, 'There was an error');
    });
};
