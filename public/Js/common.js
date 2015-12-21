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
    }
}

//获取后台的用户相关Session
function checkUser(){
    $.ajax({
        url: "/checkUser",
        type: "GET",
        success: function(data){
            //alert(data);
            
            if(data!="NoUser"){
                var dataObj = JSON.parse(data);
                $(".headUserName").text(dataObj.username);
                $(".headUserIcon").css("display","inline-block");
                $(".login-btn").css("display","none");
            }else{ 
                $(".login-btn").css("display","inline-block");
                $(".headUserName").text("");
                $(".headUserIcon").css("display","none");
            }
        }
    })
}