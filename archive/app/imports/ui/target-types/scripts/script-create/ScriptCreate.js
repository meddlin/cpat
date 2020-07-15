import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { ScriptsCreateForm } from './ScriptsCreateForm';

import styles from './ScriptCreate.module.scss';


export default ScriptsCreate = withTracker( (props) => {
	const insertDocFunc = ((data) => {
		Meteor.call('person.insert', data, (err, res) => {
			if (err) console.log(err);
			if (res) console.log(res);
		});
	});

	const loading = '', person = '', personExists = '';
	let meteorSubd = { loading, person, personExists, insertDocFunc };

	return { meteorSubd };
})(ScriptsCreateForm);