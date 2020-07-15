import SimpleSchema from 'simpl-schema';
import { Mongo } from 'meteor/mongo';

const ScriptSchema = new SimpleSchema({
  name: {
    type: String,
    optional: true
  },
  tool: {
  	type: String,
    optional: true
  },
  toolCommand: {
  	type: String,
    optional: true
  },
  language: {
    type: String,
    optional: true
  },
  scriptPath: {
    type: String,
    optional: true
  }
});

const Scripts = new Mongo.Collection('scripts');
Scripts.attachSchema(ScriptSchema);

export default Scripts;