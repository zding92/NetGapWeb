var express = require('express');
var router = express.Router();
var index = require('./index.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('view', { title: 'Net Gap View The Hardware' });
  //udpServerObj.broadcastUdpData("Get UDP");
});


router.get('/getHardwares', function (req, res) {
   var udpClientInView = global.udpServer.getUdpClientInfo();
   // 输出 JSON 格式
   var response = {
       id:"0001",
       ip:udpClientInView.address,
       port:udpClientInView.port
   };
   console.log("/view/getHardwares responsed to Front:"+JSON.stringify(response));
   res.end(JSON.stringify(response));
})

module.exports = router;
