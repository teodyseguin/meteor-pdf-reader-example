'use strict';

var xml2js = require('xml2js');
var fs = require('fs');
var path = require('path');
var parser = new xml2js.Parser();

fs.readFile(
	path.resolve(process.env.HOMEPATH + '/.uploads/complete/result-9d539cda-c8bf-4836-843b-d86b8ffbaadb.xml'),
	function(err, data) {
		parser.parseString(data, function(err, result) {
			let json = JSON.stringify(result);
			console.log(json);
		});
	}
);
