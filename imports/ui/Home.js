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
					<li><Link to="/scripts">Script Editor</Link></li>
					<li><Link to="/upload">Upload</Link></li>
				</ul>
			</div>
		);
	}
}

export default Home;