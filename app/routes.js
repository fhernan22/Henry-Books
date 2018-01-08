var express 				= require('express'),
  	router 					= express.Router(),
  	path 					= require('path'),
  	siteController 			= require('./controllers/main.controller'),
  	booksController 		= require('./controllers/books.controller'),
  	catalog 				= require('./controllers/catalog.controller'),
  	maintenance 			= require('./controllers/maintenance.controller'),
  	authorsController 		= require('./controllers/authors.controller'),
  	publishersController 	= require('./controllers/publishers.controller');


//export the router
module.exports = router;


// apply routes
router.get('/', 										siteController.showHome);
router.get('/maintenance', 								maintenance.showTables);

router.get('/maintenance/Book-Insert', 					maintenance.showBookInsert);
router.post('/maintenance/book-Insert', 				booksController.insertBook);

router.get('/maintenance/Book-Delete', 					maintenance.showBookDelete);
router.post('/maintenance/Book-Delete', 				booksController.deleteBook);

router.get('/maintenance/Book-Update', 					maintenance.showBookUpdate);
router.post('/maintenance/Book-Update', 				booksController.updateBook);

router.get('/maintenance/Author-Insert', 				maintenance.showAuthorsInsert);
router.post('/maintenance/Author-Insert', 				authorsController.authorInsert);

router.get('/maintenance/Author-Delete', 				maintenance.showAuthorsDelete);
router.post('/maintenance/Author-Delete', 				authorsController.authorDelete);

router.get('/maintenance/Author-Update', 				maintenance.showAuthorsUpdate);
router.post('/maintenance/Author-Update', 				authorsController.authorUpdate);

router.get('/maintenance/Publisher-Insert',				maintenance.showPublishersInsert);
router.post('/maintenance/Publisher-Insert',			publishersController.publisherInsert);

router.get('/maintenance/Publisher-Update',				maintenance.showPublishersUpdate);
router.post('/maintenance/Publisher-Update',			publishersController.publisherUpdate);

router.get('/maintenance/Publisher-Delete',				maintenance.showPublishersDelete);
router.post('/maintenance/Publisher-Delete',			publishersController.publisherDelete);

router.get('/catalog', 									catalog.showAllTables);
router.get('/catalog/:Tables_in_henrybooks', 			catalog.showSingleTable);
router.post('/books',									booksController.showBooks);
router.get('/books/:bookCode', 							booksController.showBook);


// router.use(show404);
