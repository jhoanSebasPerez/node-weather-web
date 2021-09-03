const request = require("postman-request");

const geocode = (place, callback) => {
  const urlCoord = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    place
  )}.json?access_token=pk.eyJ1IjoiamhvYW5wZXJleiIsImEiOiJja3J0eG9hZWUwdWR6MnV0NWo4cWJib2k3In0.bK324jToDpyBGXfI0VSRxA`;

  request({ url: urlCoord, json: true }, (error, response, body) => {
    if (error) {
      callback("Unable connect to mapbox server", undefined);
    } else if (body.features.length === 0) {
      callback("Unable location to search", undefined);
    } else {
      const { center, place_name } = body.features[0];
      const coord = {
        longitud: center[0],
        latitud: center[1],
        place: place_name,
      };
      callback(undefined, coord);
    }
  });
};

module.exports = geocode;
