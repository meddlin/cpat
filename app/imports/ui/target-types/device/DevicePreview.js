import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Device from '../../../api/device/device';

// TODO : Get dynamic imports working for the Person collection
/*async function importPersonMod() {
  const p = await import("../../api/device/device");
  Person = p;
}
*/

class DevicePreview extends Component {
	constructor(props) {
		super(props);
	}

	/**
	 * Get the _id of the document to be displayed.
	 * @param  {string} docId The id of the document to be found within the subscribed data.
	 * @return {string}       [description]
	 */
	getDisplay(docId) {
		let data = this.props.device.find((f) => f._id == docId);
		return (data) ? data._id : '';
	}

	render() {
		const { ready, device } = this.props;

		if (!ready) {
	    	return <div>Loading...</div>
	    } else {

	    	return (
				<div>
					<h5>Device</h5>
					<div>
						<div>Id: {device ? this.getDisplay(this.props.docId) : 'No data to display'}</div>
					</div>
				</div>
			);
	    }
	}
};

export default withTracker((props) => {
	const docId = props.docId;
	const handle = Meteor.subscribe('device.single', docId);

	return {
		ready: handle.ready(),
    	device: Device.find().fetch()
  	};
})(DevicePreview);