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
	
	//点击开启UDP服务器按钮
	$(".btn-udp").click(function(){
		udpStatus = true;
		startUdpServer();  
  	})
    
    //点击文件提交按钮  
    $("#fileUploadBtn").click(function(){
        $("#fileForm").submit();
    }); 
    
    var timerControl = setInterval(getHardwares,3000);
});

//启用Bootstrap Table
$(function(){
  var $table = $("#hardwareTable1").bootstrapTable({
        striped: true,
		pagination: true,
		height: 800,
		pageSize: 30,
        columns:[{
            field:'register',
            title:'register',
        },
        {
            field:'sourceIP',
            title:'sourceIP',
            editable: {
                type: 'text'
            }
        },
        {
            field:'destinationIP',
            title:'destinationIP',
            editable: {
                type: 'text'
            }
        }]        
        
  })
})

// $(function(){   
// 	//每隔1秒执行getHardwares
// 	setInterval(getHardwares,3000);// 注意函数名没有引号和括弧！ 
// 	// 使用setInterval("getHardwares()",1000);会报“缺少对象” 
// })

function getHardwares(){
	// console.log("ready");
	//UDP服务器启动后，获取Hardware信息
	if (udpStatus){
		$.ajax({
			url: "/view/getHardwares",
			type: "GET",
			success: function(callback){
				console.log("callback="+callback);
				//JSON对象
                var callbackJSON;
                //将后台传来的JSON字符串转换为JSON对象
                eval("callbackJSON="+callback);
                console.log(callbackJSON);  
                //判断现有出现的设备是否依旧是工作设备，如若不是，则在显示中删除
                $(".control-devlist").children().each(function(){
                    //此变量代表显示的设备是否为现有设备
                    var devStillWork = false;
                    //如果显示设备出现在callbackJSON中，则是现有设备
                    for(var hardwareCnt in callbackJSON){
                        if($(this).text() == callbackJSON[hardwareCnt].ip+":"+callbackJSON[hardwareCnt].port){
                            devStillWork = true;
                        }
                    }
                    if(!devStillWork){
                        $(this).remove();
                    }
                })  
                
                 //对callbackJSON中的每个元素进行操作
                for (var hardwareCnt in callbackJSON) {
                    //判断现有设备是否已经显示
                    var isExisted = false;
                    $(".control-devlist").children().each(function(){
                        if($(this).text() == callbackJSON[hardwareCnt].ip+":"+callbackJSON[hardwareCnt].port){
                            isExisted = true;
                        }
                    })
                    //若现有设备未显示，则添加显示
                    if(!isExisted){
                        $(".control-devlist").append("<option>"+callbackJSON[hardwareCnt].ip+":"+callbackJSON[hardwareCnt].port+"</option>")
                    }
                }    
            }
		})
	}
}


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
 