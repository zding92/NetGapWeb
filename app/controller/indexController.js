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


//传入userName,pwd,res
exports.login = function(userName,pwd,req,res){
    //使用commonObj中的登录方法，传入userName,pwd,待执行完毕后调用回调
    commonObj.login(userName,pwd,req,res);
    
}