import React from 'react';
import { Button } from 'evergreen-ui';
import { connect } from 'react-redux';
import { personActions } from '../../../state-management/person/actions';
const DocumentAnalyticsDetail = React.lazy(() => import ('../../DocumentAnalyticsDetail'));

const PersonRemove = (props) => {
    const { data, dispatch } = props;

    return (
        <div>
            <h3>Remove - Person: &lt;insert-here&gt;</h3>

            <div name="section-id">
                <label>Id: </label>
                <span>{data && data.id ? data.id : ''}</span>
            </div>
            <div name="section-name">
                <label>First Name: </label>
                <span>{data && data.firstName ? data.firstName : ''}</span>
            </div>

            <DocumentAnalyticsDetail />

            <div>
                <b>Are you sure?</b>

                <Button 
                    appearance="minimal" 
                    onClick={() => dispatch(personActions.removePerson(data.id))}>Remove
                </Button>
                <Button appearance="minimal">Cancel</Button>
            </div>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        loading: state.person ? state.person.loading : false
     };
}

const PersonRemoveConnection = connect(mapStateToProps)(PersonRemove);
export { PersonRemoveConnection as PersonRemove };