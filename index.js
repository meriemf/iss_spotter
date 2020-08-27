// index.js
const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});


fetchCoordsByIP('142.116.98.129',(error, obj) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  } else {

    console.log('It worked! Returned:', obj);

  }

}
);
const obj = { latitude: '49.27670', longitude: '-123.13000' };

fetchISSFlyOverTimes(obj, (error, obj) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  } else {

    console.log('It worked! Returned:', obj);

  }
});