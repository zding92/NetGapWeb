var express = require('express');
var router = express.Router();

var indexController = require('../app/controller/indexController');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Net Gap', udpStatus: "hello"});
});


router.get('/startUdpServer', function(req, res, next) {
  var dataToFront = indexController.startUdpServer();
  res.end(dataToFront);
});

router.get('/checkUdpServer', function(req, res, next) {
  var dataToFront = indexController.checkUdpServer();
  res.end(dataToFront);
});


module.exports = router;
