function udpServer()  { 
  //服务器UDP端口号
  var localUdpPort = 61018;
  var dgram = require("dgram");
  var server = dgram.createSocket("udp4");
  var message = new Buffer("Hi");
  var udpData = 'initial';
  var reqinfo = '';
  
  
  //PortBinded用于存放UDPServer的Port 
  var PortBinded;
  //获取服务器IP
   var localIpAdd = getIPAdress();
  //var localIpAdd = "172.1.1.144";
  //将服务器IP的字符串转换为数组
  var localIpArray = localIpAdd.split(".");
  console.log("local ip is:"+localIpArray);
  var broadcastIpArray =localIpArray;
  //将服务器IP数组最后一位改为255，变为广播IP
  broadcastIpArray[3] = 255;
  console.log("Broadcast ip is:"+broadcastIpArray);
  var broadcastIp = broadcastIpArray.toString();
  
  //serverStatus表明目前的服务器工作情况
  var serverStatus=new Array();
  serverStatus['status'] = "stopped";
  serverStatus['address'] = localIpAdd;
  serverStatus['port'] = localUdpPort;
  
  //dev为每个Client的对象
  var dev = new Object();
  dev.ip = "";
  dev.port = "";
  //临时存储读到的Client信息，每两秒给devCurrent后清空
  var devTemp;
  devTemp.dev = new Array();
  //实际存在的client每两秒由devTemp更新
  var devCurrent;
  devCurrent.dev = new Array();
  
//   setTimeout(function() {
//     document.write('<p>Hello there.</p>');
//   }, 2000);
  
  
  
  
  //改变ServerStatusFlag，并将改变完的值返回
  this.getServerStatus = function(){
    return serverStatus;
  }
  
  this.getData = function() {
    return udpData;
  };
  
  this.sendUdpData = function(data) {      
    console.log(reqinfo);
    server.send(data, 0, data.length, reqinfo.port, reqinfo.address);  
  }
  
  this.broadcastUdpData = function(data) {      
    console.log(reqinfo);
    console.log("ready to broadcast to 255.255.255.255:8080");
    server.send(data, 0, data.length, 8080, "192.168.1.115");  
  }
  
  this.getUdpClientInfo = function(){
    return reqinfo;
  }
  
  //利用close函数关闭UDP Server
  this.closeUdpServer = function(){
    server.close();
  }
  
  server.on("error", function (err) {
    console.log("server error:\n" + err.stack);
    server.close();
  });

  server.on("message", function (msg, rinfo) {
    //        //将devTemp中不存在的Client信息放入devTemp中
    // //if(devTemp.dev.indexOf(rinfo)<0){
    //    //devTemp.dev.push(rinfo);
    //    console.log("devTemp.dev:"); 
    // //} 
      
    
     
    udpData = msg;
    reqinfo = rinfo;
    console.log(reqinfo); 
    console.log("server got: " + msg + " from " +
      rinfo.address + ":" + rinfo.port);      
    server.send(message, 0, message.length, rinfo.port, rinfo.address);
    
    
  });

  server.on("listening", function () {
    var address = server.address();
    console.log("server listening " +
        address.address + ":" + address.port);
  });
  
  this.startUdpServer = function(){
    server.bind(localUdpPort); 
    serverStatus['status'] = "running";    
    console.log("UDP binded to "+localIpAdd+":"+localUdpPort);
  }
}

function getIPAdress(){  
    var interfaces = require('os').networkInterfaces();  
    for(var devName in interfaces){  
          var iface = interfaces[devName];  
          for(var i=0;i<iface.length;i++){  
               var alias = iface[i];  
               if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){  
                     return alias.address;  
               }  
          }  
    }  
}  

module.exports = udpServer;


