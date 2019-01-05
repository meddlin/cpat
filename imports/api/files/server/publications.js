import { Meteor } from 'meteor/meteor';
import { FileData } from '../files';

Meteor.publish('filedata.all', function fileDataAll_Publication() {
	return FileData.find();
});