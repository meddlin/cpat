import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import ReactTable from "react-table";

import Scripts from '../../../api/scripts/scripts';
import './ScriptCreate.css';


class ScriptCreate extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			tool: '',
			command: '',
			language: ''
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.updateName = this.updateName.bind(this);
	}

	handleSubmit() {
		const { name, tool, command, language } = this.state;

		let scriptDoc = {
			name: name,
			tool: tool,
			toolCommand: command,
			language: language
		};
		Meteor.call('scripts.insert', scriptDoc, (err, res) => {
			if (err) console.log(err);
			if (res) console.log(res);
		});
	}

	updateName(evt) {
		this.setState({ name: evt.target.value });
	}

	updateTool(evt) {
		this.setState({ tool: evt.target.value });
	}

	updateCommand(evt) {
		this.setState({ command: evt.target.value });
	}

	updateLanguage(evt) {
		this.setState({ language: evt.target.value });
	}
	
	render() {
		return (
			<div>
			    <h1>Script Create</h1>

			    <p>Name: </p>
			    <input type="text" onChange={ (evt) => this.updateName(evt) } />

			    <p>Tool: </p>
			    <input type="text" onChange={ (evt) => this.updateTool(evt) } />

			    <p>Tool Command: </p>
			    <input type="text" onChange={ (evt) => this.updateCommand(evt) } />

			    <p>Language: </p>
			    <input type="text" onChange={ (evt) => this.updateLanguage(evt) } />

			    <div id="submit" onClick={this.handleSubmit}>Create</div>
			</div>
		);
	}
}

export default withTracker((props) => {
	return {};
})(ScriptCreate);