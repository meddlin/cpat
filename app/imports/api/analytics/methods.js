import { Meteor } from 'meteor/meteor';
import { Analytics } from './analytics';

Meteor.methods({
	'analytics.insert': function insert(data) {
		return Analytics.insert({
			name: data.targetName,
			amount: data.amount
		});
	}
});