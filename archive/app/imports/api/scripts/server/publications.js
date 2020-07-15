import { Meteor } from 'meteor/meteor';
import Scripts from '../scripts';

Meteor.publish('scripts.all', function scriptsAll_Publication() {
	return Scripts.find();
});

Meteor.publish('scripts.single', function scriptsSingle_Publication(docId) {
	return Scripts.find({ _id: docId});
});