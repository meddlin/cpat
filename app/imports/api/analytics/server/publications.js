import { Meteor } from 'meteor/meteor';
import { Analytics } from '../analytics';

Meteor.publish('analytics.all', function analyticsAll_Publication() {
	return Analytics.find();
});