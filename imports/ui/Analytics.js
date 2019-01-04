import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { FileData } from '../api/files/files';

class Analytics extends Component {
	constructor(props) {
		super(props);

		this.state = { 
			query: ''
		}

		this.handleSearchClick = this.handleSearchClick.bind(this);
		this.handleTextChanged = this.handleTextChanged.bind(this);
	}

	handleSearchClick() {
		console.log('handleSearchClick');

		Meteor.call('server.searchFiles', this.state.query, (err, res) => {
			if (err)
				console.log(err.reason);
			else
				console.log(res);
		});
	}

	handleTextChanged() {
		console.log('handleTextChanged');

		var value = document.getElementById("searchInput").value;
		this.setState({ query: value });
	}
	
	render() {
		const { query } = this.state;

		return (
			<div>
			    <h1>Analytics</h1>
			    
			    <div>
			    	<input id="searchInput" onBlur={this.handleTextChanged} />
			    	<button onClick={this.handleSearchClick}>Go</button>

			    	<p id="searchResult"></p>
			    </div>
			  </div>
		);
	}
}
/*export default Analytics;*/
export default withTracker(() => {
	return {
    	files: FileData.find().fetch()
  	};
})(Analytics);