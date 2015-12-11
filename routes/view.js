var express = require('express');
var router = express.Router();


var viewController = require('../app/controller/viewController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('view', { title: 'Net Gap View The Hardware' });
  //udpServerObj.broadcastUdpData("Get UDP");
});


router.get('/getHardwares', function (req, res) {
  var dataToFront = viewController.getHardwares();
  res.end(dataToFront);
});


router.get('/checkUdpServer', function(req, res, next) {
  var dataToFront = viewController.checkUdpServer();
  res.end(dataToFront); 
});

router.get('/startUdpServer', function(req, res, next) {
  var dataToFront = viewController.startUdpServer();
  res.end(dataToFront);
});
module.exports = router;
