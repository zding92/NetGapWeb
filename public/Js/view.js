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
	
});