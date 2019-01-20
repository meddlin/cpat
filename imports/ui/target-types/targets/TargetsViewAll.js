import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import ReactTable from "react-table";
import Targets from '../../../api/targets/targets';
/*import './TargetView.css';*/

class TargetsViewAll extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h2>TargetsViewAll</h2>

				<p>Form goes here.</p>
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