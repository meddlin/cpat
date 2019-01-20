import { Meteor } from 'meteor/meteor';
import { PdfFile } from '../pdf-files';

Meteor.publish('pdfFiles.all', function pdfFilesAll_Publication() {
	return PdfFile.find();
});

Meteor.publish('pdfFiles.single', function pdfFilesSingle_Publication(docId) {
	return PdfFile.find({ _id: docId });
});