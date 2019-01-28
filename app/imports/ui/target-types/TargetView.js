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
		/*import('../../api/person/person')
			.then((col) => {
				console.log(col);
			});*/
		let target = Meteor.call('targets.getRelatedData', docId, (err, res) => {
			if (err) console.log(err);
			if (res) this.setState({ target: res });
		});

		/*if (res.collectionType.toLowerCase() === "person" && res.documentId) {
					person = Meteor.call('person.single', res.documentId);
				}*/



				/*if (res.relations[0].collectionName.toLowerCase() === "scripts") {
					let s = Meteor.call('scripts.single', res.relations[0].documentId);
					console.log(s);
				}*/

		/*Meteor.call('targets.getRelatedData', docId, (err, res) => {
			if (err) console.log(err);
			if (res) {
				console.log(res);

				if (res.collectionType.toLowerCase() === "person") {
					

					if (res.documentId) {
						Meteor.call('person.single', res.documentId, (err, res) => {
							if (err) console.log(err);
							if (res) console.log(res);
						});
					}
					
				}

				for (var relationIdx = 0; relationIdx < res.relations.length; relationIdx++) {
					if (res.relations[relationIdx].collectionName.toLowerCase() === "scripts") {
						
						Meteor.call('scripts.single', res.relations[relationIdx].documentId, (err, res) => {
							if (err) console.log(err);
							if (res) console.log(res);
						})
					}
				}
			}
		})*/
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

				<div onClick={this.getTargetRelatedData}>Get Relations</div>
				<input type="text" />

				<p>{this.state.target.collectionType}</p>
				<ul>
				{ this.state.target.relations ? 
					this.state.target.relations.map((r) => { 
						return (
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
						);
					}) : ''}
				</ul>

				
			</div>
		);
	}
};

// TODO : Finish subscribing to the publication.

export default withTracker((props) => {
	/*const docId = props.docId;*/
	/*let docId = "QEd38PRkQTzNHbFsE";*/

	let docId = props.match.params.id;
	Meteor.subscribe('targets.single', docId);

	return {
    	subdTarget: Targets.find().fetch()
  	};
})(TargetView);