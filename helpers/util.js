const convertTime = require('convert-time');

var patternMaker = function(data, param) {
  var tes = '';
  if(param) {
    // console.log('tes')
    tes = convertTime(data, 'HH:MM');
  } else {
    tes = convertTime(data);
  }
  let time = tes.split(':');
  let hours = time[0];
  let minutes = time[1];
  // if (minutes > 14) {
  //   minutes = Number(time[1]) - 15
  // }
  // // else {
  // //   hours = hours - 1
  // //   minutes = 60 + (minutes - 15)
  // // }
  return `00 ${minutes} ${hours} * * *`
}

var requestGen = function(context) {
  if(/buh\b/.test(context)) return [context, "fajr"];
  if(/hur\b/.test(context)) return [context, "dhuhr"];
  if(/ar\b/.test(context)) return [context, "asr"];
  if(/rib\b/.test(context)) return [context, "maghrib"];
  if(/a\b/.test(context)) return [context, "isha"];
  return false;
}

module.exports = {
  requestGen,
  patternMaker
};