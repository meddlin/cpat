import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const PersonSchema = new SimpleSchema({
	firstName: {
		type: String,
		optional: true
	},
	middleName: {
		type: String,
		optional: true
	},
	lastName: {
		type: String,
		optional: true
	},

	nickNames: {
		type: Array,
		optional: true
	},
	"nickNames.$": {
		type: String
	},

	phoneNumbers: {
		type: Array,
		optional: true
	},
	"phoneNumbers.$": {
		type: String
	},

	emailAddresses: {
		type: Array,
		optional: true
	},
	"emailAddresses.$": {
		type: String
	},

	organizations: {
		type: Array,
		optional: true
	},
	"organizations.$": {
		type: String
	},

	employers: {
		type: Array,
		optional: true
	},
	"employers.$": {
		type: String
	},

	socialLinks: {
		type: Array,
		optional: true
	},
	"socialLinks.$": {
		type: Object
	},
	"socialLinks.$.site": {
		type: String
	},
	"socialLinks.$.url": {
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
		type: String,
		optional: true
	},
	"relations.$.collectionId": {
		type: String,
		optional: true
	}
});

const Person = new Mongo.Collection('person');
Person.attachSchema(PersonSchema);

export default Person;