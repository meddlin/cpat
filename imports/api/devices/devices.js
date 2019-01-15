import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const DeviceSchema = new SimpleSchema({
	name: {
		type: String,
		optional: true
	},

	organizations: {
		type: Array,
		optional: true
	},
	"organizations.$": {
		type: String
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

const Device = new Mongo.Collection('device');
Device.attachSchema(DeviceSchema);

export default Device;