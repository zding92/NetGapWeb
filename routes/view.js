var express = require('express');
var router = express.Router();
var udpServer = require('./udpServer.js');
var common = require('./common.js');
var commonObj = new(common);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('view', { title: 'Net Gap View The Hardware' });
  //udpServerObj.broadcastUdpData("Get UDP");
});


router.get('/getHardwares', function (req, res) {
  if (global.udpServer!=null){
    var udpClientInView = global.udpServer.getUdpClientInfo();
    // 输出 JSON 格式
    var response = {
        id:"0001",
        ip:udpClientInView.address,
        port:udpClientInView.port
    };
    console.log("/view/getHardwares responsed to Front:"+JSON.stringify(response));
    res.end(JSON.stringify(response));
  }
})


router.get('/checkUdpServer', function(req, res, next) {
  console.log("run /view/checkUdpServer"); 
  // var dataToFront = commonObj.checkUdpServer();
  // console.log("/startUdpServer Sent to Front"+dataToFront);
  // res.end(dataToFront);
    if (global.udpServer!=null){
      //查看UDP服务器工作状态
      var dataToFront = commonObj.checkUdpServer();
      console.log("/checkUdpServer Sent to Front"+dataToFront);
      res.end(dataToFront);
  }
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
module.exports = router;
