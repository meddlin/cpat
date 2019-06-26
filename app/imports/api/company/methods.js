import { Meteor } from 'meteor/meteor';
import Company from './company';

Meteor.methods({
	'company.insert': function insert(data) {
		return Company.insert({
			name: data.name
		});
	}
});