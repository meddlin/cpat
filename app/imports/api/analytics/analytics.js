import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const AnalyticsSchema = new SimpleSchema({
	name: {
		type: String,
	},
	amount: {
		type: Number
	}
});

const Analytics = new Mongo.Collection('analytics');
Analytics.attachSchema(AnalyticsSchema);

export default Analytics;