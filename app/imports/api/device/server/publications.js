import { Meteor } from 'meteor/meteor';
import { Device } from '../device';

Meteor.publish('device.all', function deviceAll_Publication() {
	return Device.find();
});

Meteor.publish('device.single', function deviceSingle_Publication(docId) {
	return Device.find({ _id: docId });
});