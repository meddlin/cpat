import { Meteor } from 'meteor/meteor';
import { Person } from './person';

Meteor.methods({
	'person.insert': function insert(data) {
		return Person.insert({
			firstName: data.firstName,
			lastName: data.lastName
		});
	}
});