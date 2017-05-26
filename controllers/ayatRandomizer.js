const getJSON = require('get-json')

var randomizer = function() {
  let random = Math.floor(Math.random() * 6236) + 1;
  let url = `http://api.alquran.cloud/ayah/${random}/en.asad`
  let url1 = `http://api.alquran.cloud/ayah/${random}`
  let result = {};
  getJSON(url, (err, response) => {
    if(response) {
      result.translation = response.data.text;
      getJSON(url1, (err, response) => {
        result.ayat = response.data.text;
        result.surat = response.data.surah.englishName;
        result.ayatOrder = response.data.numberInSurah;
        return result;
      })
    }
  })
}

module.exports = {
  randomizer
};