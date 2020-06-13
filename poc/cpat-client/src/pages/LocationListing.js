import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dialog, Table, Button, Heading } from 'evergreen-ui';
import { useHistory } from 'react-router-dom';
import { locationActions } from '../state-management/location/actions';
import { LocationRemove } from '../components/target-types/location/LocationRemove';

const LocationListing = (props) => {
    const [isShown, setIsShown] = useState(false);
    const [dialogObject, setDialogObject] = useState({});
    const { dispatch, loading, locations } = props;
    let history = useHistory();

    useEffect(() => {
        dispatch(locationActions.getLocationPage());
    }, []);

    return (
        <div>
            <Heading size={700}>LocationListing</Heading>

            {(loading === true) ? <h3>Loading...</h3> :
                <div>
                    <Table>
                        <Table.Head>
                            <Table.TextHeaderCell>Name</Table.TextHeaderCell>
                            <Table.TextHeaderCell>Date Created</Table.TextHeaderCell>
                            <Table.TextHeaderCell>Last Modified By</Table.TextHeaderCell>
                            <Table.TextHeaderCell></Table.TextHeaderCell>
                            <Table.TextHeaderCell></Table.TextHeaderCell>
                        </Table.Head>
                        <Table.Body>
                            {(locations && locations.length > 0) ? locations.map(d => (
                                <Table.Row key={d.id}>
                                    <Table.Cell onClick={() => history.push(`/location/detail/${d.id}`)}>
                                        <Button appearance="minimal" intent="none">{d.name}</Button>
                                    </Table.Cell>

                                    <Table.TextCell>{d.dateCreated}</Table.TextCell>
                                    <Table.TextCell>{d.lastModifiedBy}</Table.TextCell>
                                    <Table.Cell onClick={() => history.push(`/location/update/${d.id}`)}>
                                        <Button appearance="minimal" intent="none">Update</Button>
                                    </Table.Cell>
                                    <Table.Cell onClick={() => {
                                        setDialogObject(d);
                                        setIsShown(true);
                                    }}>
                                        <Button appearance="minimal" intent="danger">Remove</Button>
                                    </Table.Cell>
                                </Table.Row>
                            )) : []}
                        </Table.Body>
                    </Table>

                    <Button 
                        appearance="minimal" 
                        intent="success"
                        onClick={() => history.push("/location/create")}>
                        Create New
                    </Button>

                    <Dialog
                        isShown={isShown}
                        title="Danger intent"
                        intent="danger"
                        onCloseComplete={() => setIsShown(false)}
                        confirmLabel="Delete">

                        <LocationRemove data={dialogObject} />
                    </Dialog>
                </div>
            }
        </div>
    );
};

function mapStateToProps(state) {
    return {
        locations: (state.location && Array.isArray(state.location.locations)) ? state.location.locations : [],
        loading: state.location ? state.location.loading : false
    };
}

const connectedLocationListing = connect(mapStateToProps)(LocationListing);
export { connectedLocationListing as LocationListing };