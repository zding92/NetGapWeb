$(document).ready(function(){
  $('#indexCarousel').carousel({
    interval: 4000
  })
  
  comeFromLeftInit("#hash1 .col-md-8"); 
  comeFromRightInit("#hash1 .col-md-4");
  comeFromLeftInit("#hash2 .col-md-4"); 
  comeFromRightInit("#hash2 .col-md-8");
})  

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