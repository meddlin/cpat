import { Meteor } from 'meteor/meteor';
import FileData from './files';

Meteor.methods({

	'fileData.insert': function dataInsert(data) {

		return FileData.insert({ source: data });
	},

	'server.xmlToJson': function xmlToJsonConvert() {
		const { spawn, exec } = require('child_process');
		/*const child = spawn('pwd');*/
		console.log('test python file Meteor method call...');
		var file_path = process.env.PWD + "/fileconv.py";
		var datafile_path = process.env.PWD + "/nmap-out.xml";

		var py = spawn('python', [file_path, datafile_path]);
		var dataString = '';
		py.stdout.on('data', function(data) {
			dataString += data.toString();
			console.log(dataString);
		});
		py.stderr.on('data', (data) => {
		  	console.error(`child stderr:\n${data}`);
		});
		py.stdout.on('end', function() {
			console.log('end of stream');
		});

		
		/*exec("python " + "fileconv.py", function(err, stdout, stderr) {
				if (err) console.log(err);
				if (stdout) console.log(stdout);
				if (stderr) console.log(stderr);
			});*/

		/*var Fiber = Meteor.require('fibers');

		new Fiber(function() {
			console.log('test python file Meteor method call...');
			var file_path = process.env.PWD + "../../../../fileconv.py";

			
		}).run();*/
	}
});