import { Meteor } from 'meteor/meteor';
import { Person } from '../person';

Meteor.publish('person.all', function personAll_Publication() {
	return Person.find();
});

Meteor.publish('person.single', function personSingle_Publication(docId) {
	return Person.find({ _id: docId });
});