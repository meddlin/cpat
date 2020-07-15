import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';

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
			preview: {}
		}
	}

	/**
	 * Get the _id of the document to be displayed.
	 * @param  {string} docId The id of the document to be found within the subscribed data.
	 * @return {string}       [description]
	 *
	 * Note: A .find() is used even though the subscription is for a single document. Since a pub-sub pattern
	 * 			is being used, all documents retrieved by the client belonging to the same collection are
	 * 			grouped into the same client-side collection.
	 * 		So, it's more accurate to think of this publication as "one at a time" instead of simply "one".
	 */
	getDisplay(docId) {
		const { filedata } = this.props;

		let data = filedata.find((f) => f._id == docId);

		// Checking for truthiness of 'data'.
		// See note above this method; as documents are sent to the client, for this component, the particular _id
		// we are interested in may not have arrived just yet.
		return (data) ? data._id : '';
	}

	getSourceDisplay(docId) {
		let data = this.props.filedata.find((f) => f._id == docId);
		return (data) ? data.source : '';
	}

	render() {
		const { ready, filedata, docId } = this.props;
		
		// Checking if the subscription is ready. NOTE: This does NOT mean the data is available!!
		// See, more info on "ready()": http://www.meteor-tuts.com/chapters/1/pubsub.html
		// See, "is ready pattern": https://forums.meteor.com/t/react-component-mount-wait-for-subscriptions-ready/13646
		if (!ready) {
	    	return <div>Loading...</div>
	    } else {

	    	return (
				<div>
					<h5>File Data</h5>
					<div>
						<div>Id: {filedata ? this.getDisplay(docId) : 'No data to display'}</div>
						{filedata ? 
								<Link to={`/filedata/view/${this.getDisplay(docId)}`}>View Details</Link> : 
								'No data to display' }
					</div>
				</div>
			);
	    }
	}
};

export default withTracker((props) => {
	const docId = props.docId;
	const handle = Meteor.subscribe('filedata.single', docId);

	return {
		ready: handle.ready(),
    	filedata: FileData.find().fetch()
  	};
})(FileDataPreview);