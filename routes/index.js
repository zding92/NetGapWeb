var express = require('express');
var router = express.Router();
var udpServer = require('./udpServer.js');

//var udpServerObj = new(udpServer);



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Net Gap', udpStatus: "hello"});
});


router.get('/startUdpServer', function(req, res, next) {
  console.log("run the UDP Start Process");
  //开启全局UDP服务器
  global.udpServer = new(udpServer);
  global.udpServer.startUdpServer();

  var dataToFront = Array();
  dataToFront[0] = "success";
  dataToFront[1] = global.udpServer.getServerStatus()['status'];
  dataToFront[2] = global.udpServer.getServerStatus()['address'];
  dataToFront[3] = global.udpServer.getServerStatus()['port'];
  
  console.log("/startUdpServer Sent to Front"+dataToFront);
  res.end(JSON.stringify(dataToFront));
});
module.exports = router;
