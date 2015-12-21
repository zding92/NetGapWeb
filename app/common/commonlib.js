var udpServer = require('../controller/udpServer.js');
var users = require('../model/user.js');
var crypto = require('crypto');
var md5 = crypto.createHash('md5');



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
    
    //传入userName,pwd,res
    this.login = function (userName,pwd,req,res){
        //判断是否存在该用户
        users.isUserExist(userName,function(result){
          //若用户存在
          if(result){
            
            console.log("checking NAME:"+userName+";PWD："+pwd);
            //将传入的pwd进行MD5加密
            //var pwdMD5 = md5.update(pwd).digest('base64');
            var pwdMD5 = crypto.createHash('md5').update(pwd).digest('base64');
            //查找符合用户名和密码的用户
            var query = users.find();
            query.where("username",userName);
            //比对MD5加密后的密码
            query.where("pwd",pwdMD5);
            query.exec(function(err,docs){

                //如果没有符合用户名密码
                if(docs.length==0){
                   res.end("PassWordError"); 
                }else{
                //找到匹配的用户名密码               
                   //建立session
                   if(req.session.username == null){
                    req.session.username = userName;
                    req.session.role = docs[0].role; 
                    console.log("Creat Session username:"+req.session.username);
                    console.log("Creat Session role:"+req.session.role); 
                   }
                   
                   
                   res.end("LoginSuccess");
                }
            })
            
          }else{
            //用户不存在
            res.end("User Not Found");
          }  
        })
    }
}

module.exports = common;