import React from 'react';
import { Button } from 'evergreen-ui';
import { connect } from 'react-redux';
import { companyActions } from '../../../state-management/company/actions';
const DocumentAnalyticsDetail = React.lazy(() => import ('../../DocumentAnalyticsDetail'));

const CompanyRemove = (props) => {
    const { data, dispatch } = props;

    return (
        <div>
            <h3>Remove - Company: &lt;insert-here&gt;</h3>

            <div name="section-id">
                <label>Id: </label>
                <span>{data && data.id ? data.id : ''}</span>
            </div>
            <div name="section-name">
                <label>Name: </label>
                <span>{data && data.id ? data.name : ''}</span>
            </div>

            <DocumentAnalyticsDetail />

            <div>
                <b>Are you sure?</b>

                <Button 
                    appearance="minimal" 
                    onClick={() => dispatch(companyActions.removeCompany(data.id))}>Remove
                </Button>
                <Button appearance="minimal">Cancel</Button>
            </div>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        loading: state.company ? state.company.loading : false
     };
}

const CompanyRemoveConnection = connect(mapStateToProps)(CompanyRemove);
export { CompanyRemoveConnection as CompanyRemove };