require('dotenv/config');

//create connection
var connection = {
	host: 'localhost',
	user: 'root',
	password: process.env.DB_PASSWORD,
	database: 'henrybooks'
};


// connection.connect(function(error) {
// 	if (error) {
// 		console.log('Error');
// 	} else {
// 		console.log('connected');
// 	}
// });

module.exports = connection;