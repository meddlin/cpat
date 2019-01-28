import { Meteor } from 'meteor/meteor';
import FileData from '../files';

Meteor.publish('filedata.all', function fileDataAll_Publication() {
	return FileData.find();
});

Meteor.publish('filedata.single', function fileDataSingle_Publication(docId) {
	return FileData.find({ _id: docId });
});