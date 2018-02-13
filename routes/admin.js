var express = require('express');
var router = express.Router();

var fs = require("fs");
const path = require('path');

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

let jsonContent = null;
let jsonFile    = null;

/* GET admin home. */
router.get('/', function(req, res) {
  res.send('Welcome in the TOS module');
});

router.get('/interface/:sport/:competition', function(req, res) {

	const sport = req.params.sport,
       competition = req.params.competition;

    jsonFile = '../public/data/'+sport+'/'+competition+'.json';

	let reqPath = path.join(__dirname, jsonFile);
	fs.readFile(reqPath , 'utf8', function (err, data) {
		//Handle Error
		if(!err) {
			//Handle Success
			// console.log("Success"+data);
			// Parse Data to JSON OR
			var jsonObj = JSON.parse(data);
			jsonContent = jsonObj;
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

	// UPDATE JSON
	let country = jsonContent.tos.country.list;
	for (var key in country) {
		var elem = country[key];
		if(elem.flag == req.body.code)
		{
			elem.group    = req.body.group;
			elem.position = parseInt(req.body.position);
		}
	}
	// console.log(jsonFile)
	// console.log(jsonContent);
	// fs.writeFileSync(jsonFile, jsonContent);
	// fs.appendFile(jsonFile, jsonContent, function (err) {
	//   if (err) throw err;
	//   console.log('Saved!');
	// });
	let newContent = JSON.stringify(jsonContent, null, 4);

	let reqPath = path.join(__dirname, jsonFile);

	fs.unlink(reqPath,function(err){
        if(err) return console.log(err);
        console.log('file deleted successfully');
        fs.writeFile(reqPath, newContent, function(err) {
		    if(err) {
		        return console.log(err);
		    }

		    console.log("The file was saved!");
		}); 
   	});  

	// socket emit
	res.io.emit("moveTeam", req.body);
	res.json(true);
});

module.exports = router;
