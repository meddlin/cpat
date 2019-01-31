import { Meteor } from 'meteor/meteor';
import { Device } from './device';

Meteor.methods({
	'device.insert': function insert(data) {
		return Device.insert({
			name: data.name
		});
	}
});