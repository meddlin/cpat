import React, { useState } from 'react';
import { Dialog, Table, Button, Heading } from 'evergreen-ui';
import { useHistory } from 'react-router-dom';
const PersonRemove = React.lazy(() => import ('../components/target-types/person/PersonRemove'));

const data = [
    {
        id: '0',
        firstName: 'John',
        middleName: 'B',
        lastName: 'Smith',
        
        dateCreated: new Date().toLocaleDateString(),
        updatedAt: new Date().toLocaleDateString(),
        lastModifiedBy: 'User01'
    }
];

const PersonListing = () => {
    const [isShown, setIsShown] = useState(false);
    const [dialogObject, setDialogObject] = useState({});
    let history = useHistory();

    return (
        <div>
            <Heading size={700}>PersonListing</Heading>

            <Table>
                <Table.Head>
                    <Table.TextHeaderCell>First Name</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Middle Name</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Last Name</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Date Created</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Last Modified By</Table.TextHeaderCell>
                    <Table.TextHeaderCell></Table.TextHeaderCell>
                    <Table.TextHeaderCell></Table.TextHeaderCell>
                </Table.Head>
                <Table.Body>
                    {data.map(d => (
                        <Table.Row key={d.id}>
                            <Table.TextCell>{d.firstName}</Table.TextCell>
                            <Table.TextCell>{d.middleName}</Table.TextCell>
                            <Table.TextCell>{d.lastName}</Table.TextCell>
                            <Table.TextCell>{d.dateCreated}</Table.TextCell>
                            <Table.TextCell>{d.lastModifiedBy}</Table.TextCell>
                            <Table.Cell onClick={() => history.push(`/person/update/${d.id}`)}>
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
                onClick={() => history.push("/person/create")}>
                Create New
            </Button>

            <Dialog
                isShown={isShown}
                title="Danger intent"
                intent="danger"
                onCloseComplete={() => setIsShown(false)}
                confirmLabel="Delete">

                <PersonRemove data={dialogObject} />
            </Dialog>
        </div>
    );
};

export default PersonListing;