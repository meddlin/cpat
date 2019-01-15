import { Meteor } from 'meteor/meteor';
import { Location } from '../locations';

Meteor.publish('location.all', function locationAll_Publication() {
	return Location.find();
});

Meteor.publish('location.single', function locationSingle_Publication(docId) {
	return Location.find({ _id: docId });
});