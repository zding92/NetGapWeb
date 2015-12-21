var commonlib = require('../common/commonlib');
var udpServer = require('./udpServer.js');
var commonObj = new(commonlib);

exports.checkUser = function(req,res){
    if(req.session.username == null){
        res.end("NoUser");
    }else{
        var dataToFront = new Object();
        dataToFront.username = req.session.username;
        dataToFront.role = req.session.role;
        console.log("Find Session:"+req.session.username);
        res.end(JSON.stringify(dataToFront));
    }
}