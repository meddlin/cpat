import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Scripts from '../../../api/scripts/scripts';

// TODO : Get dynamic imports working for the Person collection
/*async function importPersonMod() {
  const p = await import("../../api/scriptData/scriptData");
  Person = p;
}
*/

class ScriptDataPreview extends Component {
	constructor(props) {
		super(props);
	}

	/**
	 * Get the _id of the document to be displayed.
	 * @param  {string} docId The id of the document to be found within the subscribed data.
	 * @return {string}       [description]
	 */
	getDisplay(docId) {
		let data = this.props.scriptData.find((f) => f._id == docId);
		return (data) ? data._id : '';
	}

	render() {
		const { ready, scriptData } = this.props;

		if (!ready) {
	    	return <div>Loading...</div>
	    } else {

	    	return (
				<div>
					<h5>ScriptData</h5>
					<div>
						<div>Id: {scriptData ? this.getDisplay(this.props.docId) : 'No data to display'}</div>
					</div>
				</div>
			);
	    }
	}
};

export default withTracker((props) => {
	const docId = props.docId;
	const handle = Meteor.subscribe('scriptData.single', docId);

	return {
		ready: handle.ready(),
    	scriptData: Scripts.find().fetch()
  	};
})(ScriptDataPreview);