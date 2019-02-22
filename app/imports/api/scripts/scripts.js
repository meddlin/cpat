import SimpleSchema from 'simpl-schema';
import { Mongo } from 'meteor/mongo';

const ScriptSchema = new SimpleSchema({
  name: {
    type: String,
  },
  tool: {
  	type: String
  },
  toolCommand: {
  	type: String
  },
  language: {
    type: String
  },
  scriptPath: {
    type: String
  }
});

const Scripts = new Mongo.Collection('scripts');
Scripts.attachSchema(ScriptSchema);

export default Scripts;