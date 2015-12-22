$(document).ready(function(){
	//点击login，显示登录模态框
	$(".login-btn").click(function(){
    	$("#loginModal").modal('show');
 	})
	//点击login模态框中的登录，进行登录
	$(".loginConfirm").click(function(){
		var dataToBack = $("#loginForm").serialize();
		//alert(dataToBack);
		$.ajax({
            data: dataToBack,
            url: "/login",
            type: "GET", 
            success: function(data){
                //alert(data);
                dataHandler(data);
                
            }
        })
	})
  
    checkUser();
    
    
    $(".logout").click(function(){
        $.ajax({
            url: "/logout",
            type: "GET", 
            success: function(data){
                //alert(data);
                dataHandler(data);
                
            }
        }) 
    })
})

function dataHandler(data){
    switch(data){
        case "User Not Found": swal("错误", "不存在此用户", "error");
            break;
        case "PassWordError": swal("错误", "密码错误", "error");
            break;
        case "LoginSuccess": swal("成功", "登录成功", "success");
             $("#loginModal").modal('hide');
             checkUser();
            break;
        case "logout": swal("成功", "退出成功", "success");
                checkUser();
            break;
    }
}

//获取后台的用户相关Session
function checkUser(){
    $.ajax({
        url: "/checkUser",
        type: "GET",
        success: function(data){
            //alert(data);
            //如果用户已经登录
            if(data!="NoUser"){
                //解析传来数据为对象，对象存在username,role两个值
                var dataObj = JSON.parse(data);
                //显示username
                $(".headUserName").text(dataObj.username);
                //显示头像
                $(".headUserIcon").css("display","inline-block");
                //显示logout
                $(".logout").css("display","inline-block");
                //隐藏登录按钮
                $(".login-btn").css("display","none");
            }else{ 
                //显示登录按钮
                $(".login-btn").css("display","inline-block");
                //隐藏用户名
                $(".headUserName").text("");
                //隐藏logout
                $(".logout").css("display","none");
                //隐藏头像
                $(".headUserIcon").css("display","none");
            }
        }
    })
}

