import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Pane, Table, Button, Heading } from 'evergreen-ui';
import styled from 'styled-components';
import { locationActions } from '../../../state-management/location/actions';

const DocumentAnalyticsDetail = React.lazy(() => import ('../../DocumentAnalyticsDetail'));

const LocationDetail = (props) => {
    const { dispatch, loading, location } = props;
    let history = useHistory();
    let match = props.match; //useRouteMatch('/company/update/:id');

    useEffect(() => {
        dispatch(locationActions.getLocation(match.params.id));
    }, []);

    return (
        <div>
            {(loading === true) ? <h3>Loading...</h3> :
            <div>
                <h3>Location: {location && location.name ? location.name : ''}</h3>

                <div name="section-id">
                    <label>Id: </label>
                    <span>{location && location.id ? location.id : ''}</span>
                </div>
                <div name="section-name">
                    <label>Name: </label>
                    <span>{location && location.name ? location.name : ''}</span>
                </div>
                <div name="section-latitude">
                    <label>Latitude: </label>
                    <span>{location && location.latitude ? location.latitude : ''}</span>
                </div>
                <div name="section-longitude">
                    <label>Longitude: </label>
                    <span>{location && location.longitude ? location.longitude : ''}</span>
                </div>

                <DocumentAnalyticsDetail 
                    dateCreated={location.dateCreated}
                    updatedAt={location.updatedAt}
                    lastModifiedBy={location.lastModifiedBy}
                />

                <Table>
                    <Table.Head>
                        <Table.TextHeaderCell>Related ID</Table.TextHeaderCell>
                    </Table.Head>
                    <Table.Body>
                        {(location && 
                            Array.isArray(location.documentRelation) && 
                            location.documentRelation.length > 0) ? location.documentRelation.map(d => (
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
        location: (state.location && state.location.location) ? state.location.location : {},
        loading: state.location ? state.location.loading : false
     };
}

const LocationDetailConnection = connect(mapStateToProps)(LocationDetail);
export { LocationDetailConnection as LocationDetail };