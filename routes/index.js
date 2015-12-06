var express = require('express');
var router = express.Router();
var udpServer = require('./udpServer.js');
var common = require('./common.js');
var commonObj = new(common);

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
  //查看UDP服务器工作状态
  var dataToFront = commonObj.checkUdpServer();
  console.log("/startUdpServer Sent to Front"+dataToFront);
  res.end(dataToFront);
});

router.get('/checkUdpServer', function(req, res, next) {
  console.log("run the /index/checkUdpServer");
  if (global.udpServer!=null){
      //查看UDP服务器工作状态
      var dataToFront = commonObj.checkUdpServer();
      console.log("/checkUdpServer Sent to Front"+dataToFront);
      res.end(dataToFront);
  }
});
module.exports = router;
