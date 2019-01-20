import { Meteor } from 'meteor/meteor';
import { PdfFile } from './pdf-files';

Meteor.methods({
	'pdfFile.insert': function insert(data) {
		return PdfFile.insert({
			fileName: data.fileName
		});
	}
});