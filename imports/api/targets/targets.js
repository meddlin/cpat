import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const TargetsSchema = new SimpleSchema({
	name: {
		type: String,
	},
	region: {
		type: String
	}
});

const Targets = new Mongo.Collection('targets');
Targets.attachSchema(TargetsSchema);

export default Targets;