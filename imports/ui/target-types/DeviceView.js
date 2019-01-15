import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Device } from '../../api/devices/devices';
import './DeviceView.css';

class DeviceView extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h2>Device</h2>

				<p>Form goes here.</p>
			</div>
		);
	}
};

export default DeviceView;

// TODO : Finish subscribing to the publication.

/*export default withTracker((props) => {
	const docId = props.docId;

	Meteor.subscribe('device.single', docId);

	return {
    	device: Device.find().fetch()
  	};
})(DeviceView);*/