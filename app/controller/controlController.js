var commonlib = require('../common/commonlib');
var udpServer = require('./udpServer.js');

var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var util = require('util');

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
	
	form.parse(req,function(err,fields,files){
		switch(files.file.type){
			case "application/vnd.ms-excel": var extName = "csv";
			break;
		}

		console.log("Upload File Type is:"+extName);
		var uploadFileName = "configOver"+"."+extName;
		console.log("Upload File Full Name is:"+uploadFileName);
		console.log("File is to written to:"+files.file.path);
		
		var newPath = form.uploadDir + uploadFileName;
		console.log("New Path is:"+newPath);
		fs.renameSync(files.file.path, newPath);  //重命名
		
		console.log("Finaly, File Upload to newPath");
		
	})
	return ("filedUploaded");
	
}