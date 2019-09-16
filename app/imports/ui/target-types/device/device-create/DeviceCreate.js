import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { DeviceCreateForm } from './DeviceCreateForm';

export default DeviceCreate = withTracker( (props) => {
	//const docId = props.docId;
	//const deviceHandle = Meteor.subscribe('device.single', docId);
	//const loading = !deviceHandle.ready();
	//const device = Device.findOne(docId);
	//const deviceExists = !loading && !!device;

	const insertDocFunc = ((data) => {
		Meteor.call('device.insert', data, (err, res) => {
			if (err) console.log(err);
			if (res) console.log(res);
		});
	});

	const loading = '', device = '', deviceExists = '';
	let meteorSubd = { loading, device, deviceExists, insertDocFunc };

	return { meteorSubd };
})(DeviceCreateForm);

