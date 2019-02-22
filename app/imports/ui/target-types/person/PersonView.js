import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Person } from '../../../api/person/person';
import './PersonView.css';

class PersonView extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h2>Person</h2>

				<p>Form goes here.</p>
			</div>
		);
	}
};

export default PersonView;

// TODO : Finish subscribing to the publication.

/*export default withTracker((props) => {
	const docId = props.docId;

	Meteor.subscribe('person.single', docId);

	return {
    	person: Person.find().fetch()
  	};
})(PersonView);*/