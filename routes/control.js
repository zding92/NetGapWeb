var express = require('express');
var router = express.Router();
var udpServer = require('./udpServer.js');


//var udpServerObj = new(udpServer);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('control', { title: 'Net Gap Control The Hardware' });
});

module.exports = router;
