import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Targets from '../../api/targets/targets';
import './TargetView.css';

class TargetView extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h2>Target</h2>

				<p>Form goes here.</p>
			</div>
		);
	}
};

//export default TargetView;

// TODO : Finish subscribing to the publication.

export default withTracker((props) => {
	const docId = props.docId;

	Meteor.subscribe('targets.single', docId);

	return {
    	target: Targets.find().fetch()
  	};
})(TargetView);