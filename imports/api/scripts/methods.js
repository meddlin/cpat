import { Meteor } from 'meteor/meteor';
import Scripts from './scripts';

Meteor.methods({
	// proof-of-concept to pass multiple parameters to python process
	'server.pythonNmapParams': function pythonParams() {
		const bound = Meteor.bindEnvironment((callback) => {
			callback();
		});

		const { spawn, exec } = require('child_process');
		var paramStr = "nmap 192.168.1.1 -oX ";
		var pyScriptPath = process.env.PWD + "/nmap-scan.py";
		var outputFilePath = process.env.PWD + "/nmap-from-cpat-result.xml";
		paramStr = paramStr + outputFilePath;

		let dataString = '';

		// can potentially "validate" the param string here

		bound(() => {
			var py = spawn('python', [pyScriptPath, paramStr]);
			py.stdout.on('data', function(data) {
				dataString += data.toString();
				console.log('from on->data: ' + dataString);
			});
			py.stderr.on('data', function(data) {
				console.error(`child stderr:\n${data}`);
			});
			py.stdout.on('end', function() {
				console.log(dataString);
				console.log('end of stream');
			});
		});
	}
});