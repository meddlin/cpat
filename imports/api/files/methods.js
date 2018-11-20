import { Meteor } from 'meteor/meteor';
import FileData from './files';

Meteor.methods({

	'fileData.insert': function dataInsert(data) {

		return FileData.insert({ source: data });
	}
});