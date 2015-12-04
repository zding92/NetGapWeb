var express = require('express');
var router = express.Router();
var udpServer = require('./udpServer.js');


var udpServerObj = new(udpServer);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('view', { title: 'Net Gap View The Hardware' });
  udpServerObj.broadcastUdpData("Get UDP");
});

module.exports = router;
