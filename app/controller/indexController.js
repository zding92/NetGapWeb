var commonlib = require('../common/commonlib');
var udpServer = require('./udpServer.js');

var commonObj = new(commonlib);

exports.startUdpServer = function(){
	var dataToFront = commonObj.startUdpServer();
	return (dataToFront);
}


exports.checkUdpServer = function(){
	var dataToFront = commonObj.checkUdpServer();
	return (dataToFront);
}