import { Meteor } from 'meteor/meteor';
import { Targets } from '../targets';

Meteor.publish('targets.all', function targetsAll_Publication() {
	return Targets.find();
});