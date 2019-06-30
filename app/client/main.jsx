import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import App from '/imports/ui/App';
import { initializeIcons } from '@uifabric/icons';

Meteor.startup(() => {
	initializeIcons();
  	render(<App />, document.getElementById('react-target'));
});
