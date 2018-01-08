var mysql		= require('mysql'),
  	connection	= require('../database/connection');

module.exports = {
	authorInsert: authorInsert,
	authorUpdate: authorUpdate,
	authorDelete: authorDelete
}

function authorInsert(req, res) {
	req.checkBody('authorF', 'Author first name is required').notEmpty();
	req.checkBody('authorL', 'Author last name is required').notEmpty();

	req.checkBody('authorF', 'The maximum lenght for author first name is 12 characters').isLength({ max: 10 });
	req.checkBody('authorL', 'The maximum lenght for author last name is 12 characters').isLength({ max: 12 });

	var errors = req.validationErrors();

	if (errors) {
		req.flash('errors', errors.map(err => err.msg));
		res.redirect('/maintenance/author-insert');
	} else {
		var db = mysql.createConnection(connection);

		db.connect();

		db.query("INSERT INTO author(authorLast, authorFirst) VALUES ('" + req.body.authorL + "', '" + req.body.authorF + "')",
			function(error, rows, fields) {
			if (error)
				throw error;

			res.render('pages/success');

			db.end();
		} )
	}
}


function authorUpdate(req, res) {
	req.checkBody('authornew', 'New name is required').notEmpty();
	req.checkBody('authorid', 'Author ID is required').notEmpty();

	req.checkBody('authornew', 'The maximum lenght for author last name is 24 characters').isLength({ max: 24 });
	req.checkBody('authorid', 'The maximum lenght for author id is 400').isLength({ max: 2 });

	var errors = req.validationErrors();

	if (errors) {
		console.log("errors");
		req.flash('errors', errors.map(err => err.msg));
		res.redirect('/maintenance/Author-Update');
	} else {

		var db = mysql.createConnection(connection);

		var firstName = req.body.authornew.slice(0, req.body.authornew.indexOf(" "));
		var lastName = req.body.authornew.slice(req.body.authornew.indexOf(" ")+1, req.body.authornew.length);


		db.query("Update author SET authorLast='" + lastName + "', authorFirst='" + firstName + "' WHERE authorNum='" + req.body.authorid + "'",
				 function(error, rows, fields) {
				 	if (error) {
				 		throw error;
				 	}
				 	if (rows.changedRows == 0) {

				 		req.flash('noMatch', 'Auhtor ' + req.body.authorid + ' not in the database');
				 		res.redirect('/maintenance/Author-Update');
				 	} else {

				 		res.render('pages/success');

				 		db.end();
				 	}
				 });
	}
}


function authorDelete(req, res) {
	req.checkBody('authorid', 'Author ID number is required').notEmpty();

	var errors = req.validationErrors();

	if (errors) {
		req.flash('errors', errors.map(err => err.msg));
		res.redirect('/maintenance/author-delete');
	} else {
		var db = mysql.createConnection(connection);

		db.connect();

		db.query("DELETE FROM author WHERE authorNum=?", [req.body.authorid], function(error, rows, fields) {
			if (error)
				throw error;

			if (rows.affectedRows == 0) {
				req.flash('noMatch', 'Auhtor ' + req.body.authorid + ' not in the database');
				res.redirect('/maintenance/Author-Delete');
			} else {
				res.render('pages/success');

				db.end();
			}
		})
	}
}




