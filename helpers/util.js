var requestGen = function(context) {
  if(/buh\b/.test(context)) return [context, "fajr"];
  if(/hur\b/.test(context)) return [context, "dhuhr"];
  if(/ar\b/.test(context)) return [context, "asr"];
  if(/rib\b/.test(context)) return [context, "maghrib"];
  if(/a\b/.test(context)) return [context, "isha"];
  return false;
}

module.exports = {
  requestGen
};