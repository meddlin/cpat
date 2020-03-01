import React, { useState } from 'react';
import { Dialog, Table, Button, Heading } from 'evergreen-ui';
import { useHistory } from 'react-router-dom';
const DeviceRemove = React.lazy(() => import ('../components/target-types/device/DeviceRemove'));

const data = [
    {
        id: '0',
        name: 'ACME Inc.',
        dateCreated: new Date().toLocaleDateString(),
        updatedAt: new Date().toLocaleDateString(),
        lastModifiedBy: 'User01'
    }
];
const DeviceListing = () => {
    const [isShown, setIsShown] = useState(false);
    const [dialogObject, setDialogObject] = useState({});
    let history = useHistory();

    return (
        <div>
            <Heading size={700}>DeviceListing</Heading>

            <Table>
                <Table.Head>
                    <Table.TextHeaderCell>Name</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Date Created</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Last Modified By</Table.TextHeaderCell>
                    <Table.TextHeaderCell></Table.TextHeaderCell>
                    <Table.TextHeaderCell></Table.TextHeaderCell>
                </Table.Head>
                <Table.Body>
                    {data.map(d => (
                        <Table.Row key={d.id}>
                        <Table.TextCell>{d.name}</Table.TextCell>
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
                    ))}
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
    );
};

export default DeviceListing;