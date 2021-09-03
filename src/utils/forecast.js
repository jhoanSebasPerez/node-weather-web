const request = require("postman-request");

const forecast = (latitud, longitud, callback) => {
  const urlWeatehr = `http://api.weatherstack.com/current?access_key=d50283eedb008bfb146c020fc93dc45a&query=${latitud},${longitud}`;

  request({ url: urlWeatehr, json: true }, (error, response, body) => {
    if (error) {
      callback("Unable connection to weather stack", undefined);
    } else if (body.error) {
      callback(body.error.info, undefined);
    } else {
      const { temperature, feelslike, weather_descriptions } = body.current;
      callback(undefined, { temperature, feelslike, weather_descriptions });
    }
  });
};

module.exports = forecast;
