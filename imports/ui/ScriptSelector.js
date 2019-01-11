import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import ReactTable from "react-table";

import { FileData } from '../api/scripts/scripts';
import './ScriptSelector.css';

class ScriptSelector extends Component {
	constructor(props) {
		super(props);

		this.state = { }
		this.submitScriptToServer = this.submitScriptToServer.bind(this);
	}

	submitScriptToServer() {
		console.log('to submit to server...');
		Meteor.call('server.pythonNmapParams', function(err, res) {
			if (err) console.log(err);
			if (res) console.log(res);
		})
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

		return (
			<div>
			    <h1>Script Selector</h1>

			    <div className="horizontal">
			    	<div id="uploader">
				    	
				    </div>
			    </div>

			    <input id="script-input" type="text" />
			    <div id="run-script-btn" onClick={this.submitScriptToServer}>Run</div>

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
export default ScriptSelector;
/*export default withTracker(() => {
	return {
    	files: FileData.find().fetch()
  	};
})(FileUpload);*/