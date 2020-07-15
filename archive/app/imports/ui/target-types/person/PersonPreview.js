import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Person from '../../../api/person/person';

// TODO : Get dynamic imports working for the Person collection
/*async function importPersonMod() {
  const p = await import("../../api/person/person");
  Person = p;
}
*/

class PersonPreview extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { ready, person } = this.props;

		if (!this.props.ready) {
	    	return <div>Loading...</div>
	    } else {

	    	return (
				<div>
					<h5>Person</h5>
					<div>
						<div>Id: {person ? this.getDisplay(this.props.docId) : 'No data to display'}</div>
					</div>
				</div>
			);
	    }
	}
};

export default withTracker((props) => {
	const docId = props.docId;
	const handle = Meteor.subscribe('person.single', docId);

	return {
		ready: handle.ready(),
    	person: Person.find().fetch()
  	};
})(PersonPreview);