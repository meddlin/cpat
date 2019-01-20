import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const PdfFileSchema = new SimpleSchema({
	fileName: {
		type: String,
		optional: true
	},
	storagePath: {
		type: String,
		optional: true
	},

	// An experimental idea: store a link to an Elastic instance (or generalized to a "search store").
	//		Storing text content of a single PDF in Mongo and Elastic stores could be to provide very
	//		different capabilities.
	//	Questions:
	//		Can the same functionality be provided in both Mongo and Elastic?
	//		Can the same effective search speed/performance be provided from both?
	//		Is this an effective use of resources?
	//
	//	Perhaps, Mongo could be designed to hold the PDF text content which is immediately useful for
	//	the engagement--AND certain pieces could be moved/removed from Mongo, but without editing the 
	//	content--while Elastic is used to hold and search across the entirety of the PDF "file".
	/*linkToSearchStore: {
		type: String,
		optional: true
	},*/

	pages: {
		type: Array,
		optional: true
	},
	"pages.$": {
		type: Object
	},
	"pages.$.number": {
		type: Number
	},
	"pages.$.content": {
		type: String
	},

	images: {
		type: Array,
		optional: true
	},
	"images.$": {
		type: Object
	},
	"images.$.name": {
		type: String
	},
	"images.$.storagePath": {
		type: String
	},

	/* Relationships */
	relations: {
		type: Array,
		optional: true
	},
	"relations.$": {
		type: Object
	},
	"relations.$.collectionName": {
		type: String
	},
	"relations.$.collectionId": {
		type: String
	}
});

const PdfFile = new Mongo.Collection('pdfFile');
PdfFile.attachSchema(PdfFileSchema);

export default PdfFile;