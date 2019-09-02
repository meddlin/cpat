import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Person } from '../../../../api/person/person';
import { PersonCreateForm } from './PersonCreateForm';
import styles from './PersonCreate.module.scss';

export default PersonCreate = withTracker( (props) => {
	const insertDocFunc = ((data) => {
		Meteor.call('person.insert', data, (err, res) => {
			if (err) console.log(err);
			if (res) console.log(res);
		});
	});

	const loading = '', person = '', personExists = '';
	let meteorSubd = { loading, person, personExists, insertDocFunc };

	return { meteorSubd };
})(PersonCreateForm);