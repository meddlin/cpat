import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const FileDataSchema = new SimpleSchema({
	source: {
		type: String,
		optional: true
	},
	runStats: {
		type: String,
		optional: true
	},
	dateCreated: {
		type: Date,
		optional: true
	}
});

const FileData = new Mongo.Collection('filedata');
FileData.attachSchema(FileDataSchema);

export default FileData;