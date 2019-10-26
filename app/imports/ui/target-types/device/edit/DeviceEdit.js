import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { DeviceEditForm } from './DeviceEditForm';

export default DeviceEdit = withTracker((props) => {

    const updateDocFunc = ((data) => {
        Meteor.call('device.update', data, (err, res) => {
            if (err) console.log(err);
			if (res) console.log(res);
        });
    });

    const loading = '', device = '', deviceExists = '';
    let meteorSubd = { loading, device, deviceExists, updateDocFunc };

    return { meteorSubd };
})(DeviceEditForm);