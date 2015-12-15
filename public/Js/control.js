$(document).ready(function(){
	//check UDP server是否已经启动
	$.ajax({
		url: "/control/checkUdpServer",
		type: "GET",
		success: function(data){
      if(data!=''){
        var dataObj =JSON.parse(data);
          if(dataObj[1]=="running"){
            $(".btn-udp").css("display","none");
            $(".udp-status").text("Udp Server is running at "+dataObj[2]+":"+dataObj[3]);
            $(".udp-status").css("color","#449d44");
          }
      }	      
		}
	})
	
	
	$(".btn-udp").click(function(){
		udpStatus = true;
		startUdpServer();  
  	})
    
    
  $("#fileUploadBtn").click(function(){
    //ajaxFileUpload();
    $("#fileForm").submit();
    
  });
  

});

$(function(){
  $("#hardwareTable1").bootstrapTable({
    striped: true,
		pagination: true,
		height: 800,
		pageSize: 30
  }).on('load-success.bs.table', function (e, data, row){
    
  })
})

 //开启UDP服务
 function startUdpServer(){
   $.ajax({
        url: "/control/startUdpServer",
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
 
 
  function ajaxFileUpload(){
    $.ajaxFileUpload
    (
      {
        url:"/control/uploadFile", //用于文件上传的服务器端请求地址
        secureuri: false, //是否需要安全协议，一般设置为false
        fileElementId: 'file1', //文件上传域的ID 
        dataType: 'json', //返回值类型 一般设置为json
        success: function(data,status){
          alert(data);
        },
        error: function (data, status, e){//服务器响应失败处理函数 
            alert(e);
        }
      }
    )
    return false;
  }