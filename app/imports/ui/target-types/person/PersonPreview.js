import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Person from '../../api/person/person';

// TODO : Get dynamic imports working for the Person collection
/*async function importPersonMod() {
  const p = await import("../../api/person/person");
  Person = p;
}
*/

class PersonPreview extends Component {
	constructor(props) {
		super(props);

		this.state = {

		}
	}

	render() {
		<div>
			<p>{this.props.person._id}</p>
		</div>
	}
};

export default withTracker((props) => {
	const docId = props.docId;
	Meteor.subscribe('person.single', docId);

	return {
    	person: Person.findOne()
  	};
})(PersonPreview);