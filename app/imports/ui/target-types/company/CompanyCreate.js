import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Company from '../../../api/company/company';

import { CompanyCreateForm } from './CompanyCreateForm';

export default CompanyCreate = withTracker( (props) => {
	//const docId = props.docId;
	//const companyHandle = Meteor.subscribe('company.single', docId);
	//const loading = !companyHandle.ready();
	//const company = Company.findOne(docId);
	//const companyExists = !loading && !!company;

	const insertDocFunc = ((data) => {
		Meteor.call('company.insert', data, (err, res) => {
			if (err) console.log(err);
			if (res) console.log(res);
		});
	});
	const loading = '', company = '', companyExists = '';
	let meteorSubd = { loading, company, companyExists, insertDocFunc };

	return { meteorSubd };
})(CompanyCreateForm);