import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import CompanyPreview from '../company/CompanyPreview';
import DevicePreview from '../device/DevicePreview';
import FileDataPreview from '../filedata/FileDataPreview';
import LocationPreview from '../location/LocationPreview';
import PdfFilePreview from '../pdf-files/PdfFilePreview';
import PersonPreview from '../person/PersonPreview';
import ScriptDataPreview from '../scripts/ScriptDataPreview';
import TargetPreview from '../targets/TargetPreview';

import Targets from '../../../api/targets/targets';
import './TargetView.css';

class TargetView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			target: {},
			scriptData: []
		}
	}

	componentDidMount() {
		let id = this.props.match.params.id;
	}

	render() {
		const { subdTarget } = this.props;

		return (
			<div>
				<h2>Target</h2>

				<p>Type: {subdTarget ? subdTarget.collectionType : ''}</p>

				<h4>Relations</h4>
				<ul>
				{ subdTarget ? 
					subdTarget.relations.map((r) => { 

						{/*
							TODO : Loop over all types--generalized--so the type names aren't hard-coded, and
							we can handle new types being added to the architecture without updating this list
							every time.
						*/}

						if (r.collectionName === "Company") return ( <CompanyPreview docId={r.documentId} />);
						if (r.collectionName === "Device")return (<DevicePreview docId={r.documentId} />);
						if (r.collectionName === "File") return (<FileDataPreview docId={r.documentId} />);
						if (r.collectionName === "Scripts") return (<FileDataPreview docId={r.documentId} />);
						if (r.collectionName === "Location")return (<LocationPreview docId={r.documentId} />);
						if (r.collectionName === "PdfFile")return (<PdfFilePreview docId={r.documentId} />);
						if (r.collectionName === "Person") return ( <PersonPreview docId={r.documentId} />);
						if (r.collectionName === "Scripts") return ( <ScriptDataPreview docId={r.documentId} />);
						if (r.collectionName === "Target")return (<TargetPreview docId={r.documentId} />);

					}) : ''}
				</ul>

			</div>
		);
	}
};

export default withTracker((props) => {
	let docId = props.match.params.id;
	Meteor.subscribe('targets.single', docId);

	return {
    	subdTarget: Targets.findOne()
  	};
})(TargetView);