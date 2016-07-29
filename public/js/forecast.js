const request = require('request');
const apiKey = '881b5955fcd17cbec3fe94131e417545';


module.exports =
  (lat, long, callback) => {
    request.get(
      `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${long}&cnt=5&APPID=${apiKey}`,
      (err, response) => {
        if (err) {
          console.log(response.statusCode);
        }
        callback(JSON.parse(response.body));
      }
    );
  };
