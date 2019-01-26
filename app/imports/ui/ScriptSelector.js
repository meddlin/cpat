import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import ReactTable from "react-table";

import FileData from '../api/files/files';
import Targets from '../api/targets/targets';
import './ScriptSelector.css';


class ScriptSelector extends Component {
	constructor(props) {
		super(props);

		this.state = {
			scriptRuns: []
		};

		this.submitScriptToServer = this.submitScriptToServer.bind(this);
		this.checkForPlugins = this.checkForPlugins.bind(this);
	}

	createSampleScript() {
		Meteor.call('insert.exampleScript', function(err, res) {
			if (err) console.log(err);
			if (res) console.log(res);
		});
	}

	submitScriptToServer(relatedTargets) {
		// relate "script submission" call to the 'relatedTargets'
		let scriptResult = "";

		/*Meteor.call('server.pythonNmapParams', this.props.targets, function(err, res) {
			if (err) console.log(err);
			if (res) {
				console.log(res);
				scriptResult = res;
			}
		});*/
		Meteor.call('getPythonOutput', relatedTargets, (err, res) => {
			if (err) console.log(err);
			if (res) console.log(res);
		});
	}

	checkForPlugins() {
		Meteor.call('server.findScriptPlugins', function(err, res) {
			if (err) console.log(err);
			if (res) console.log(res);
		});
	}

	getTableData() {
		let arr = [
			{
				name: '1.sh',
				language: 'shell'
			},
			{
				name: 'my.py',
				language: 'python'
			}
		];

		return arr;
	}
	
	render() {
		const { scriptRuns } = this.state;
		const { targets } = this.props;

		return (
			<div>
			    <h1>Script Selector</h1>

			    <div className="horizontal">
			    	<div id="uploader">
				    	
				    </div>
			    </div>

			    <input id="script-input" type="text" />
			    <div id="script-controls">
				    <div id="run-script-btn" onClick={(() => this.submitScriptToServer(targets))}>Run 'nmap'</div>
				    <div id="run-script-btn" onClick={this.checkForPlugins}>Detect Plugins</div>

				    <div onClick={this.createSampleScript}>Create Sample Entry</div>
			    </div>

			    <h3>Selected Targets</h3>
			    <ul>
			    	{this.props.targets.map((doc) => {
			    		return (<li key={doc._id}>{doc.name}</li>)
			    	})}
			    </ul>

			    <h3>Script Runs</h3>
			    <div id="script-runs">
			    	<ul>
			    		{this.props.files.map(function(doc) {
			    			return (<li key={doc._id}>{doc.runStats ? doc.runStats.toString() : ""}</li>);
			    		})}
			    	</ul>
			    </div>

			    <div>
			    	<ReactTable data={this.getTableData()} columns={[
			    		{
			    			Header: 'Data',
			    			columns: [
			    			{
			    				Header: 'Name',
			    				accessor: 'name'
			    			}, {
			    				Header: 'Language',
			    				accessor: 'language'
			    			}]
			    		}
			    	]} />
			    </div>
			</div>
		);
	}
}

export default withTracker((props) => {
	Meteor.subscribe('filedata.all');
	Meteor.subscribe('targets.selected');

	return {
    	files: FileData.find().fetch(),
    	targets: Targets.find().fetch()
  	};
})(ScriptSelector);