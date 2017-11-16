var express = require('express');
var router = express.Router();

var fs = require("fs");
const path = require('path');

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

/* GET admin home. */
router.get('/', function(req, res) {
  res.send('Welcome in the TOS module');
});

router.get('/interface', function(req, res) {

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
			res.render('admin', { title: 'Express', h: hat, c: country, g: group, e: 4 });
		}else {
			//Handle Error
			res.end("Error: "+err )
		}
	});
});

router.post('/update', function(req, res) {
	// get group, position country
	console.log('update');
	console.log(req.body);
	// update json file
	// socket emit
	res.io.emit("moveTeam", req.body);
	res.json(true);
});

module.exports = router;
