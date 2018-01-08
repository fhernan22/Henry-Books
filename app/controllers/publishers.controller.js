var mysql		= require('mysql'),
  	connection	= require('../database/connection');


module.exports = {
	publisherInsert: publisherInsert,
	publisherUpdate: publisherUpdate,
	publisherDelete: publisherDelete
}

function publisherInsert(req, res) {
	req.checkBody('pubCode', 'Publisher Code is required').notEmpty();
	req.checkBody('pubName', 'Publisher Name is required').notEmpty();
	req.checkBody('pubCity', 'Publisher City is required').notEmpty();

	req.checkBody('pubCode', 'The maximum lenght for publisher code is 3 characters').isLength({ max: 3 });
	req.checkBody('pubName', 'The maximum lenght for publisher name is 12 characters').isLength({ max: 25 });
	req.checkBody('pubCity', 'The maximum lenght for city is 12 characters').isLength({ max: 20 });

	var errors = req.validationErrors();

	if (errors) {
		req.flash('errors', errors.map(err => err.msg));
		res.redirect('/maintenance/publisher-insert');
	} else {
		var db = mysql.createConnection(connection);

		db.connect();

		db.query("INSERT INTO publisher(publisherCode, publisherName, city) VALUES ('" + req.body.pubCode + "', '" + req.body.pubName + "', '" + req.body.pubCity + "')",
			function(error, rows, fields) {
				if (error){
					if (error.code === 'ER_DUP_ENTRY') {
						req.flash('duplicateError', 'Cannot insert duplicate data!');
						res.redirect('/maintenance/publisher-insert');
				} else 
					throw error;
			} else {

				res.render('pages/success');

				db.end();
			}
		});
	}
}

function publisherUpdate(req, res) {
	req.checkBody('pubCode', 'Publisher Code is required').notEmpty();
	req.checkBody('pubName', 'Publisher Name is required').notEmpty();
	req.checkBody('pubCity', 'Publisher City is required').notEmpty();

	req.checkBody('pubCode', 'The maximum lenght for publisher code is 3 characters').isLength({ max: 3 });
	req.checkBody('pubName', 'The maximum lenght for publisher name is 12 characters').isLength({ max: 25 });
	req.checkBody('pubCity', 'The maximum lenght for city is 12 characters').isLength({ max: 20 });

	var errors = req.validationErrors();

	if (errors) {
		req.flash('errors', errors.map(err => err.msg));
		res.redirect('/maintenance/Publisher-Update');
	} else {
		var db = mysql.createConnection(connection);

		db.connect();

		db.query("UPDATE publisher SET publisherName='" + req.body.pubName + "', city='" + req.body.pubCity + "' WHERE publisherCode='" + req.body.pubCode + "'",
				function function_name(error, rows, fields) {
					if (error) 
						throw error;

					console.log(rows);

					if (rows.affectedRows == 0) {
						req.flash('noMatch', 'Publisher ' + req.body.pubCode + ' not in the database');
				 		res.redirect('/maintenance/Publisher-Update');
					} else if (rows.changedRows == 0) {
						req.flash('duplicatedata', 'Your query did not affect database');
				 		res.redirect('/maintenance/Publisher-Update');
					} else {
						res.render('pages/success');

				 		db.end();
					}
				});
	}
}

function publisherDelete(req, res) {
	req.checkBody('pubCode', 'Publisher Code is required').notEmpty();

	req.checkBody('pubCode', 'The maximum lenght for publisher code is 3 characters').isLength({ max: 3 });

	var errors = req.validationErrors();

	if (errors) {
		req.flash('errors', errors.map(err => err.msg));
		res.redirect('/maintenance/Publisher-Delete');
	} else {
		var db = mysql.createConnection(connection);

		db.connect();

		db.query("DELETE FROM publisher WHERE publisherCode=?", [req.body.pubCode], function(error, rows, fields) {
			if (error)
				throw error;

			if (rows.affectedRows == 0) {
				req.flash('noMatch', 'Publisher Code ' + req.body.pubCode + ' not in the database');
				res.redirect('/maintenance/Publisher-Delete');
			} else {
				res.render('pages/success');

				db.end();
			}
		});
	}

}























