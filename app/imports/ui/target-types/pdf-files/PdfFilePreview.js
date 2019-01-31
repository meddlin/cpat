import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import PdfFile from '../../../api/pdf-files/pdf-files';

// TODO : Get dynamic imports working for the Person collection
/*async function importPersonMod() {
  const p = await import("../../api/pdfFile/pdfFile");
  Person = p;
}
*/

class PdfFilePreview extends Component {
	constructor(props) {
		super(props);
	}

	/**
	 * Get the _id of the document to be displayed.
	 * @param  {string} docId The id of the document to be found within the subscribed data.
	 * @return {string}       [description]
	 */
	getDisplay(docId) {
		let data = this.props.pdfFile.find((f) => f._id == docId);
		return (data) ? data._id : '';
	}

	render() {
		const { ready, pdfFile } = this.props;

		if (!ready) {
	    	return <div>Loading...</div>
	    } else {

	    	return (
				<div>
					<h5>PdfFile</h5>
					<div>
						<div>Id: {pdfFile ? this.getDisplay(this.props.docId) : 'No data to display'}</div>
					</div>
				</div>
			);
	    }
	}
};

export default withTracker((props) => {
	const docId = props.docId;
	const handle = Meteor.subscribe('pdfFile.single', docId);

	return {
		ready: handle.ready(),
    	pdfFile: PdfFile.find().fetch()
  	};
})(PdfFilePreview);