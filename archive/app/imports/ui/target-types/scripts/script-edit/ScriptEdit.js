import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import ReactTable from "react-table";

import Scripts from '../../../../api/scripts/scripts';
import styles from './ScriptEdit.module.scss';


class ScriptEdit extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		const { script } = this.props;

		if (script) {
			return (
				<div>
				    <h1>Script Editor</h1>

				    <p>Name: </p><span>{script.name}</span>
				    <p>Tool: </p><span>{script.tool}</span>
				    <p>Tool Command: </p><span>{script.toolCommand}</span>
				    <p>Language: </p><span>{script.language}</span>
				</div>
			);
		} else {
			return (<span>Loading...</span>);
		}
	}
}

export default withTracker((props) => {
	let docId = props.match.params.id;
	Meteor.subscribe('scripts.single', docId);

	return {
    	script: Scripts.findOne()
  	};
})(ScriptEdit);