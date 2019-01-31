import { Meteor } from 'meteor/meteor';
import { MongoInternals } from 'meteor/mongo';

import Targets from './targets';

Meteor.methods({
	'targets.insert': function insert(data) {
		return Targets.insert({
			name: data.name,
			collectionId: data.collectionId,
			collectionType: data.collectionType
		});
	},

	'targets.select': function selectTarget(docId) {
		return Targets.update(
			{ _id: docId }, 
			{ $set: 
				{ selected: true } 
			});
	},
	'targets.deselect': function deselectTarget(docId) {
		return Targets.update(
			{ _id: docId }, 
			{ $set: 
				{ selected: false } 
			});
	},

	'targets.relate': function relateTarget(action) {
		/*
			action = {
				targets: [_id, _id],
				collectionName,
				actionDocId,
			}
		 */

		// Attempting to see if we move this loop up one level, to wrap the Meteor.call('targets.relate') call, if we stop receiving
		// a re-execution on the python script (nmap scan) kickoff.
		/*for (var i = 0; i < action.targets.length; i++) {
			let curr_id = action.targets[i];
			Targets.update(
				{ _id: curr_id }, 
				{
					$push:
						{ relations:
							{ collectionName: action.collectionName, documentId: action.actionDocId } 
						}
				}
			);
		}*/

		// No need to move loops around--or any other low-level Node-Mongo driver trickery--remember the multi parameter 
		// (denoted by { multi: true}).
		// https://docs.mongodb.com/manual/reference/method/db.collection.update/#multi-parameter
		// This parameter allows updating multiple documents that match the query parameter; without it, *only the FIRST* document in
		// the collection to match the query parameter will be updated.
		let res = Targets.update(
			{ _id : { $in: action.targets }}, 
			{
				$push:
					{ relations:
						{ collectionName: action.collectionName, documentId: action.actionDocId } 
					}
			}, { multi: true });

		return res;
	},
	
	'targets.queryRelation': async function(collectionName) {
		// collectionName = "Scripts";
		// 
		async function getCollectionNames() {
			var Future = require('fibers/future');
			var fut = new Future();
			const {client, db} = MongoInternals.defaultRemoteCollectionDriver().mongo;

			/*db.collectionNames((err, res) => {
				if (err) console.log(err);
				fut.return(res);
			});*/

			db.collections((err, res) => {
				if (err) console.log(err);

				/*
				
					Collections are accessible via:
					res[0].s.name -- iterate over the resulting 'res[n]' array that is returned.
				
				 */

				fut.return(res);
			});

			/*db.listCollections((err, res) => {
				if (err) console.log(err);
				fut.return(res);
			});*/

			return fut.wait();
		}

		const res = await getCollectionNames();
		
	}
});