import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Link } from 'react-router-dom';
import ReactTable from "react-table";
import Targets from '../../../../api/targets/targets';
import './TargetsViewAll.css';

class TargetsViewAll extends Component {
	constructor(props) {
		super(props);

		this.handleSelectTarget = this.handleSelectTarget.bind(this);
		this.handleDeselectTarget = this.handleDeselectTarget.bind(this);
	}

	handleSelectTarget(docId) {
		Meteor.call('targets.select', docId, (err, res) => {
			if (err) console.log(err);
			if (res) console.log(res);
		});
	}
	handleDeselectTarget(docId) {
		Meteor.call('targets.deselect', docId, (err, res) => {
			if (err) console.log(err);
			if (res) console.log(res);
		});
	}

	render() {
		return (
			<div>
				<h2>TargetsViewAll</h2>

				<div id="selection">Select Target</div>

				<div id="target-selection">
					{this.props.targets.map((doc) => {
						if (doc.name != null)
							return (
								<div id="target-document" key={doc._id}>
									<span>{doc.name}</span>
									<Link to={`/target/view/${doc._id}`}>{doc.name}</Link>
									<div id="target-selection" 
										onClick={(() => this.handleSelectTarget(doc._id))}>Select</div>
									<div id="target-selection" 
										onClick={(() => this.handleDeselectTarget(doc._id))}>DESelect</div>
								</div>
							);
					})}
				</div>

				<div>
			    	<ReactTable 
			    		data = { Targets.find().fetch() } 
			    		columns = {[
			    		{
			    			Header: 'Data',
			    			columns: [
			    			{
			    				Header: 'Name',
			    				accessor: 'name'
			    			}, {
			    				Header: 'Collection Type',
			    				accessor: 'collectionType'
			    			}]
			    		}
			    	]} />
			    </div>
			</div>
		);
	}
};

export default withTracker((props) => {
	Meteor.subscribe('targets.all');

	return {
    	targets: Targets.find().fetch()
  	};
})(TargetsViewAll);