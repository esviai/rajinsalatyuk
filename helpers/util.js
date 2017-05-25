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

  return `00 ${minutes} ${hours} * * *`
}

module.exports = {
  patternMaker
};
