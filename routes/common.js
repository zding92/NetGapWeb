function common(){
	this.checkUdpServer = function(){
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