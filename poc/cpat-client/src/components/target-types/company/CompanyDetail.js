import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Pane, Table, Button, Heading } from 'evergreen-ui';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { companyActions } from '../../../state-management/company/actions';
const DocumentAnalyticsDetail = React.lazy(() => import ('../../DocumentAnalyticsDetail'));

const CompanyDetail = (props) => {
    const { dispatch, loading, company } = props;
    let history = useHistory();
    let match = props.match; //useRouteMatch('/company/update/:id');

    useEffect(() => {
        dispatch(companyActions.getCompany(match.params.id));
    }, []);

    return (
        <div>
            {loading === true ? <h3>Loading...</h3> :
                <div>
                    <h3>Company: {company && company.name ? company.name : ''}</h3>

                    <Pane>
                        <div name="section-id">
                            <label>Id: </label>
                            <span>{company && company.id ? company.id : ''}</span>
                        </div>
                        <div name="section-name">
                            <label>Name: </label>
                            <span>{company && company.name ? company.name : ''}</span>
                        </div>
            
                        <DocumentAnalyticsDetail 
                            dateCreated={company.dateCreated}
                            updatedAt={company.updatedAt}
                            lastModifiedBy={company.lastModifiedBy}
                        />
                    </Pane>

                    <Table>
                        <Table.Head>
                            <Table.TextHeaderCell>Related ID</Table.TextHeaderCell>
                        </Table.Head>
                        <Table.Body>
                            {(company && 
                                Array.isArray(company.documentRelation) && 
                                company.documentRelation.length > 0) ? company.documentRelation.map(d => (
                                <Table.Row key={d.documentId}>
                                    <Table.Cell>{d.collectionName}</Table.Cell>
                                    <Table.Cell>{d.documentId}</Table.Cell>
                                </Table.Row>
                            )) : <Table.Row>No documentRelation to show.</Table.Row>}
                        </Table.Body>
                    </Table>

                    <Button onClick={() => history.goBack()}>Back</Button>
                </div>
            }
        </div>
    );
};

function mapStateToProps(state) {
    return {
        company: (state.company && state.company.company) ? state.company.company : {},
        loading: state.company ? state.company.loading : false
     };
}

const CompanyDetailConnection = connect(mapStateToProps)(CompanyDetail);
export { CompanyDetailConnection as CompanyDetail };