import React from 'react';
import { Button } from 'evergreen-ui';
import { connect } from 'react-redux';
import { targetActions } from '../../../state-management/target/actions';
const DocumentAnalyticsDetail = React.lazy(() => import ('../../DocumentAnalyticsDetail'));

const TargetRemove = (props) => {
    const { data, dispatch } = props;

    return (
        <div>
            <h3>Remove - Target: &lt;insert-here&gt;</h3>

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
                    onClick={() => dispatch(targetActions.removeTarget(data.id))}>Remove
                </Button>
                <Button appearance="minimal">Cancel</Button>
            </div>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        loading: state.target ? state.target.loading : false
     };
}

const TargetRemoveConnection = connect(mapStateToProps)(TargetRemove);
export { TargetRemoveConnection as TargetRemove };