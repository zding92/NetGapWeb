$(function(){   
	//每隔1秒执行getHardwares
	setInterval(getHardwares,3000);// 注意函数名没有引号和括弧！ 
	// 使用setInterval("getHardwares()",1000);会报“缺少对象” 
	
	  
	checkUdpLoading();

})

function getHardwares(){
	// console.log("ready");
	//UDP服务器启动后，获取Hardware信息
	if (udpStatus){
		$.ajax({
			url: "/view/getHardwares",
			type: "GET",
			success: function(callback){
				console.log("callback="+callback);
                //callback = "[{'ip':'192.168.1.1','port':'8080'},{'ip':'192.168.1.2','port':'8081'}]";
				//JSON对象
                var callbackJSON;
                //将后台传来的JSON字符串转换为JSON对象
                eval("callbackJSON="+callback);
                console.log(callbackJSON);
                
                $(".devList").empty();
                //$(".devList2 .row").empty();
                //判断现有出现的设备是否依旧是工作设备，如若不是，则在显示中删除
                $(".devList2 .row").children().each(function(){    
                    //此变量代表显示的设备是否为现有设备
                    var devStillWork = false;
                    //如果显示设备出现在callbackJSON中，则是现有设备
                    for(var hardwareCnt in callbackJSON){
                        if(($(this).attr("ip")==callbackJSON[hardwareCnt].ip) && ($(this).attr("port")==callbackJSON[hardwareCnt].port)){
                            devStillWork = true;
                        }
                    }
                    if(!devStillWork){
                        $(this).remove();
                    }
                })
                //对callbackJSON中的每个元素进行操作
                for (var hardwareCnt in callbackJSON) {
                   if(loadingReady){
					   //$("body").append(callback);
                       $(".devList").append("<br>Device"+hardwareCnt+"--"+callbackJSON[hardwareCnt].ip+":"+callbackJSON[hardwareCnt].port);
                       //判断现有设备是否已经显示
                       var isExisted = false;
                       $(".devList2 .row").children().each(function(){
                           if(($(this).attr("ip")==callbackJSON[hardwareCnt].ip) && ($(this).attr("port")==callbackJSON[hardwareCnt].port)){
                               isExisted = true;
                           }
                       })
                       //若现有设备未显示，则添加显示
                       if(!isExisted){
                          $(".devList2 .row").append(
                           "<div class='card shadow' ip='"+callbackJSON[hardwareCnt].ip+"'port='"+callbackJSON[hardwareCnt].port+"'>"+
                                " <div class='loader'><span></span><span></span><span></span><span></span><span></span><span></span><span></span>"+
                                        "<span></span><span></span> <span></span><span></span><span></span><span></span><span></span><span></span>"+
                                    "</div>"+
                                "<p class='card-text1'>"+callbackJSON[hardwareCnt].ip+"</p>"+
                                "<p class='card-text2'>Port:"+callbackJSON[hardwareCnt].port+"</p>"+
                           "</div>") 
                       }       
                    } 
                }
                //如果没有device
                if(callback == "[]"){
                    $(".nodevice").css("display","block");
                }else{
                    $(".nodevice").css("display","none");
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
			if(data!=''){
				var dataObj =JSON.parse(data);
				if(dataObj[1]=="running"){
                    
                    udpStatus = true;
                    
					$(".btn-udp").css("display","none");
					$(".udp-status").text("Udp Server is running at "+dataObj[2]+":"+dataObj[3]);
					$(".udp-status").css("color","#449d44");
				}
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