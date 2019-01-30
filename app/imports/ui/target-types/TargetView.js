import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import FileDataPreview from './filedata/FileDataPreview';

import Targets from '../../api/targets/targets';
import './TargetView.css';

class TargetView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			target: {},
			scriptData: []
		}

		this.getTargetRelatedData = this.getTargetRelatedData.bind(this);
		this.getScriptData = this.getScriptData.bind(this);
		this.setupSubscriptions = this.setupSubscriptions.bind(this);
	}

	componentDidMount() {
		let id = this.props.match.params.id;
	}

	/*
		Is it possible to query an arbitrary collection?--The collection referenced in a Target's relation structure.
	 */
	
	setupSubscriptions(target) {
		if (target[0].collectionType.toLowerCase() === "person" && target[0].documentId) {
			import('../../api/person/person')
				.then((col) => {
					console.log(`imported module ${col}`);
				})
			Meteor.subscribe('person.single', target[0].documentId);
		}

		let scriptsData = target[0].relations.filter( (r) => {
				return (r.collectionName.toLowerCase() == 'scripts')
			});
		if (scriptsData.length > 0) {
			import('../../api/files/files')
				.then((col) => {
					console.log(`imported module ${col.default._collection.name}`);

					let d = col.default._collection.findOne();
					console.log(d);
				});

			for(var i = 0; i < scriptsData.length; i++) {
				Meteor.subscribe('fileData.getSingle', scriptsData[i].documentId);
			}
		}
	}
	
	getTargetRelatedData() {
		let docId = this.props.match.params.id;
		let target = Meteor.call('targets.getRelatedData', docId, (err, res) => {
			if (err) console.log(err);
			if (res) this.setState({ target: res });
		});
	}

	getScriptData(docId) {
		let s = Meteor.call('fileData.getSingle', docId, (err, res) => {
			if (err) console.log(err);
			if (res) {
				let arr = this.state.scriptData;
				arr.push(res);
				this.setState({ scriptData: arr });
			}
		});
	}

	render() {
		return (
			<div>
				<h2>Target</h2>

				<p onClick={(() => this.setupSubscriptions(this.props.subdTarget))}>SubdTarget: {this.props.subdTarget.toString()}</p>

				<p>Form goes here.--for single Target</p>

				<div id="btn-get-relations" onClick={this.getTargetRelatedData}>Get Relations</div>

				<p>Type: {this.state.target.collectionType}</p>

				<h4>Relations</h4>
				<ul>
				{ this.state.target.relations ? 
					this.state.target.relations.map((r) => { 

						{/*
							TODO : Loop over all types--generalized--so the type names aren't hard-coded, and
							we can handle new types being added to the architecture without updating this list
							every time.
						*/}

						{/*if (r.collectionName === "Company") return ( <CompanyPreview />);
						if (r.collectionName === "Device")return (<DevicePreview />);*/}

						if (r.collectionName === "File")return (<FileDataPreview docId={r.documentId} />);
						if (r.collectionName === "Scripts")return (<FileDataPreview docId={r.documentId} />);

						{/*if (r.collectionName === "Location")return (<LocationPreview />);
						if (r.collectionName === "PdfFile")return (<PdfFilePreview />);
						if (r.collectionName === "Person") return ( <PersonPreview />);
						if (r.collectionName === "Scripts") return ( <ScriptDataPreview />);
						if (r.collectionName === "Target")return (<TargetPreview />);*/}

						{/*return (
							<li key={r.documentId} onClick={(() => this.getScriptData(r.documentId))}>
								{r.collectionName}

								<ul>
								{ this.state.scriptData ?
									this.state.scriptData.map( (sd) => {
										return (
											<FileDataPreview key={sd._id} docId={sd._id} />
											)
									}) : ''}
								</ul>
							</li>
						);*/}
					}) : ''}
				</ul>

				
			</div>
		);
	}
};

// TODO : Finish subscribing to the publication.

export default withTracker((props) => {
	let docId = props.match.params.id;

	Meteor.subscribe('targets.single', docId);

	return {
    	subdTarget: Targets.find().fetch()
  	};
})(TargetView);