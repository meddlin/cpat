import { Meteor } from 'meteor/meteor';
import { MongoInternals } from 'meteor/mongo';

import Scripts from './scripts';


Meteor.methods({
	'scripts.single': function scriptsSingle(docId) {
		/*let res;
		async function getOne(docId) {
			debugger;
			const { db } = MongoInternals.defaultRemoteCollectionDriver().mongo;
			res = await db.filedata.findOne({ _id: docId });
		}

		getOne();*/
		/*return Scripts.find({ _id: docId }).fetch();*/
		/*return res;*/

		return Scripts.findOne({ _id: docId }, 
			{
				"source": 1,
				"runStats": 1,
				"dateCreated": 1
			});
	},

	'insert.exampleScript': function insertExampleScript() {
		return Scripts.insert({ name: 'insert-from-meteor.py', language: 'test' });
	},

	'server.callToPython': async function callToPython() {

		async function sendToPython() {
			const bound = Meteor.bindEnvironment((callback) => {
				callback();
			});

			const { spawn, exec } = require('child_process');

			/// TODO : Pass parameters from client-side
			///			'paramStr' can be passed in from basic input; unsure how to validate
			///			'pyScriptPath' can be a combination of scripts stored in Mongo, and
			///				a main path stored as an ENV variable. (ex: 'home/meddlin/git/cpat')
			///			'outputFilePath' can be based on same ENV variable, and provided a new name
			///				-- file dialog? in html --
			///			- Allow outputFilePath to also be iterable: new Date(), new Date() + 1, etc.

			var paramStr = "nmap 192.168.1.1 -oX ";

			/*var pyScriptPath = process.env.PWD + "/nmap-scan.py";*/
			var pyScriptPath = "/home/meddlin/git/cpat/tool-scripts/python/nmap-scan.py";
			/*var outputFilePath = process.env.PWD + "/nmap-from-cpat-result.xml";*/
			var outputFilePath = "/home/meddlin/git/cpat/tool-data/nmap-from-cpat-result.xml";

			paramStr = paramStr + outputFilePath;
			let dataString = '';

			// can potentially "validate" the param string here

			let pymongoResult = 'test-id';

			debugger;
			bound(() => {
				var py = spawn('python', [pyScriptPath, paramStr]);
				py.stdout.on('data', function(data) {
					dataString += data.toString();
					console.log('from on->data: ' + dataString);

					// extract pymongo from Python flush results
					if (data.toString().includes('result:')) { // at this point, 'data' is a byte array without calling '.toString()'
						pymongoResult = data.toString().split(': ').pop().replace("'", "");
					}
				});
				py.stderr.on('data', function(data) {
					if (data) console.error(`child stderr:\n${data.toString()}`);
				});
				py.stdout.on('end', function() {
					console.log(dataString);
					console.log('end of stream');
					return pymongoResult;
				});
			});
		}

		const pythonRes = await sendToPython();
		console.log(pythonRes);
	},

	async getPythonOutput(targets) {
		var Future = require('fibers/future');
		var fut = new Future();

		async function callPython(targets) {
			const { spawn, exec } = require('child_process');

			/// TODO : Pass parameters from client-side
			///			'paramStr' can be passed in from basic input; unsure how to validate
			///			'pyScriptPath' can be a combination of scripts stored in Mongo, and
			///				a main path stored as an ENV variable. (ex: 'home/meddlin/git/cpat')
			///			'outputFilePath' can be based on same ENV variable, and provided a new name
			///				-- file dialog? in html --
			///			- Allow outputFilePath to also be iterable: new Date(), new Date() + 1, etc.

			var paramStr = "nmap 192.168.1.1 -oX ";

			/*var pyScriptPath = process.env.PWD + "/nmap-scan.py";*/
			var pyScriptPath = "/home/meddlin/git/cpat/tool-scripts/python/nmap-scan.py";
			/*var outputFilePath = process.env.PWD + "/nmap-from-cpat-result.xml";*/
			var outputFilePath = "/home/meddlin/git/cpat/tool-data/nmap-from-cpat-result.xml";

			paramStr = paramStr + outputFilePath;
			let dataString = '';

			// can potentially "validate" the param string here

			let pymongoResult;
			
			var py = spawn('python', [pyScriptPath, paramStr]);
			py.stdout.on('data', function(data) {
				dataString += data.toString();
				console.log('from on->data: ' + dataString);

				// extract pymongo from Python flush results
				if (data.toString().includes('result:')) { // at this point, 'data' is a byte array without calling '.toString()'
					pymongoResult = data.toString().split(': ').pop().replace("'", "");
				}
			});
			py.stderr.on('data', function(data) {
				if (data) console.error(`child stderr:\n${data.toString()}`);
			});
			py.stdout.on('end', function() {
				console.log(dataString);
				console.log('end of stream');

				fut.return(pymongoResult);
			});

			return fut.wait();
		}

		const res = await callPython(targets);

		// It appears the server is "enthusiastically" re-executing 'this' function ("getPythonOutput()") an amount of
		// executions equal to the number of iterations over the loop on Targets.update()--as Targets is a MongoDB 
		// collection.
		// 
		// It seems this is happening as part of the pub-sub/reactive nature of Meteor, as its trying to anticipate
		// the result(s) of what's happening iterating over Mongo collection changes.
		
		Meteor.call('targets.relate', {
			targets: targets.map(t => t._id),
			collectionName: "Scripts",
			actionDocId: res
		});

		/*for (var docIdx = 0; docIdx < targets.length; docIdx++) {
			Meteor.call('targets.relate', {
				targetId: targets[docIdx]._id,
				collectionName: "Scripts",
				actionDocId: res
			});
		}*/
		
	},

	// proof-of-concept to pass multiple parameters to python process
	'server.pythonNmapParams': function pythonParams(targets) {	
		const res = Meteor.call('server.callToPython', (err, res) => {
			if (res) {
				let action = {
					targets: targets.map(t => t._id),
					collectionName: "Scripts",
					actionDocId: res
				};
				let relationRes = Meteor.call('targets.relate', action);
			}
		});

		return res;
	},

	'server.findScriptPlugins': function findScriptPlugins() {
		const bound = Meteor.bindEnvironment((callback) => {
			callback();
		});

		const { spawn } = require('child_process');
		var scriptDetection = process.env.PWD + "/script-detection.py";
		var pluginDir = process.env.PWD + "/tool-scripts";
		let dataString = '';
		let errString = '';

		bound(() => {
			let py = spawn('python', [scriptDetection]);
			py.stdout.on('data', function(data) {
				dataString += data.toString();
				console.log('python -> ' + dataString);
			});
			py.stderr.on('data', (data) => {
				errString += data.toString();
				console.error('python STDERR -> ' + errString);
			});
		});

		return dataString;
	}
});