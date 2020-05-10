import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dialog, Table, Button, Heading } from 'evergreen-ui';
import { useHistory } from 'react-router-dom';
import { deviceActions } from '../state-management/device/actions';

const DeviceRemove = React.lazy(() => import ('../components/target-types/device/DeviceRemove'));


const DeviceListing = (props) => {
    const [isShown, setIsShown] = useState(false);
    const [dialogObject, setDialogObject] = useState({});
    const { dispatch, loading, devices } = props;
    let history = useHistory();

    useEffect(() => {
        dispatch(deviceActions.getDevicePage());
    }, []);

    return (
        <div>
            <Heading size={700}>DeviceListing</Heading>

            {loading === true ? <h3>Loading...</h3> :
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
                            {(devices && devices.length) ? devices.map(d => (
                                <Table.Row key={d.id}>
                                <Table.Cell onClick={() => history.push(`/device/detail/${d.id}`)}>
                                    <Button appearance="minimal" intent="none">{d.name}</Button>
                                </Table.Cell>

                                <Table.TextCell>{d.dateCreated}</Table.TextCell>
                                <Table.TextCell>{d.lastModifiedBy}</Table.TextCell>
                                <Table.Cell onClick={() => history.push(`/device/update/${d.id}`)}>
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
                        onClick={() => history.push("/device/create")}>
                        Create New
                    </Button>

                    <Dialog
                        isShown={isShown}
                        title="Danger intent"
                        intent="danger"
                        onCloseComplete={() => setIsShown(false)}
                        confirmLabel="Delete">

                        <DeviceRemove data={dialogObject} />
                    </Dialog>
                </div>
            }
        </div>
    );
};

function mapStateToProps(state) {
    return {
        devices: (state.device && Array.isArray(state.device.devices)) ? state.device.devices : [],
        loading: state.device ? state.device.loading : false
    };
}

const connectedDeviceListing = connect(mapStateToProps)(DeviceListing);
export { connectedDeviceListing as DeviceListing };