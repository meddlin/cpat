import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

class PreviewComponent extends Component {

	render() {
		const { ready, subscribedData } = this.props;

		if (!ready) {
			return <div>Loading...</div>
		} else {
			return (
				<ul>
					{subscribedData ? subscribedData.previewFields.map( (pf) => {
						return (<li>{pf}: {subscribedData[`${pf}`]}</li>)
					})}
				</ul>
			);
		}
	}

}

export default withTracker((props) => {
	const { docId, collectionType } = this.props;
	const handle = Meteor.subscribe(`${collectionType}.single`, docId);

	if (collectionType === "Company") return { ready: handle.ready(), subscribedData: import('../api/company/company').then(col => col.find().fetch()) }
	if (collectionType === "Device") return { ready: handle.ready(), subscribedData: import('../api/device/device').then(col => col.find().fetch()) }
	if (collectionType === "Location") return { ready: handle.ready(), subscribedData: import('../api/location/location').then(col => col.find().fetch()) }
	if (collectionType === "PdfFile") return { ready: handle.ready(), subscribedData: import('../api/pdf-files/pdf-files').then(col => col.find().fetch()) }
	if (collectionType === "Person") return { ready: handle.ready(), subscribedData: import('../api/person/person').then(col => col.find().fetch()) }

})(PreviewComponent);