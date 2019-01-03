import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

class Analytics extends Component {
	
	render() {

		return (
			<div>
			    <h1>Analytics</h1>
			    
			  </div>
		);
	}
}
export default Analytics;
/*export default withTracker(() => {
	return {
    	files: FileData.find().fetch()
  	};
})(FileUpload);*/