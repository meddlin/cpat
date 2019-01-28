import { Meteor } from 'meteor/meteor';
import Person from './person';

Meteor.methods({
	'person.insert': function insert(data) {
		return Person.insert({
			firstName: data.firstName,
			lastName: data.lastName
		});
	},

	'person.single': function personSingle(docId) {
		return Person.find({ _id: docId });
	}
});