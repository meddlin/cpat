import { Meteor } from 'meteor/meteor';
import Targets from '../targets';

Meteor.publish('targets.all', function targetsAll_Publication() {
	return Targets.find();
});

Meteor.publish('targets.single', function targetsSingle_Publication(docId) {
	return Targets.find({ _id: docId });
});