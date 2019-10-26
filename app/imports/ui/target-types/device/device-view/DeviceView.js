import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Device } from '../../../../api/device/device';

import styles from './DeviceView.module.scss';

class DeviceView extends Component {
	
	render() {
		const doc = this.props.location.state;

		return (
			<div>
				<div className="ms-fontSize-18">Device</div>

				

				{doc ? (
					<div className="ms-Grid" dir="ltr">
						<div className="ms-Grid-row">
							<div className="ms-Grid-col ms-lg2 ms-fontSize-16">Name</div>
							<div className="ms-Grid-col ms-lg2 ms-fontSize-16">{doc.name}</div>
						</div>
						<div className="ms-Grid-row">
							<div className="ms-fontSize-16">Organizations</div>
							{doc.organizations && doc.organizations.length > 0 ? (
								doc.organizations.map((org, index) => (<li key={index}>{org}</li>))
								) : 
							<div className="ms-fontSize-16">No organizations to show.</div>}
						</div>
						<div className="ms-Grid-row">
							<div className="ms-fontSize-16">Relations</div>
							{doc.relations && doc.relations.length > 0 ? (
								doc.relations.map((rel, index) => (
									<li key={index}>
										<span>{rel.collectionName}</span><span>&#32;&#61;&gt;&#32;</span><span>{rel.collectionId}</span>
									</li>))
								) : 
							<div className="ms-fontSize-16">No relations to show.</div>}
						</div>
					</div>
					) : <p>No device is available for display.</p>
				}
				
			</div>
		);
	}
};

export default DeviceView;