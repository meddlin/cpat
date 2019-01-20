import { Meteor } from 'meteor/meteor';
import { Scripts } from '../scripts';

Meteor.publish('scripts.all', function scriptsAll_Publication() {
	return Scripts.find();
});