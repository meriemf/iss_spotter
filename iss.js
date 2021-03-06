const request = require('request');
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  const url = 'https://api.ipify.org?format=json';
  // use request to fetch IP address from JSON API
  request(url,(error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
   
    const address = JSON.parse(body).ip;
    callback(null , address);

  });

};
const fetchCoordsByIP = function(ip, callback) {
  const url = 'https://ipvigilante.com/' + ip;
  // use request to fetch IP address from JSON API
  request(url,(error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetchingcoordinates by IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const rslt = JSON.parse(body);
    const obj = {'longitude': '', 'latitude': ''};
    obj.longitude = rslt.data.longitude;
    obj.latitude = rslt.data.latitude;
    callback(null, obj);
  
  });
};
const fetchISSFlyOverTimes = function(coords, callback) {
  const url = 'http://api.open-notify.org/iss-pass.json?lat=' + coords.latitude + '&lon=' + coords.longitude;
  //console.log(url);
  request(url, (error, response, body)=> {

    if (error) {
      callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetchingcoordinates by IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const rslt = JSON.parse(body).response;
    callback(null, rslt);
  });
};
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(coords, (error, Passes) => {

        if (error) {
          callback(error, null);
          return;
        } else {
        
          callback(null, Passes);
        }
      });
    });
  });
  
};
module.exports = { fetchMyIP };
module.exports = { fetchCoordsByIP };
module.exports = { fetchISSFlyOverTimes };
module.exports = { nextISSTimesForMyLocation };
