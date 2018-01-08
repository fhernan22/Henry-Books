var mysql		= require('mysql'),
  	connection	= require('../database/connection');

module.exports = {
	showTables: showTables,
	showBookInsert: showBookInsert,
	showBookDelete: showBookDelete,
	showBookUpdate: showBookUpdate,
	showAuthorsInsert: showAuthorsInsert,
	showAuthorsDelete: showAuthorsDelete,
	showAuthorsUpdate: showAuthorsUpdate,
	showPublishersInsert: showPublishersInsert,
	showPublishersUpdate: showPublishersUpdate,
	showPublishersDelete: showPublishersDelete
}

function showTables(req, res) {
	var desiredTables = ['Book', 'Publisher', 'Author'];

	res.render('pages/maintenance', {desiredTables: desiredTables});
}

function showBookInsert(req, res) {

	res.render('pages/forms/books/book-insert', {message: req.flash('success'),
	 									 errors: req.flash('errors'),
	 									 duplicateError: req.flash('duplicateError')});
}

function showBookDelete(req, res) {

	res.render('pages/forms/books/book-delete', {errors: req.flash('errors'),
	 									 noBook: req.flash('noBook')});
}

function showBookUpdate(req, res) {

	res.render('pages/forms/books/book-update', {errors: req.flash('errors'),
												noBook: req.flash('noBook')});
}

function showAuthorsInsert(req, res) {

	res.render('pages/forms/authors/author-insert', {errors: req.flash('errors')});
}

function showAuthorsUpdate(req, res) {

	res.render('pages/forms/authors/author-update', {errors: req.flash('errors'),
													noMatch: req.flash('noMatch')});
}

function showAuthorsDelete(req, res) {

	res.render('pages/forms/authors/author-delete', {errors: req.flash('errors'),
													noMatch: req.flash('noMatch')});
}

function showPublishersInsert(req, res) {

	res.render('pages/forms/publishers/publisher-insert', {errors: req.flash('errors'),
													duplicateError: req.flash('duplicateError')});
}

function showPublishersUpdate(req, res) {

	res.render('pages/forms/publishers/publisher-update', {errors: req.flash('errors'),
													noMatch: req.flash('noMatch'),
													duplicatedata: req.flash('duplicatedata')});
}

function showPublishersDelete(req, res) {

	res.render('pages/forms/publishers/publisher-delete', {errors: req.flash('errors'),
													noMatch: req.flash('noMatch')});
}



