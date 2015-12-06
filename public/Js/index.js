$(document).ready(function(){
  
  $('#indexCarousel').carousel({
    interval: 4000
  })
   
  comeFromLeftInit("#hash1 .col-md-8"); 
  comeFromRightInit("#hash1 .col-md-4");
  comeFromLeftInit("#hash2 .col-md-4"); 
  comeFromRightInit("#hash2 .col-md-8");
  
  //点击开始UDP Server
  $(".btn-udp").click(function(){
    udpStatus = true;
    startUdpServer();  
  })
  
  
  //check UDP server是否已经启动
	$.ajax({
		url: "/checkUdpServer",
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
})  

//表明hash1是否已经显示过
var hash1Viewed = false;
var hash2Viewed = false;
$(window).scroll(function(){
  //如果hash1不曾显示
  if(hash1Viewed == false){
    //hash1出现
     if (inView("#hash1")){
       console.log("get hash1");
       //标明hash1已经显示
       hash1Viewed = true;
       hashDivDisplay("#hash1 .col-md-8");
       hashDivDisplay("#hash1 .col-md-4");     
     }
  }
  
    //如果hash2不曾显示
  if(hash2Viewed == false){
    //hash2出现
     if (inView("#hash2")){
       console.log("get hash2");
       //标明hash2已经显示
       hash2Viewed = true;
       hashDivDisplay("#hash2 .col-md-8");
       hashDivDisplay("#hash2 .col-md-4");     
     }
  }
 
  
})
  
 
 //判断selector是否在显示范围内
 function inView(selector){
   var option = 50;
   var winTop = $(window).height();
   var winScrolled = $(window).scrollTop();
   var selectorTop = $(selector).offset().top;
   if (winScrolled+winTop>selectorTop+option){
     return true
   }
   else{return false}   
 }
 
 //将selector用 动画的形式调整回原位、恢复原透明度
 function hashDivDisplay(selector){
     $(selector).animate({
        opacity:'1',
        left: "0px"
      },"800");
 }
 
 //将selector的透明度降为0，并初始化左移
 function comeFromLeftInit(selector){
   $(selector).css("opacity","0");
   $(selector).css("left","-50px");
 }
 //将selector的透明度降为0，并初始化右移
 function comeFromRightInit(selector){
   $(selector).css("opacity","0");
   $(selector).css("left","50px");
 }
 

 //开启UDP服务
 function startUdpServer(){
   $.ajax({
        url: "/startUdpServer",
        type: "GET",
        success: function(data){
          
          var dataObj =JSON.parse(data);
          //后台数据请求成功
          if(dataObj[0]=="success"){
            alert("UDP Server Started");
            $(".btn-udp").css("display","none");
            $(".udp-status").text("Udp Server is running at "+dataObj[2]+":"+dataObj[3]);
            $(".udp-status").css("color","#449d44");
          }
                  
        }//success
    })//ajax
 }
 
 
//function switchNavUdp(flag){
//    if (flag){
//      $(".btn-udp").removeClass("btn-success");
//      $(".btn-udp").addClass("btn-danger");
//      $(".btn-udp").text("Stop UDP Server");
//      $(".udp-status").text("UDP Server is Running");
//      $(".udp-status").css("color","#449d44");
     
//    }else{
//      $(".btn-udp").removeClass("btn-danger");
//      $(".btn-udp").addClass("btn-success");
//      $(".btn-udp").text("Run Udp Server");
//      $(".udp-status").text("Udp Server Stopped");
//      $(".udp-status").css("color","#c9302c");
//     //  $.ajax({
//     //     url: "/closeUdpServer",
//     //     type: "GET",
//     //     success: function(){
//     //       alert("UDP Server Stopped");
//     //     }
//     //   })
     
//    }
//  }