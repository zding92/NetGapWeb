$(function(){
	//每隔1秒执行getHardwares
	setInterval(getHardwares,1000);// 注意函数名没有引号和括弧！ 
	// 使用setInterval("getHardwares()",1000);会报“缺少对象” 
	
	  
	checkUdpLoading();

});

function getHardwares(){
	// console.log("ready");
	//UDP服务器启动后，获取Hardware信息
	if (udpStatus){
		$.ajax({
			url: "/view/getHardwares",
			type: "GET",
			success: function(callback){
				console.log(callback);
				if(loadingReady){
					$("body").append(callback);
				}
				
			}
		})
	}

}


$(document).ready(function(){
	//check UDP server是否已经启动
	$.ajax({
		url: "/view/checkUdpServer",
		type: "GET",
		success: function(data){
	      var dataObj =JSON.parse(data);
          if(dataObj[1]=="running"){
			//表明UDP正在运行
			udpStatus = true;
            $(".btn-udp").css("display","none");
            $(".udp-status").text("Udp Server is running at "+dataObj[2]+":"+dataObj[3]);
            $(".udp-status").css("color","#449d44");
          }
		}
	})
	
	
	$(".btn-udp").click(function(){
		//udpStatus = true;
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
			//表明UDP正在运行
			udpStatus = true;
            swal("成功启动UDP Server!", "Udp Server is running at "+dataObj[2]+":"+dataObj[3], "success");
            
            $(".btn-udp").css("display","none");
            $(".udp-status").text("Udp Server is running at "+dataObj[2]+":"+dataObj[3]);
            $(".udp-status").css("color","#449d44");
          }
         
        }
      })
 }
 
 
 function checkUdpLoading(){
	setTimeout(function(){
		//如果UDP Server is running
		if(udpStatus){
			//3秒后，设置loadingReady
			loadingReady = true;
			//不显示loading窗
			$(".container-gear").css("display","none");	
		}
		else{
			$(".container-gear h1").text("请打开UDP Server");
			checkUdpLoading();
		}	
	}, 3000 )
 }