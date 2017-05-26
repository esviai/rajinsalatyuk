const url =  `http://muslimsalat.com/`;
const end = `/daily.json?key=654f798a989f8b5cffccd98ba5b0daa6`;
const getJSON = require('get-json');
const convertTime = require('convert-time');
const util = require('../helpers/util');

var reply = ((req,res) => {
  let result = req.body.spokenRes;
  let status = {};

  let arrResult = result.toLowerCase().split(" ");
  arrResult.push(arrResult[arrResult.length-1]);
  arrResult[arrResult.length-2] = ",";

  let context = arrResult.join(" ");
  context = context.split(',');
  let completeURL = `${url}${context[0]}${end}`;

  if(context[1]) {
    context[1] = context[1].trim();
    //let request = context[1].split(' ');
    //var time = util.requestGen(request[0]);
    var time = util.requestGen(context[1]);
  }
  if(time) status.specific = time;

  getJSON(completeURL, function(err, response) {
    if(response) {
      status.time = response.items;
      status.place = response.query;
    }
    if(status.time == undefined) {
      defaultReply(status,res);
    } else {
      status.time = status.time[0];
      if(status.specific == undefined) {
        replyAll(status,res);
      } else {
        replyOne(status,res);
      }
    }
  });
  if(!result) console.log('No result detected');
});

var defaultReply = ((content,res) => {
  res.render('index', { coba: `Untuk mengetahui waktu salat di tempatmu, sebutkan nama kota dan waktu salat!` });
});

var replyAll = ((content,res) => {
  let waktu = {
    subuh: convertTime(content.time.fajr),
    zuhur: convertTime(content.time.dhuhr),
    ashar: convertTime(content.time.asr),
    maghrib: convertTime(content.time.maghrib),
    isha: convertTime(content.time.isha)
  };
  let hasil = `subuh ${waktu.subuh} zuhur ${waktu.zuhur} ashar ${waktu.ashar} maghrib ${waktu.maghrib} isya ${waktu.isha}`;
  res.render('index', { coba: `Waktu salat di ${content.place} adalah ${hasil} (waktu setempat)`});
});

var replyOne = ((content,res) => {
  let request = content.specific[1];
  let hasil = convertTime(content.time[request]);
  res.render('index', { coba: `Waktu salat ${content.specific[0]} di ${content.place} adalah jam ${hasil} waktu setempat. Yuk salat!` });
});

module.exports = {
  reply
};
