var mysql		= require('mysql'),
  	connection	= require('../database/connection');

module.exports = {
	showBooks: showBooks,
	showBook: showBook,
	insertBook: insertBook,
	deleteBook: deleteBook,
	updateBook:updateBook
}

function showBooks(req, res) {
	var db = mysql.createConnection(connection);
	db.connect();

	var results = null;
	var input = req.body.searchbook;	//Holds the value of the request body to check if user entered anything
	var books = [];


	db.query('SELECT title, bookCode FROM Book WHERE title LIKE ?', '%' + [req.body.searchbook] + '%', function(error, rows, fields) {
		if (error)
			throw error;

		results = rows;

		for (let result of results) {
			books.push(result);
		}

		res.render('pages/books', {books: books, input: input});

		db.end();
	});	
}

function showBook(req, res) {


	var db = mysql.createConnection(connection);
	db.connect();

	var results = null;
	var book = {title:"", onHand:0, branches:"", publisherName:"", authors:""};
	var onHandTotal = 0;

	db.query("select title, OnHand, branchname, publishername, concat(authorFirst, ' ', authorlast) as authorName from book b, inventory i, branch br, publisher p, author a, wrote w where b.bookcode = i.bookcode and i.branchnum = br.branchnum and b.publishercode = p.publishercode and a.authornum = w.authornum and b.bookcode = w.bookcode and b.bookCode=?", [req.params.bookCode], function(error, rows, fields) {
		if (error)
			throw error;

		results = rows;
		branchesList = []
		authorsList = []

		// console.log(results);

		for (let result of results) {
			book.title = result.title;
			book.onHand += result.OnHand;
			book.publisherName = result.publishername;

			if (!branchesList.includes(result.branchname))
				branchesList.push(result.branchname);
			
			if (!authorsList.includes(result.authorName))
				authorsList.push(result.authorName);
		}

		book.branches = branchesList.join(', ');
		book.authors = authorsList.join(', ');


		res.render('pages/book', {book: book});

		db.end();
	});

	
}

function insertBook(req, res) {

	req.checkBody('booktitle', 'Book title is required').notEmpty();
	req.checkBody('bookcode', 'Book code is required').notEmpty();
	req.checkBody('publishercode', 'Publisher code is required').notEmpty();
	req.checkBody('booktype', 'Book type is required').notEmpty();
	req.checkBody('radiogroup', 'Paperback?').notEmpty();
	req.checkBody('copynum', 'Insert number of copies').notEmpty();
	req.checkBody('quality', 'Book condition is required').notEmpty();
	req.checkBody('price', 'Price is required').notEmpty();
	req.checkBody('branchnum', 'Branch number is required').notEmpty();

	req.checkBody('booktitle', 'The maximum lenght for book title is 40 characters').isLength({ max: 40 });
	req.checkBody('bookcode', 'The maximum lenght for book code is 4 characters').isLength({ max: 4 });
	req.checkBody('publishercode', 'The maximum lenght for publisher code is 3 characters').isLength( { max: 3 });
	req.checkBody('booktype', 'The maximum lenght for the book type is 3 characters').isLength( { max: 3 });
	req.checkBody('copynum', 'The maximum lenght for number of copies is 2 characters').isLength( { max: 2 });
	req.checkBody('quality', 'The maximum lenght for book condition is 20 characters').isLength( { max: 20 });
	req.checkBody('price', 'The maximum lenght for price is 8 characters').isLength( { max: 8 });
	req.checkBody('branchnum', 'The maximum lenght for price is 8 characters').isLength( { max: 8 });

	var errors = req.validationErrors();

	if (errors) {
		req.flash('errors', errors.map(err => err.msg));
		res.redirect('/maintenance/book-insert');
	} else {

		var db = mysql.createConnection(connection);
		var book_code = [req.body.bookcode];
		var booktitle = [req.body.booktitle];
		var publishercode = req.body.publishercode;
		var booktype = req.body.booktype;
		var paperback = req.body.radiogroup;

		db.connect();

		db.query("INSERT INTO book VALUES ('" + [book_code] + "' , '" + [booktitle] + "' , '" +
				 						  [publishercode] + "' , '" + [booktype] + "' , '" +
				 						  [paperback] + "')",
				 						  function(error, rows, fields) {
			if (error){
				if (error.code === 'ER_DUP_ENTRY') {
					req.flash('duplicateError', 'Cannot insert duplicate data!');
					res.redirect('/maintenance/book-insert');
					return;
				} else 
					throw error;
			}

			req.flash('success', 'Boook inserted succesfully!');
			req.flash('bookinsert', 'Book Inserted!');


		});


		db.query("INSERT INTO Copy(bookCode, branchNum, copyNum, quality, price) VALUES ('" + req.body.bookcode + "', '" + req.body.branchnum + "', '" + req.body.copynum + "', '" + req.body.quality + "', '" + req.body.price + "')",
			function(error, rows, fields) {
				if (error) {
					if (error.code === 'ER_DUP_ENTRY') {
						// res.redirect('/maintenance/book-insert');
						return;
					} else 
						throw error;
				}

				res.render('pages/success');

				db.end();

			});			
	}

}

function deleteBook(req, res) {

	req.checkBody('bookcode', 'Book code is required').notEmpty();

	var errors = req.validationErrors();

	if (errors) {
		req.flash('errors', errors.map(err => err.msg));
		res.redirect('/maintenance/book-delete');
	} else {

		var db = mysql.createConnection(connection);

		db.connect();

		db.query("DELETE FROM Book WHERE bookCode=?", [req.body.bookcode], function(error, rows, fields) {
			if (error)
				throw error;

			if (rows.affectedRows == 0) {
				req.flash('noBook', 'Book not in the database!');
				res.redirect('/maintenance/book-delete');
				return;
			}

		})

		db.query("DELETE FROM copy WHERE bookcode=?", [req.body.bookcode], function(error, rows, fields) {
			if (error)
				throw error;

			if (rows.affectedRows == 0) {
				// res.redirect('/maintenance/book-delete');
			}
			else {
				res.render('pages/success');
			
				db.end();	
			}

		})


	}
	
}

function updateBook(req, res) {
	req.checkBody('newname', 'New book title is required').notEmpty();
	req.checkBody('publishercode', 'Publisher Code is required').notEmpty();
	req.checkBody('booktype', 'Book type is required').notEmpty();
	req.checkBody('radiogroup', 'Paperback?').notEmpty();

	req.checkBody('newname', 'The maximum lenght for book title is 40 characters').isLength({ max: 40 });
	req.checkBody('bookcode', 'The maximum lenght for book code is 4 characters').isLength({ max: 4 });
	req.checkBody('publishercode', 'The maximum lenght for publisher code is 3 characters').isLength( { max: 3 });
	req.checkBody('booktype', 'The maximum lenght for the book type is 3 characters').isLength( { max: 3 });

	var errors = req.validationErrors();

	if (errors) {
		req.flash('errors', errors.map(err => err.msg));
		res.redirect('/maintenance/book-update');
	} else {
		var db = mysql.createConnection(connection);

		db.connect();

		db.query("UPDATE book SET title = '" + [req.body.newname] + "', publishercode = '" +
		 		[req.body.publishercode] + "', type= '" + [req.body.booktype] + "', paperback= '" +
		 		[req.body.radiogroup] + "' WHERE bookCode = '" + [req.body.bookcode]+ "'",
		 		function(error, rows, fields) {

			if (error)
				throw error;

			if (rows.changedRows == 0) {
				req.flash('noBook', req.body.bookcode + ' is not in the database!');
				res.redirect('/maintenance/book-update');
			}

		});

		db.query("UPDATE copy SET branchNum = '" + [req.body.branchnum] + "', copyNum = '" +
		 		[req.body.copynum] + "', quality= '" + [req.body.quality] + "', price= '" +
		 		[req.body.price] + "' WHERE bookCode = '" + [req.body.bookCode]+ "'",
		 		function(error, rows, fields) {

			if (error)
				throw error;

			res.render('pages/success');
			
			db.end();	

		});

	}
}

















