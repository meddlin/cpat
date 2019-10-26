import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { DeviceEditForm } from './DeviceEditForm';

export default DeviceEdit = withTracker((props) => {

    const updateDocFunc = ((docId, data) => {
        Meteor.call('device.update', docId, data, (err, res) => {
            if (err) console.log(err);
			if (res) console.log(res);
        });
    });

    const doc = props.location.state;
    const loading = '', device = '', deviceExists = '';
    let meteorSubd = { doc, loading, device, deviceExists, updateDocFunc };

    return { meteorSubd };
})(DeviceEditForm);