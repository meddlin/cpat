import { Mongo } from 'meteor/mongo';

export const FileData = new Mongo.Collection('filedata');

/*
	Index created with:
	db.filedata.createIndex( { source: "text" } )
*/