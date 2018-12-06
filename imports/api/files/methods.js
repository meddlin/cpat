import { Meteor } from 'meteor/meteor';
import FileData from './files';

Meteor.methods({

	'fileData.insert': function dataInsert(data) {

		return FileData.insert({ source: data });
	},

	'server.startNmapScan': function startNmapScan() {
		// bind environment with Meteor.bindEnvironment

		// 1) pass nmap scan (script) to python
		// 2) kickoff python w/ nmap script

		// 3) Use python to throw output into MongoDB
	},

	'server.xmlToJson': function xmlToJsonConvert() {
		const bound = Meteor.bindEnvironment((callback) => {
			callback();
		});
		const { spawn, exec } = require('child_process');

		var file_path = process.env.PWD + "/fileconv.py";
		var datafile_path = process.env.PWD + "/nmap-out.xml";
		let dataString = '';

		bound( () => {
			var py = spawn('python', [file_path, datafile_path]);

			py.stdout.on('data', function(data) {
				dataString += data.toString();
			});
			py.stderr.on('data', (data) => {
			  	console.error(`child stderr:\n${data}`);
			});
			py.stdout.on('end', function() {
				console.log('end of stream');
				/*console.log(dataString);*/
			});

		});	

	}
});