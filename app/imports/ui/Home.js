import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Home.css';

class Home extends Component {
	render() {
		return (
			<div>
				<ul className="listMain">
					<li>nmap</li>
					<li>metagoofil</li>
					<li><hr /></li>
					<li><Link to="/scripts/viewall">Script Editor</Link></li>
					<li><Link to="/upload">Upload</Link></li>
					<li><Link to="/analytics">Analytics</Link></li>
					<li><hr /></li>
					<li><Link to="/target/view">Target View</Link></li>
					<li><Link to="/person/view">Person View</Link></li>
					<li><Link to="/company/view">Company View</Link></li>
					<li><Link to="/device/view">Device View</Link></li>
					<li><Link to="/location/view">Location View</Link></li>
					<li><Link to="/pdfFile/view">PDF File View</Link></li>
				</ul>

				{/*<p>Analytics
					<span>multiple mini-components underneath it</span>
					<span>- number of targets</span>
					<span>- number of relations each target has</span>
					<span>- easy access to files as they come in; a link?</span>
				</p>*/}

			</div>
		);
	}
}

export default Home;