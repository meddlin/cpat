import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const LocationSchema = new SimpleSchema({
	name: {
		type: String,
		optional: true
	},

	/* Relationships */
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

const Location = new Mongo.Collection('location');
Location.attachSchema(LocationSchema);

export default Location;