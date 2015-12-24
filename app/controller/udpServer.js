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
  //临时存储读到的Client信息
  var devTemp = new Array(); 


  
  
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
  
  //前台两秒请求一次
  this.getUdpClientInfo = function(){
    
    //var dataToFront = "{"+devCurrent.join(',')+"}";
    
    //将devTemp中的对象转成json字符串
    var dataToFront = "[";
    for (var devTempCnt in devTemp){
        dataToFront = dataToFront + JSON.stringify(devTemp[devTempCnt])+","
    }
    //如果有设备，去除最后一个逗号
    if(dataToFront != "["){
       dataToFront = dataToFront.substring(0, dataToFront.length-1); 
    }	
    dataToFront = dataToFront + "]";
    console.log("devTemp String 2s:"+dataToFront);
    devTemp.splice(0,devTemp.length);
    return dataToFront;
    //return reqinfo;
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
    udpData = msg;
    reqinfo = rinfo;
    console.log(reqinfo);
    console.log("server got: " + msg + " from " +
      rinfo.address + ":" + rinfo.port);
    server.send(message, 0, message.length, rinfo.port, rinfo.address);

    var client = new Object();
    client.ip = rinfo.address;
    client.port = rinfo.port; 
    //读到的Client是否已经在devTemp中
    var isClientInDevTemp = false;
    //将devTemp中不存在的Client信息放入devTemp中
    for(var devTempCnt in devTemp){
        if(equal(devTemp[devTempCnt],client)){
            isClientInDevTemp = true;
        }
    }
    //若读到的Client不在devTemp中，则加入
    if(!isClientInDevTemp)devTemp.push(client);
    console.log("devTemp.dev:"+devTemp); 
    
 

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

//判断两个js对象是否相等
function equal(objA, objB)
{
    if (typeof arguments[0] != typeof arguments[1])
        return false;

    //数组
    if (arguments[0] instanceof Array)
    {
        if (arguments[0].length != arguments[1].length)
            return false;
        
        var allElementsEqual = true;
        for (var i = 0; i < arguments[0].length; ++i)
        {
            if (typeof arguments[0][i] != typeof arguments[1][i])
                return false;

            if (typeof arguments[0][i] == 'number' && typeof arguments[1][i] == 'number')
                allElementsEqual = (arguments[0][i] == arguments[1][i]);
            else
                allElementsEqual = arguments.callee(arguments[0][i], arguments[1][i]);            //递归判断对象是否相等                
        }
        return allElementsEqual;
    }
    
    //对象
    if (arguments[0] instanceof Object && arguments[1] instanceof Object)
    {
        var result = true;
        var attributeLengthA = 0, attributeLengthB = 0;
        for (var o in arguments[0])
        {
            //判断两个对象的同名属性是否相同（数字或字符串）
            if (typeof arguments[0][o] == 'number' || typeof arguments[0][o] == 'string')
                result = eval("arguments[0]['" + o + "'] == arguments[1]['" + o + "']");
            else {
                //如果对象的属性也是对象，则递归判断两个对象的同名属性
                //if (!arguments.callee(arguments[0][o], arguments[1][o]))
                if (!arguments.callee(eval("arguments[0]['" + o + "']"), eval("arguments[1]['" + o + "']")))
                {
                    result = false;
                    return result;
                }
            }
            ++attributeLengthA;
        }
        
        for (var o in arguments[1]) {
            ++attributeLengthB;
        }
        
        //如果两个对象的属性数目不等，则两个对象也不等
        if (attributeLengthA != attributeLengthB)
            result = false;
        return result;
    }
    return arguments[0] == arguments[1];
}

module.exports = udpServer;


