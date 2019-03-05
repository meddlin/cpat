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

import Targets from '../../../api/targets/targets';
import './TargetCreate.css';

class TargetCreate extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			collectionType: '',
			collectionId: ''
		};
		this.clickCreate = this.clickCreate.bind(this);
		this.updateName = this.updateName.bind(this);
		this.updateCollectionId = this.updateCollectionId.bind(this);
		this.updateCollectionType = this.updateCollectionType.bind(this);
	}

	/* Form Updates */

	updateName(evt) {
		this.setState({ name: evt.target.value });
	}
	updateCollectionId(evt) {
		this.setState({ collectionId: evt.target.value });
	}
	updateCollectionType(evt) {
		this.setState({ collectionType: evt.target.value });
	}

	/* Form Submit */

	clickCreate() {
		Meteor.call('targets.insert', 
		{
			name: this.state.name,
			collectionType: this.state.collectionType,
			collectionId: this.state.collectionId
		}, 
		(err, res) => {
			if (err) console.log(`ERROR: target.insert => ${err}`);
			if (res) console.log(`RESULT: target.insert => ${res}`);
		});
	}

	render() {
		let { name, collectionType, collectionId } = this.state;

		return (
			<div>
				<Typography variant="h5" gutterBottom>Create Target</Typography>

				<div className="form-entry__horizontal">
					<Typography variant="button" gutterBottom>Name</Typography>
					<TextField id="target-name" type="text" value={name} onChange={ (evt) => this.updateName(evt) } />
				</div>

				<div className="form-entry__horizontal">
					<Typography variant="button" gutterBottom>Collection Id</Typography>
					<TextField id="target-collection-id" type="text" value={collectionId} onChange={ (evt) => this.updateCollectionId(evt) } />
				</div>

				<div className="form-entry__horizontal">
					<Typography variant="button" gutterBottom>Collection Type</Typography>
					<TextField id="target-collection-type" type="text" value={collectionType} onChange={ (evt) => this.updateCollectionType(evt) } />
				</div>

				<div className="relations">
					<div className="relations-title">Relations</div>
					<div className="relations-row">
						<div>Name</div>
						<div>Id</div>
					</div>
				</div>
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

				<Button variant="contained" onClick={this.clickCreate}>Create Sample</Button>
			</div>
		);
	}
}

export default withTracker((props) => {
	Meteor.subscribe('targets.all');

	return {
    	target: Targets.find().fetch()
  	};
})(TargetCreate);