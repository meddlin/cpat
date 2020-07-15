import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Pane, Table, Button, Heading } from 'evergreen-ui';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { deviceActions } from '../../../state-management/device/actions';

const DocumentAnalyticsDetail = React.lazy(() => import ('../../DocumentAnalyticsDetail'));

const DeviceDetail = (props) => {
    const { dispatch, loading, device } = props;
    let history = useHistory();
    let match = props.match; //useRouteMatch('/company/update/:id');

    useEffect(() => {
        dispatch(deviceActions.getDevice(match.params.id));
    }, []);

    return (
        <div>
            {loading === true ? <h3>Loading...</h3> :
                <div>
                    <h3>Device: {device && device.id ? device.id : ''}</h3>

                    <Pane>
                        <div name="section-id">
                            <label>Id: </label>
                            <span>{device && device.id ? device.id : ''}</span>
                        </div>
                        <div name="section-name">
                            <label>Name: </label>
                            <span>{device && device.name ? device.name : ''}</span>
                        </div>

                        <DocumentAnalyticsDetail 
                            dateCreated={device.dateCreated} 
                            updatedAt={device.updatedAt}
                            lastModifiedBy={device.lastModifiedBy}
                        />
                    </Pane>

                    <Table>
                        <Table.Head>
                            <Table.TextHeaderCell>Related ID</Table.TextHeaderCell>
                        </Table.Head>
                        <Table.Body>
                            {(device && 
                                Array.isArray(device.documentRelation) && 
                                device.documentRelation.length > 0) ? device.documentRelation.map(d => (
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
        device: (state.device && state.device.device) ? state.device.device : {},
        loading: state.device ? state.device.loading : false
     };
}

const DeviceDetailConnection = connect(mapStateToProps)(DeviceDetail);
export { DeviceDetailConnection as DeviceDetail };