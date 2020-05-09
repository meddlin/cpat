import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Pane, Table, Button, Heading } from 'evergreen-ui';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { targetActions } from '../../../state-management/target/actions';

const DocumentAnalyticsDetail = React.lazy(() => import ('../../DocumentAnalyticsDetail'));

const TargetDetail = (props) => {
    const { dispatch, loading, target } = props;
    let history = useHistory();
    let match = props.match; //useRouteMatch('/company/update/:id');

    useEffect(() => {
        dispatch(targetActions.getTarget(match.params.id));
    }, []);

    return (
        <div>
            {(loading === true) ? <h3>Loading...</h3> :
                <div>
                    <h3>Target: {target && target.name ? target.name : ''}</h3>
        
                    <Pane>
                        <div name="section-id">
                            <label>Id: </label>
                            <span>{target && target.id ? target.id : ''}</span>
                        </div>
                        <div name="section-name">
                            <label>Name: </label>
                            <span>{target && target.name ? target.name : ''}</span>
                        </div>
                        <div name="section-region">
                            <label>Region: </label>
                            <span>{target && target.region ? target.region : ''}</span>
                        </div>
                        <div name="section-collectionType">
                            <label>Collection Type: </label>
                            <span>{target && target.collectionType ? target.collectionType : ''}</span>
                        </div>

                        <br />

                        <DocumentAnalyticsDetail 
                            dateCreated={target.dateCreated} 
                            updatedAt={target.updatedAt}
                            lastModifiedBy={target.lastModifiedBy}
                        />
                    </Pane>

                    <Table>
                        <Table.Head>
                            <Table.TextHeaderCell>Related ID</Table.TextHeaderCell>
                        </Table.Head>
                        <Table.Body>
                            {(target && 
                                Array.isArray(target.documentRelation) && 
                                target.documentRelation.length > 0) ? target.documentRelation.map(d => (
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
        target: (state.target && state.target.targets) ? state.target.targets : {},
        loading: state.target ? state.target.loading : false
     };
}

const TargetDetailConnection = connect(mapStateToProps)(TargetDetail);
export { TargetDetailConnection as TargetDetail };