import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const CompanySchema = new SimpleSchema({
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

const Company = new Mongo.Collection('company');
Company.attachSchema(CompanySchema);

export default Company;