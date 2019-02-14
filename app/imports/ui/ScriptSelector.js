import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import ReactTable from "react-table";

import FileData from '../api/files/files';
import Targets from '../api/targets/targets';
import Scripts from '../api/scripts/scripts';
import './ScriptSelector.css';


class ScriptSelector extends Component {
	constructor(props) {
		super(props);

		this.state = {
			scriptRuns: [],
			selectedScript: {}
		};

		this.submitScriptToServer = this.submitScriptToServer.bind(this);
		this.checkForPlugins = this.checkForPlugins.bind(this);
		this.selectScript = this.selectScript.bind(this);
		this.runScript = this.runScript.bind(this);

		this.onChangeScriptName = this.onChangeScriptName.bind(this);
		this.onChangeScriptToolCommand = this.onChangeScriptToolCommand.bind(this);
		this.onChangeScriptPath = this.onChangeScriptPath.bind(this);
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

	selectScript(evt) {
		let name = evt.target.getAttribute('data-name');
		let command = evt.target.getAttribute('data-toolcommand');
		let scriptPath = evt.target.getAttribute('data-scriptpath');
		let data = { name: name, toolCommand: command, scriptPath: scriptPath };

		this.setState({ selectedScript: data });
	}
	runScript() {
		const { selectedScript } = this.state;
		const { targets } = this.props;

		if (selectedScript && targets) {
			Meteor.call('metagoofilSearch', targets, selectedScript, (err, res) => {
				if (err) console.log(err);
				if (res) console.log(res);
			});
		}
	}
	onChangeScriptName(evt) {
		let data = this.state.selectedScript;
		data.name = evt.target.value;

		this.setState({ selectedScript: data });
	}
	onChangeScriptToolCommand(evt) {
		let data = this.state.selectedScript;
		data.toolCommand = evt.target.value;

		this.setState({ selectedScript: data });
	}
	onChangeScriptPath(evt) {
		let data = this.state.selectedScript;
		data.scriptPath = evt.target.value;

		this.setState({ selectedScript: data });
	}

	getTableData() {
		const { scripts } = this.props;

		if (scripts && scripts.length > 0) {
			return scripts.map( (s) => {
				return s
				/*return ({ name: s.name, 
							tool: s.tool, 
							toolCommand: s.toolCommand, 
							language: s.language })*/
			});
		}
	}
	
	render() {
		const { scriptRuns, selectedScript } = this.state;
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

			    {/*toggle between automated-can-select-from-table and a manual user-filled input(s) option*/}
			    <div id="selected-script-display">
			    	<div>
			    		<span>Name: </span> 
			    		<span>{selectedScript ? selectedScript.name : ''}</span>
			    		<input type="text" onChange={(evt) => this.onChangeScriptName(evt)} />
			    	</div>
			    	<div>
			    		<span>cmd: </span> <span>{selectedScript ? selectedScript.toolCommand : ''}</span>
			    		<input type="text" onChange={(evt) => this.onChangeScriptToolCommand(evt)} />
					</div>
					<div>
			    		<span>path: </span> <span>{selectedScript ? selectedScript.scriptPath : ''}</span>
			    		<input type="text" onChange={(evt) => this.onChangeScriptPath(evt)} />
					</div>
					<div>
						<div onClick={this.runScript}>Run</div>
					</div>
			    </div>

			    {/*<h3>Script Runs</h3>
			    <div id="script-runs">
			    	<ul>
			    		{this.props.files.map(function(doc) {
			    			return (<li key={doc._id}>{doc.runStats ? doc.runStats.toString() : ""}</li>);
			    		})}
			    	</ul>
			    </div>*/}

			    <div>
			    	<ReactTable data={this.getTableData()} columns={[
			    		{
			    			Header: 'Scripts',
			    			columns: 
			    			[
			    				{
			    					Header: '',
			    					accessor: 'name',
			    					Cell: row => (<div 
			    						className="script-select-btn" 
			    						data-name={row.original.name} 
			    						data-toolcommand={row.original.toolCommand} 
			    						onClick={(evt) => this.selectScript(evt)}>Select</div>)
			    				},
				    			{
				    				Header: 'Name',
				    				accessor: 'name',
				    				Cell: row => (<Link to={`/scripts/edit/${row.original._id}`}>{row.original.name}</Link>)
				    			}, 
				    			{
				    				Header: 'Tool',
				    				accessor: 'tool'
				    			}, 
				    			{
									Header: 'Tool Cmd',
				    				accessor: 'toolCommand'
				    			}, 
				    			{
				    				Header: 'Language',
				    				accessor: 'language'
				    			}
			    			]
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
	Meteor.subscribe('scripts.all');

	return {
    	files: FileData.find().fetch(),
    	targets: Targets.find().fetch(),
    	scripts: Scripts.find().fetch()
  	};
})(ScriptSelector);