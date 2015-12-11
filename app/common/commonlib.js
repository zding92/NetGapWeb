var udpServer = require('../controller/udpServer.js');

function common(){
	// this.checkUdpServer = function(){
	// 	//取回UDP Server正在工作的状态，是running还是stopped
	// 	var dataToFront = Array();
	// 	dataToFront[0] = "success";
	// 	dataToFront[1] = global.udpServer.getServerStatus()['status'];
	// 	dataToFront[2] = global.udpServer.getServerStatus()['address'];
	// 	dataToFront[3] = global.udpServer.getServerStatus()['port'];
	// 	return(JSON.stringify(dataToFront));
	// }
	
	this.checkUdpServer = function(){
		console.log("run checkUdpServer");
		if (global.udpServer!=null){
			//查看UDP服务器工作状态
			var dataToFront = InnerCheckUdpServer();
			console.log("/checkUdpServer Sent to Front"+dataToFront);
			return dataToFront;
		}
	}
	
	this.startUdpServer = function(){
		console.log("run the UDP Start Process");
		//开启全局UDP服务器
		global.udpServer = new(udpServer);
		global.udpServer.startUdpServer();
		//查看UDP服务器工作状态
		var dataToFront = InnerCheckUdpServer();
		console.log("/startUdpServer Sent to Front"+dataToFront);
		return(dataToFront);
	}
	
	function InnerCheckUdpServer(){
		//取回UDP Server正在工作的状态，是running还是stopped
		var dataToFront = Array();
		dataToFront[0] = "success";
		dataToFront[1] = global.udpServer.getServerStatus()['status'];
		dataToFront[2] = global.udpServer.getServerStatus()['address'];
		dataToFront[3] = global.udpServer.getServerStatus()['port'];
		return(JSON.stringify(dataToFront));
	}
}

module.exports = common;