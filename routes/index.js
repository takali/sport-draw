var express = require('express');
var router = express.Router();

var fs = require("fs");
const path = require('path');

// var app = require('express')();
// var server = require('http').Server(app);
// var io = require('socket.io')(server);
// app.listen(3000);

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/front/tos', function(req, res, next) {

	res.io.emit("socketToMe", "test");

	let reqPath = path.join(__dirname, '../public/data.json');
	fs.readFile(reqPath , 'utf8', function (err, data) {
		//Handle Error
		if(!err) {
			//Handle Success
			// console.log("Success"+data);
			// Parse Data to JSON OR
			var jsonObj = JSON.parse(data)
			const hat = jsonObj.tos.chapeau.list;
			const country = jsonObj.tos.country.list;
			const group = jsonObj.tos.group.list;
			//Send back as Response
			// res.end( data );
			res.render('front', { title: 'Express', h: hat, c: country, g: group, e: 4  });
		}else {
			//Handle Error
			res.end("Error: "+err )
		}
	});
});

module.exports = router;

