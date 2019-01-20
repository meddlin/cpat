import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Company } from '../../api/company/company';
import './CompanyView.css';

class CompanyView extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h2>Company</h2>

				<p>Form goes here.</p>
			</div>
		);
	}
};

export default CompanyView;

// TODO : Finish subscribing to the publication.

/*export default withTracker((props) => {
	const docId = props.docId;

	Meteor.subscribe('company.single', docId);

	return {
    	company: Company.find().fetch()
  	};
})(CompanyView);*/