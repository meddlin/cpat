import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { PdfFile } from '../../api/pdf-files/pdf-files';
import './PdfFileView.css';

class PdfFileView extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h2>PDF File</h2>

				<p>Form goes here.</p>
			</div>
		);
	}
};

export default PdfFileView;

// TODO : Finish subscribing to the publication.

/*export default withTracker((props) => {
	const docId = props.docId;

	Meteor.subscribe('pdfFile.single', docId);

	return {
    	pdfFile: PdfFile.find().fetch()
  	};
})(PdfFileView);*/