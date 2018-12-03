import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Dropzone from 'react-dropzone';

import { FileData } from '../api/files/files';

class FileUpload extends Component {
	constructor(props) {
		super(props);

		this.state = {
			files: ''
		}

		this.handleFileChange = this.handleFileChange.bind(this);
	}

	renderFiles() {
		/*let fileData = this.props.files.map((file) => (
			<span>{file.origination}</span>
		));
		this.setState({ files: fileData });*/
		return this.props.files.map((file) => (
			<span key={file._id}>{file.origination}</span>
		));
	}

	componentDidMount() {

	}

	handleFileChange(selectedFiles) {
		this.setState({ files: selectedFiles });
		console.log(this.files);
	}

	onDrop(acceptedFiles, rejectedFiles) {
	  console.log(acceptedFiles);

	  let fr = new FileReader();
	  fr.onloadend = function(){
	  	console.log(fr.result);

	  	Meteor.call('fileData.insert', fr.result, (error, res) => {
	      if (error) {
	        console.log(error.reason);
	      } else {
	        console.log(res);
	      }
	    });

	    Meteor.call('server.xmlToJson', (error, res) => {
	    	if (error) {
	    		console.log(error.reason);
	    	} else {
	    		console.log(res);
	    	}
	    })
	  };

	  fr.readAsText(acceptedFiles[0]);
	}
	
	render() {
		
		const { files } = this.state;
		return (
			<div>
			    <h1>File Upload</h1>
			    <p>upload files here to be injested to MongoDB</p>

			    <div>
			    	{/*<input type="file" id="file-input" />*/}
			    	Uploader Below
			    	{this.renderFiles()}
			    </div>

			    <Dropzone onDrop={(files) => this.onDrop(files)} />
			  </div>
		);
	}
}

/*export default FileUpload;*/
export default withTracker(() => {
	return {
    	files: FileData.find().fetch()
  	};
})(FileUpload);