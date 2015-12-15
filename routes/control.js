var express = require('express');
var router = express.Router();
var controlController = require('../app/controller/controlController');
var URL = require('url');


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
  //上传文件
  controlController.fileUpload(req,res);
  //res.render('control', { title: 'Net Gap Control The Hardware' });
  res.redirect("./");

})

router.get('/getConfigFile',function(req,res,next){
  //console.log("url is:"+req.url);
  //整个url
  var dataFromFront = URL.parse(req.url);
  //获取url传来的值
  var boardNum = req.query.board;
  var sort = req.query.sort;
  var order = req.query.order;
  var limit = req.query.limit;
  var offset = req.query.offset;
  
  controlController.getConfigFile(res,boardNum);

})




module.exports = router;
