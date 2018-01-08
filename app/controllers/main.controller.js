module.exports = {
	showHome: showHome,
	showMaintenance: showMaintenance
	// showCatalog: showCatalog
}


function showHome(req, res) {
	res.render('pages/index');
}

function showMaintenance(req, res) {
	res.render('pages/maintenance');
}

// function showCatalog(req, res) {
// 	res.render('pages/catalog');
// }


// function showBooks(req, res) {
// 	console.log('pages/books');
// }

//404
// function show404(req, res, next) {
// 	res.status(404);
// 	res.render('pages/not-found');
// }