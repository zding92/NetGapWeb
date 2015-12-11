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

exports.getHardwares = function(){
	if (global.udpServer!=null){
		var udpClientInView = global.udpServer.getUdpClientInfo();
		// 输出 JSON 格式
		var response = {
			id:"0001",
			ip:udpClientInView.address,
			port:udpClientInView.port
		};
		console.log("/view/getHardwares responsed to Front:"+JSON.stringify(response));
		return(JSON.stringify(response));
	}
}