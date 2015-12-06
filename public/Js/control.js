$(document).ready(function(){
	//check UDP server是否已经启动
	$.ajax({
		url: "/control/checkUdpServer",
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
        url: "/control/startUdpServer",
        type: "GET",
        success: function(data){
          var dataObj =JSON.parse(data);
          if(dataObj[0]=="success"){
            alert("UDP Server Started");
            $(".btn-udp").css("display","none");
            $(".udp-status").text("Udp Server is running at "+dataObj[2]+":"+dataObj[3]);
            $(".udp-status").css("color","#449d44");
          }
         
        }
      })
 }