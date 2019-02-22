import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Location from '../../../api/location/location';
import './LocationView.css';

class LocationView extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h2>Location</h2>

				<p>Form goes here.</p>
			</div>
		);
	}
};

export default withTracker((props) => {
	const docId = props.docId;

	Meteor.subscribe('location.single', docId);

	return {
    	location: Location.find().fetch()
  	};
})(LocationView);