import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Formik } from 'formik';

import { Device } from '../../../api/device/device';
import './DeviceCreate.css';

class DeviceCreate extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h2>Create Device</h2>

				<Formik
					initialValues={{ name: '', organizations: '' }}
					onSubmit={(values, actions) => {
						setTimeout(() => {
							alert(JSON.stringify(values, null, 2));
							actions.setSubmitting(false);
						}, 1000);
			      	}}
					render={props => (
						<form onSubmit={props.handleSubmit}>
							<div id="form_device-create">
								<label>Device Name</label>
								<input
									type="text"
									onChange={props.handleChange}
									onBlur={props.handleBlur}
									value={props.values.name}
									name="name" />
								{props.errors.name && <div id="feedback">{props.errors.name}</div>}

								<label>Organizations</label>
								<input
									type="text"
									onChange={props.handleChange}
									onBlur={props.handleBlur}
									value={props.values.organizations}
									name="organizations" />

								<label>Relations</label>
								<input
									type="text"
									onChange={props.handleChange}
									onBlur={props.handleBlur}
									value={props.values.relations}
									name="relations" />

								<button type="submit">Submit</button>
							</div>
						</form>
					)}
			    />
			</div>
		);
	}
};

export default DeviceCreate;

// TODO : Finish subscribing to the publication.

/*export default withTracker((props) => {
	const docId = props.docId;

	Meteor.subscribe('device.single', docId);

	return {
    	device: Device.find().fetch()
  	};
})(DeviceCreate);*/