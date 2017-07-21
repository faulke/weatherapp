const request = require('request-promise');

exports.handler = (event, context, callback) => {
  const uri = `https://maps.googleapis.com/maps/api/geocode/json?address=${event.search}&key=${process.env.GOOGLE_KEY}`;
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
