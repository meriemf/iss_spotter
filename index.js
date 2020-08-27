// index.js
//const { fetchMyIP } = require('./iss');
//const { fetchCoordsByIP } = require('./iss');
//const { fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });


// fetchCoordsByIP(ip,(error, obj) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   } else {

//     console.log('It worked! Returned:', obj);

//   }

// }
// );
// //const obj = { latitude: '49.27670', longitude: '-123.13000' };

// fetchISSFlyOverTimes(obj, (error, obj) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   } else {

//     console.log('It worked! Returned:', obj);

//   }
// });

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPasses(passTimes);
});

const printPasses = function(obj) {
  for (let item of obj) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(item.risetime);
    const duration = item.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};