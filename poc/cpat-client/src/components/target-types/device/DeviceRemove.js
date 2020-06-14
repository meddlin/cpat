import React from 'react';
import { Button } from 'evergreen-ui';
import { connect } from 'react-redux';
import { deviceActions } from '../../../state-management/device/actions';
const DocumentAnalyticsDetail = React.lazy(() => import ('../../DocumentAnalyticsDetail'));

const DeviceRemove = (props) => {
    const { data, dispatch } = props;

    return (
        <div>
            <h3>Remove - Device: &lt;insert-here&gt;</h3>

            <div name="section-id">
                <label>Id: </label>
                <span>{data && data.id ? data.id : ''}</span>
            </div>
            <div name="section-name">
                <label>Name: </label>
                <span>{data && data.name ? data.name : ''}</span>
            </div>

            <DocumentAnalyticsDetail />

            <div>
                <b>Are you sure?</b>

                <Button 
                    appearance="minimal" 
                    type="submit"
                    onClick={() => dispatch(deviceActions.removeDevice(data.id))}>Remove</Button>
                <Button appearance="minimal">Cancel</Button>
            </div>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        loading: state.device ? state.device.loading : false
     };
}

const DeviceRemoveConnection = connect(mapStateToProps)(DeviceRemove);
export { DeviceRemoveConnection as DeviceRemove };