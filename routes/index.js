var express = require('express');
var router = express.Router();
var URL = require('url');

var indexController = require('../app/controller/indexController');
var commonController = require('../app/controller/commonController.js');

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

router.get('/login', function(req,res,next){
    var dataFromFront = URL.parse(req.url);
    //获取url传来的值
    var userName = req.query.username;
    var pwd = req.query.password;
    console.log("userName:"+userName);
    console.log("pwd:"+pwd);
    //进行登录，传入用户名、密码、response
    indexController.login(userName,pwd,req,res);   
})

router.get('/checkUser', function(req,res,next){
    //获取后台关于user的session
    commonController.checkUser(req,res);   
})


module.exports = router;
