var express 			= require('express'),
	expressLayouts 		= require('express-ejs-layouts'),
	bodyParser 			= require('body-parser'),
	app 				= express(),
	port 				= process.env.port || 8080,
	morgan				= require('morgan')
	session				=require('express-session'),
	cookieParser		= require('cookie-parser'),
	flash				= require('connect-flash'),
	expressValidator 	= require('express-validator');



//configure
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(morgan('dev'));

//use body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());

app.use(cookieParser());
app.use(session({
	secret: process.env.SECRET, 
  	cookie: { maxAge: 60000 },
  	resave: false,    // forces the session to be saved back to the store
  	saveUninitialized: false  // dont save unmodified
}));

app.use(flash());


//set routes
app.use(require('./app/routes'));

//set static files
app.use(express.static(__dirname + '/public'));




//start server
app.listen(port, function() {
	console.log("App listening on http://localhost/" + port);
});