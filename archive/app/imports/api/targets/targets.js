import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/*
Collection Relations -- an array of relationships
[
	{
		collectionName: "",
		collectionId: 00001
	}
]
*/

const TargetsSchema = new SimpleSchema({
	name: {
		type: String,
		optional: true
	},
	region: {
		type: String,
		optional: true
	},
	collectionType: {
		type: String,
		optional: true
	},
	documentId: {
		type: String,
		optional: true
	},

	selected: {
		type: Boolean,
		optional: true
	},
	relations: {
		type: Array,
		optional: true
	},
	"relations.$": {
		type: Object
	},
	"relations.$.collectionName": {
		type: String
	},
	"relations.$.documentId": {
		type: String
	}
});

const Targets = new Mongo.Collection('targets');
Targets.attachSchema(TargetsSchema);

export default Targets;