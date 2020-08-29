// const { fetchMyIP } = require('./iss_promised');
// const { fetchCoordsByIP } = require('./iss_promised');
// const { fetchISSFlyOverTimes } = require('./iss_promised');
const { nextISSTimesForMyLocation } = require('./iss_promised');

nextISSTimesForMyLocation()
 .then((passTimes)=>{printPasses(passTimes)})
 .catch((error)=>{console.log(error.message)})

const printPasses = function(obj) {
  for (let item of obj) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(item.risetime);
    const duration = item.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};