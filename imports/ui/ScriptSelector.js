import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import ReactTable from "react-table";

/*import { FileData } from '../api/files/files';
import './FileUpload.css';*/

class ScriptSelector extends Component {
	constructor(props) {
		super(props);

		this.state = {
			
		}

	}
	
	render() {

		return (
			<div>
			    <h1>Script Selector</h1>

			    <div className="horizontal">
			    	<div id="uploader">
				    	
				    </div>
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