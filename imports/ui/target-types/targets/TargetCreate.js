import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Targets } from '../../../api/targets/targets';
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
				<h2>Create Target</h2>

				<div>Name</div>
				<input id="target-name" type="text" value={name} onChange={ (evt) => this.updateName(evt) } />

				<div>Collection Id</div>
				<input id="target-collection-id" type="text" value={collectionId} onChange={ (evt) => this.updateCollectionId(evt) } />

				<div>Collection Type</div>
				<input id="target-collection-type" type="text" value={collectionType} onChange={ (evt) => this.updateCollectionType(evt) } />

				<div className="relations">
					<div className="relations-title">Relations</div>
					<div className="relations-row">
						<div>Name</div>
						<div>Id</div>
					</div>
				</div>


				<div id="create-btn" onClick={this.clickCreate}>CREATE SAMPLE</div>
			</div>
		);
	}
}

export default TargetCreate;