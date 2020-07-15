import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Company from '../../../api/company/company';

// TODO : Get dynamic imports working for the Person collection
/*async function importPersonMod() {
  const p = await import("../../api/company/company");
  Person = p;
}
*/

class CompanyPreview extends Component {
	constructor(props) {
		super(props);
	}

	/**
	 * Get the _id of the document to be displayed.
	 * @param  {string} docId The id of the document to be found within the subscribed data.
	 * @return {string}       [description]
	 */
	getDisplay(docId) {
		let data = this.props.company.find((f) => f._id == docId);
		return (data) ? data._id : '';
	}

	render() {
		const { ready, company } = this.props;

		if (!ready) {
	    	return <div>Loading...</div>
	    } else {

	    	return (
				<div>
					<h5>Company</h5>
					<div>
						<div>Id: {company ? this.getDisplay(this.props.docId) : 'No data to display'}</div>
					</div>
				</div>
			);
	    }
	}
};

export default withTracker((props) => {
	const docId = props.docId;
	const handle = Meteor.subscribe('company.single', docId);

	return {
		ready: handle.ready(),
    	company: Company.find().fetch()
  	};
})(CompanyPreview);