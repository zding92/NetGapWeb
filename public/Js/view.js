$(function(){
	//每隔1秒执行getHardwares
	setInterval(getHardwares,1000);// 注意函数名没有引号和括弧！ 
	// 使用setInterval("getHardwares()",1000);会报“缺少对象” 
});

function getHardwares(){
	// console.log("ready");
	$.ajax({
		url: "/view/getHardwares",
		type: "GET",
		success: function(callback){
			console.log(callback);
			$("body").append(callback);
		}
	})
}


$(document).ready(function(){
	//check UDP server是否已经启动
	$.ajax({
		url: "/view/checkUdpServer",
		type: "GET",
		success: function(data){
	      var dataObj =JSON.parse(data);
          if(dataObj[1]=="running"){
            $(".btn-udp").css("display","none");
            $(".udp-status").text("Udp Server is running at "+dataObj[2]+":"+dataObj[3]);
            $(".udp-status").css("color","#449d44");
          }
		}
	})
	
	
	$(".btn-udp").click(function(){
		udpStatus = true;
		startUdpServer();  
  	})
});

 //开启UDP服务
 function startUdpServer(){
   $.ajax({
        url: "/view/startUdpServer",
        type: "GET",
        success: function(data){
          var dataObj =JSON.parse(data);
          if(dataObj[0]=="success"){
            swal("成功启动UDP Server!", "Udp Server is running at "+dataObj[2]+":"+dataObj[3], "success");
            
            $(".btn-udp").css("display","none");
            $(".udp-status").text("Udp Server is running at "+dataObj[2]+":"+dataObj[3]);
            $(".udp-status").css("color","#449d44");
          }
         
        }
      })
 }