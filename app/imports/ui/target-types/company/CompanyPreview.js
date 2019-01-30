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

		this.state = {
			preview: {}
		}
	}

	findPreviewFromSubscribed() {
		if (this.props.company.length > 0) {
			let p = this.props.company.find((f) => f._id == this.props.docId);
			
			if (p && p._id) this.setState({ preview: p });
		}		
	}

	getDisplay(docId) {
		let data = this.props.company.find((f) => f._id == docId);
		return (data) ? data._id : '';
	}

	render() {
		

		if (!this.props.ready) {
	    	return <div>Loading...</div>
	    } else {

	    	return (
				<div>
					<h5>Company</h5>
					<div>
						<div>Id: {this.props.company ? this.getDisplay(this.props.docId) : 'No data to display'}</div>
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