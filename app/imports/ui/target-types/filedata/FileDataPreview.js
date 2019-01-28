import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import FileData from '../../../api/files/files';

// TODO : Get dynamic imports working for the Person collection
/*async function importPersonMod() {
  const p = await import("../../api/person/person");
  Person = p;
}
*/

class FileDataPreview extends Component {
	constructor(props) {
		super(props);

		this.state = {

		}
	}

	render() {
		return (
			<div>
				<p>{ this.props.filedata.length > 0 ? this.props.filedata[0]._id : ''}</p>
				<p>{ this.props.filedata.length > 0 ? this.props.filedata[0].source : ''}</p>
			</div>
		);
	}
};

export default withTracker((props) => {
	const docId = props.docId;
	Meteor.subscribe('filedata.single', docId);

	return {
    	filedata: FileData.find().fetch()
  	};
})(FileDataPreview);