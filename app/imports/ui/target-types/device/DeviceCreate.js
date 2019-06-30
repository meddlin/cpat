import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Device from '../../../api/device/device';
import { DeviceCreateForm } from './DeviceCreateForm';
import './DeviceCreate.css';

export default DeviceCreate = withTracker( (props) => {
	//const docId = props.docId;
	//const deviceHandle = Meteor.subscribe('device.single', docId);
	//const loading = !deviceHandle.ready();
	//const device = Device.findOne(docId);
	//const deviceExists = !loading && !!device;

	const insertDocFunc = ((data) => {
		Meteor.call('device.insert', data, (err, res) => {
			if (err) console.log(err);
			if (res) console.log(res);
		});
	});

	const loading = '', device = '', deviceExists = '';
	let meteorSubd = { loading, device, deviceExists, insertDocFunc };

	return { meteorSubd };
})(DeviceCreateForm);

/*class DeviceCreate extends Component {
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
								<Typography variant="button" gutterBottom>Device Name</Typography>
								<TextField
									type="text"
									onChange={props.handleChange}
									onBlur={props.handleBlur}
									value={props.values.name}
									name="name" />
								{props.errors.name && <div id="feedback">{props.errors.name}</div>}

								<Typography variant="button" gutterBottom>Organizations</Typography>
								<TextField
									type="text"
									onChange={props.handleChange}
									onBlur={props.handleBlur}
									value={props.values.organizations}
									name="organizations" />

								<Typography variant="button" gutterBottom>Relations</Typography>
								<TextField
									type="text"
									onChange={props.handleChange}
									onBlur={props.handleBlur}
									value={props.values.relations}
									name="relations" />

								<Typography variant="button" gutterBottom>Relations Table</Typography>
								<Paper>
									<Table>
										<TableHead>
											<TableRow>
												<TableCell>_id</TableCell>
												<TableCell align="right">Collection Type</TableCell>
												<TableCell align="right">name</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											<TableRow>
												<TableCell component="th" scope="row"></TableCell>
												<TableCell align="right"></TableCell>
												<TableCell align="right"></TableCell>
								            </TableRow>
										</TableBody>
									</Table>
							    </Paper>

								<button type="submit">Submit</button>
							</div>
						</form>
					)}
			    />
			</div>
		);
	}
};

export default DeviceCreate;*/

/*export default withTracker((props) => {
	const docId = props.docId;

	Meteor.subscribe('device.single', docId);

	return {
    	device: Device.find().fetch()
  	};
})(DeviceCreate);*/