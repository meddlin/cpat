import { Meteor } from 'meteor/meteor';
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

	// TODO : Finish writing this method
	'targets.relate': function relateTarget(action) {
		/*
			action = {
				targets: [_id, _id],
				collectionName,
				actionDocId,
			}
		 */

		return Targets.update(
			{_id: { $in: action.targets.map((a) => a._id) }}, 
			{ $push: 
				{ relations: 
					{ collectionName: action.collectionName, documentId: action.actionDocId } 
				} 
			});
	}
});