import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';

import Targets from '../../api/targets/targets';

class TargetCount extends Component {
	constructor(props) {
		super(props);

		this.state = { 
			subscribed: 0
		}
	}
	
	render() {
		const { ready, targets } = this.props;
		const { subscribed } = this.state;

		/*if (targets && targets.length > 0) {
			this.setState({ subscribed: targets[0].relations.length });
		}*/

		return (
			<div>
				<h3># of Targets</h3>
				{targets ? targets.map( (t) => {
					return (
						<div key={t._id}>
							<p>
								<Link to={`/target/view/${t._id}`}>
									<b>{t.name}</b>
								</Link>
								<span>, id: {t._id} (Target)</span>
							</p>
							<p>relations: {t.relations.length}</p>
						</div>
					)
				}) : ''}
			</div>
		);
	}
}

export default withTracker(() => {
	const handle = Meteor.subscribe('targets.hasRelations')

	return {
		ready: handle.ready(),
    	targets: Targets.find().fetch()
  	};
})(TargetCount);