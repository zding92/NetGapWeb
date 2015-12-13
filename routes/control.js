var express = require('express');
var router = express.Router();
var controlController = require('../app/controller/controlController');



//var udpServerObj = new(udpServer);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('control', { title: 'Net Gap Control The Hardware' });
});


router.get('/checkUdpServer', function(req, res, next) {
  var dataToFront = controlController.checkUdpServer();
  res.end(dataToFront);
  
});

router.get('/startUdpServer', function(req, res, next) {
  var dataToFront = controlController.startUdpServer();
  res.end(dataToFront);
});

router.post('/uploadFile',function(req,res,next){
  // var dataToFront = controlController.fileUpload(req,res);
  // res.send("dataToFront");
  
  //上传文件
  controlController.fileUpload(req,res);
  res.render('control', { title: 'Net Gap Control The Hardware' });
})

module.exports = router;
