const getJSON = require('get-json')

var randomizer = function(callback) {
  let random = Math.floor(Math.random() * 6236) + 1;
  let url = `http://api.alquran.cloud/ayah/${random}/en.asad`
  let url1 = `http://api.alquran.cloud/ayah/${random}`
  var result = {};
  getJSON(url, (err, response) => {
    if(response) {
      result.translation = response.data.text;
      getJSON(url1, (err, response) => {
        result.ayat = response.data.text;
        result.surat = response.data.surah.englishName;
        result.ayatOrder = response.data.numberInSurah;
        callback(result)
      })
    }
  })
}

module.exports = {
  randomizer
};