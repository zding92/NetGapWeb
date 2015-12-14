var commonlib = require('../common/commonlib');
var udpServer = require('./udpServer.js');

var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var util = require('util');

var readline = require('readline');

var commonObj = new(commonlib);

var UPLOAD_FOLDER = "/upload/"

exports.startUdpServer = function(){
	var dataToFront = commonObj.startUdpServer();
	return (dataToFront);
}


exports.checkUdpServer = function(){
	var dataToFront = commonObj.checkUdpServer();
	return (dataToFront);
}

exports.fileUpload = function(req,res){
		console.log("fileUpload Used");		
		var form = new formidable.IncomingForm();
		form.encoding = "utf-8";  //设置编码
		form.uploadDir = 'public' + UPLOAD_FOLDER; //设置上传目录
		form.keepExtensions = true;	 //保留后缀
		form.maxFieldsSize = 5 * 1024 * 1024;   //文件大小	 //设置上传目录
		//设置文件后缀名
		form.parse(req,function(err,fields,files){
			switch(files.file.type){
				case "application/vnd.ms-excel": var extName = "csv";
				break;
			}
		console.log("Upload File Type is:"+extName);
		//设置文件存储名称
		var uploadFileName = "configOver"+"."+extName;
		console.log("Upload File Full Name is:"+uploadFileName);
		console.log("File is to written to:"+files.file.path);
		//设置文件存储全路径
		var newPath = form.uploadDir + uploadFileName;
		console.log("New Path is:"+newPath);
		fs.renameSync(files.file.path, newPath);  //重命名		
		console.log("Finaly, File Upload to newPath");			
	})
	return ("filedUploaded");	
}

exports.getConfigFile = function(res,boardNum){
	var dataToFront = "[";
	var dataLine = new Array();
	
	//根据硬件号码，获取配置文件名
	switch(boardNum){
		case "1": var fileName = "configOver.csv";
			break;
	}
	//文件全路径
	var fileFullPath = "./public"+UPLOAD_FOLDER+fileName;
	//读取文件流选项
	var options = {encoding:'utf8',flag:'r'};
	//创建读取文件流
	var fileReadStream = fs.createReadStream(fileFullPath,options);
	//将读取文件流绑定至逐行读取
	var rl = readline.createInterface({input:fileReadStream});
	rl.on('line',function(line){
		if (line!= ""){
			//去除最后一个逗号
			line = line.substring(0, line.length-1);
			console.log("line:"+line);
			
			var lineArr =  line.split(",");
			
			dataLine['register'] = lineArr[0] + '-' + lineArr[1] + '-'+lineArr[2];
			dataLine['sourceIP'] = lineArr[3] + '.' + lineArr[4] + '.'+lineArr[5]+'.'+lineArr[6];
			dataLine['destinationIP'] = lineArr[7] + '.' + lineArr[8] + '.'+lineArr[9]+'.'+lineArr[10];
			dataToFront = dataToFront + addArrToJson(dataLine);
			dataToFront = dataToFront + ",";
			console.log("datatofront:"+dataToFront);
		}		
		
		
	}).on('close',function(){
		console.log(fileFullPath+":closed");
		//去除最后一个逗号
		dataToFront = dataToFront.substring(0, dataToFront.length-1);
		dataToFront = dataToFront + "]";

		res.end(dataToFront);
	})
	
}


//将一个一维数组加入JSON字符串
function addArrToJson(arr){
	var JSONString = "{"
	for (arrCnt in arr){
		JSONString = JSONString + '"' + arrCnt + '":"' + arr[arrCnt] + '",';
	}
	//去除最后一个逗号
	JSONString = JSONString.substring(0, JSONString.length-1);
	//补上最后的大括号
	JSONString = JSONString + '}';
	return(JSONString);
}