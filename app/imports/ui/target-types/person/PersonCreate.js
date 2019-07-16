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

import { Person } from '../../../api/person/person';
import styles from './PersonCreate.module.css';

class PersonCreate extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h2>Create Person</h2>

				<Formik
					initialValues={{ 
						firstName: '', 
						middleName: '',
						lastName: '',
						nickNames: '',
						phoneNumbers: '',
						emailAddresses: '',
						organizations: '',
						employers: '',
						socialLinks: '',
						relations: ''
					}}
					onSubmit={(values, actions) => {
						setTimeout(() => {
							alert(JSON.stringify(values, null, 2));
							actions.setSubmitting(false);
						}, 1000);
			      	}}
					render={props => (
						<form onSubmit={props.handleSubmit}>
							<div id="form_person-create">
								<Typography variant="button" gutterBottom>First Name</Typography>
								<TextField
									type="text"
									onChange={props.handleChange}
									onBlur={props.handleBlur}
									value={props.values.name}
									name="name" />
								{props.errors.firstName && <div id="feedback">{props.errors.firstName}</div>}

								<Typography variant="button" gutterBottom>Middle Name</Typography>
								<TextField
									type="text"
									onChange={props.handleChange}
									onBlur={props.handleBlur}
									value={props.values.middleName}
									name="name" />
								{props.errors.middleName && <div id="feedback">{props.errors.middleName}</div>}

								<Typography variant="button" gutterBottom>Last Name</Typography>
								<TextField
									type="text"
									onChange={props.handleChange}
									onBlur={props.handleBlur}
									value={props.values.lastName}
									name="name" />
								{props.errors.lastName && <div id="feedback">{props.errors.lastName}</div>}

								<Typography variant="button" gutterBottom>Nick Names</Typography>
								<TextField
									type="text"
									onChange={props.handleChange}
									onBlur={props.handleBlur}
									value={props.values.nickNames}
									name="name" />
								{props.errors.nickNames && <div id="feedback">{props.errors.nickNames}</div>}

								<Typography variant="button" gutterBottom>Phone Numbers</Typography>
								<TextField
									type="text"
									onChange={props.handleChange}
									onBlur={props.handleBlur}
									value={props.values.phoneNumbers}
									name="name" />
								{props.errors.phoneNumbers && <div id="feedback">{props.errors.phoneNumbers}</div>}

								<Typography variant="button" gutterBottom>Email Addresses</Typography>
								<TextField
									type="text"
									onChange={props.handleChange}
									onBlur={props.handleBlur}
									value={props.values.emailAddresses}
									name="name" />
								{props.errors.emailAddresses && <div id="feedback">{props.errors.emailAddresses}</div>}

								<Typography variant="button" gutterBottom>Organizations</Typography>
								<TextField
									type="text"
									onChange={props.handleChange}
									onBlur={props.handleBlur}
									value={props.values.organizations}
									name="organizations" />
								{props.errors.organizations && <div id="feedback">{props.errors.organizations}</div>}

								<Typography variant="button" gutterBottom>Employers</Typography>
								<TextField
									type="text"
									onChange={props.handleChange}
									onBlur={props.handleBlur}
									value={props.values.employers}
									name="name" />
								{props.errors.employers && <div id="feedback">{props.errors.employers}</div>}

								<Typography variant="button" gutterBottom>Social Links</Typography>
								<TextField
									type="text"
									onChange={props.handleChange}
									onBlur={props.handleBlur}
									value={props.values.socialLinks}
									name="name" />
								{props.errors.socialLinks && <div id="feedback">{props.errors.socialLinks}</div>}

								<Typography variant="button" gutterBottom>Relations</Typography>
								<TextField
									type="text"
									onChange={props.handleChange}
									onBlur={props.handleBlur}
									value={props.values.relations}
									name="relations" />
								{props.errors.relations && <div id="feedback">{props.errors.relations}</div>}

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

								<Button type="submit" variant="contained">Submit</Button>
							</div>
						</form>
					)}
			    />
			</div>
		);
	}
};

export default PersonCreate;

// TODO : Finish subscribing to the publication.

/*export default withTracker((props) => {
	const docId = props.docId;

	Meteor.subscribe('person.single', docId);

	return {
    	person: Person.find().fetch()
  	};
})(PersonCreate);*/