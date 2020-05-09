import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Pane, Table, Button, Heading } from 'evergreen-ui';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { personActions } from '../../../state-management/person/actions';

const DocumentAnalyticsDetail = React.lazy(() => import ('../../DocumentAnalyticsDetail'));

const PersonDetail = (props) => {
    const { dispatch, loading, person } = props;
    let history = useHistory();
    let match = props.match; //useRouteMatch('/company/update/:id');

    useEffect(() => {
        dispatch(personActions.getPerson(match.params.id));
    }, []);

    return (
        <div>
            {(loading === true) ? <h3>Loading...</h3> : 
                <div>
                    <h3>Person: {person ? `${person.firstName} ${person.lastName}` : ''}</h3>

                    <Pane>
                        <div name="section-id">
                            <label>Id: </label>
                            <span>{person && person.id ? person.id : ''}</span>
                        </div>
                        <div name="section-firstName">
                            <label>First Name: </label>
                            <span>{person && person.firstName ? person.firstName : ''}</span>
                        </div>
                        <div name="section-middleName">
                            <label>Middle Name: </label>
                            <span>{person && person.middleName ? person.middleName : ''}</span>
                        </div>
                        <div name="section-lastName">
                            <label>Last Name: </label>
                            <span>{person && person.lastName ? person.lastName : ''}</span>
                        </div>

                        {person && person.nicknames ? (
                            <Table>
                                <Table.Head>
                                    <Table.TextHeaderCell>Nicknames</Table.TextHeaderCell>
                                </Table.Head>
                                <Table.Body>
                                    {(Array.isArray(person.nicknames) && 
                                        person.nicknames.length > 0) ? person.nicknames.map((d, idx) => (
                                        <Table.Row key={idx}>
                                            <Table.Cell>{d.name}</Table.Cell>
                                            <Table.Cell>{d.metaInfo}</Table.Cell>
                                        </Table.Row>
                                    )) : <Table.Row>No documentRelation to show.</Table.Row>}
                                </Table.Body>
                            </Table>
                        ) : <span>No nick names to display.</span>}

                        <br />

                        <DocumentAnalyticsDetail 
                            dateCreated={person.dateCreated} 
                            updatedAt={person.updatedAt}
                            lastModifiedBy={person.lastModifiedBy}
                        />
                    </Pane>

                    <Table>
                        <Table.Head>
                            <Table.TextHeaderCell>Related ID</Table.TextHeaderCell>
                        </Table.Head>
                        <Table.Body>
                            {(person && 
                                Array.isArray(person.documentRelation) && 
                                person.documentRelation.length > 0) ? person.documentRelation.map(d => (
                                <Table.Row key={d.documentId}>
                                    <Table.Cell>{d.collectionName}</Table.Cell>
                                    <Table.Cell>{d.documentId}</Table.Cell>
                                </Table.Row>
                            )) : <Table.Row>No documentRelation to show.</Table.Row>}
                        </Table.Body>
                    </Table>
                </div>
            }
        </div>
    );
};

function mapStateToProps(state) {
    return {
        person: (state.person && state.person.persons) ? state.person.persons : {},
        loading: state.person ? state.person.loading : false
     };
}

const PersonDetailConnection = connect(mapStateToProps)(PersonDetail);
export { PersonDetailConnection as PersonDetail };