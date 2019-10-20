import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import TargetCount from './dashboard/TargetCount';

import './Home.css';

class Home extends Component {
	render() {
		return (
			<div>
				<div id="dashboard">
					<TargetCount />
				</div>
			</div>
		);
	}
}

export default Home;