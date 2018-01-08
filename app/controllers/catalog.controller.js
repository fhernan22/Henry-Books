var mysql		= require('mysql'),
  	connection	= require('../database/connection'),
  	books		= require('./books.controller');

 module.exports = {
 	showAllTables: showAllTables,
 	showSingleTable: showSingleTable
 }


 function showAllTables(req, res) {
 	var db = mysql.createConnection(connection);

 	db.connect();

 	var tables ;

 	db.query('SHOW TABLES', function(error, rows, fields) {
 		if (error)
 			throw error;

 		tables = rows;

 		res.render('pages/catalog', {tables: tables});
 		console.log(req.flash('success'));

 		db.end();
 	});
 }

 function showSingleTable(req, res) {
 	var db = mysql.createConnection(connection);

 	db.connect();

 	var table = [];
 	var tableInfo = {name:"", colNames: []};
 	var query = "SELECT * FROM ";
 	var tableName = req.params.Tables_in_henrybooks;


 	db.query(query + tableName, function(error, rows, fields) {
 		if (error)
 			throw error;


 		tableInfo.name = fields[0].table;

 		
 		for (let col of fields) {
 			tableInfo.colNames.push(col.name);
 		}

 		for (let row of rows) {
 			table.push(row);
 		}

 		res.render('pages/table', {table: table, tableInfo: tableInfo});

 		db.end();
 	});
 }