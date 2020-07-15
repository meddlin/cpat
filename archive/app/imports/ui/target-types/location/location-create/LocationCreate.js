import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { LocationCreateForm } from './LocationCreateForm';

export default LocationCreate = withTracker((props) => {
    //const docId = props.docId;
	//const locationHandle = Meteor.subscribe('location.single', docId);
	//const loading = !locationHandle.ready();
	//const location = Location.findOne(docId);
	//const locationExists = !loading && !!location;

    const insertDocFunc = ((data) => {
        Meteor.call('location.insert', data, (err, res) => {
            if (err) console.log(err);
            if (res) console.log(res);
        });
    });
    const loading = '', location = '', locationExists = '';
    let meteorSubd = { loading, location, locationExists, insertDocFunc };

    return { meteorSubd };
})(LocationCreateForm);