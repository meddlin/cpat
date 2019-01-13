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
	"relations.$.collectionId": {
		type: String
	}
});

const Targets = new Mongo.Collection('targets');
Targets.attachSchema(TargetsSchema);

export default Targets;