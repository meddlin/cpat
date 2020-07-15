import React from 'react';
import { Button } from 'evergreen-ui';
import { connect } from 'react-redux';
import { locationActions } from '../../../state-management/location/actions';
const DocumentAnalyticsDetail = React.lazy(() => import ('../../DocumentAnalyticsDetail'));

const LocationRemove = (props) => {
    const { data, dispatch } = props;

    return (
        <div>
            <h3>Remove - Location: &lt;insert-here&gt;</h3>

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
                    onClick={() => dispatch(locationActions.removeLocation(data.id))}>Remove
                </Button>
                <Button appearance="minimal">Cancel</Button>
            </div>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        loading: state.location ? state.location.loading : false
     };
}

const LocationRemoveConnection = connect(mapStateToProps)(LocationRemove);
export { LocationRemoveConnection as LocationRemove };