import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Dropzone from 'react-dropzone';
import ReactTable from "react-table";
import 'react-table/react-table.css' 

import { FileData } from '../api/files/files';
import './FileUpload.css';

class FileUpload extends Component {
	constructor(props) {
		super(props);

		this.state = {
			files: '',
			tableData: []
		}

		this.handleFileChange = this.handleFileChange.bind(this);
	}

	getTableData() {
		let arr = [];
		this.props.files.map( (file) => {
			arr.push({ message: file._id, converter: file.origination });
		});
		return arr;
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
		const { files, tableData } = this.state;

		if (files.length > 0) {
			this.setState({ tableData: this.props.files });
		}

		return (
			<div>
			    <h1>File Upload</h1>

			    <div className="horizontal">
			    	<div id="uploader">
				    	<Dropzone onDrop={(files) => this.onDrop(files)} />
				    </div>

				    <div id="listing">
				    	<h3>Uploaded Data</h3>

				    	<ReactTable data={this.getTableData()} columns={[
				            {
				              Header: "Data",
				              columns: [
				                {
				                  Header: "Message",
				                  accessor: "message"
				                },
				                {
				                	Header: "Converter",
				                	accessor: "converter"
				                }
				              ]
				            }
				          ]} />
				    </div>
			    </div>
			    
			  </div>
		);
	}
}

export default withTracker(() => {
	return {
    	files: FileData.find().fetch()
  	};
})(FileUpload);