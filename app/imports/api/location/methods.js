import { Meteor } from 'meteor/meteor';
import { Location } from './location';

Meteor.methods({
	'location.insert': function insert(data) {
		return Location.insert({
			name: data.name
		});
	}
});