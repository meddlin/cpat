import { Meteor } from 'meteor/meteor';
import Person from './person';

Meteor.methods({
	'person.insert': function insert(data) {
		return Person.insert({
			firstName: data.firstName,
			middleName: data.middleName,
			lastName: data.lastName,
			nickNames: data.nickNames, 
			organizations: data.organizations, 
			emailAddresses: data.emailAddresses, 
			employers: data.employers, 
			socialLinks: data.socialLinks,
			relations: data.relations 
		});
	},

	'person.single': function personSingle(docId) {
		return Person.find({ _id: docId });
	}
});