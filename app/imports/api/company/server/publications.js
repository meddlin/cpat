import { Meteor } from 'meteor/meteor';
import Company from '../company';

Meteor.publish('company.all', function companyAll_Publication() {
	return Company.find();
});

Meteor.publish('company.single', function companySingle_Publication(docId) {
	return Company.find({ _id: docId });
});