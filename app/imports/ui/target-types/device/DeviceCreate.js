import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Formik } from 'formik';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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

export default DeviceCreate;

// TODO : Finish subscribing to the publication.

/*export default withTracker((props) => {
	const docId = props.docId;

	Meteor.subscribe('device.single', docId);

	return {
    	device: Device.find().fetch()
  	};
})(DeviceCreate);*/