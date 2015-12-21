var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// model's data structure
var userSchema = new Schema({
	username: {type: String, unique: true},
	pwd: String,
	role: String
}, {collection: 'users'});

// compile model
var users = mongoose.model('users', userSchema);

// hang a method for check user is exist or not
users.isUserExist = function(username, callback) {
	var query = users.count();
	query.where('username', username);
	query.exec(function(err, count) {

        console.log("find "+username+" count:"+count);
		if (count > 0) callback(true);
		else if (count == 0) callback(false);
	});
}

module.exports = users;