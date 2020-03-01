import React, { useState } from 'react';
import { Dialog, Table, Button } from 'evergreen-ui';
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

    return (
        <div>
            <h1>PersonListing</h1>

            <Table>
                <Table.Head>
                    <Table.TextHeaderCell>First Name</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Middle Name</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Last Name</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Date Created</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Last Modified By</Table.TextHeaderCell>
                    <Table.TextHeaderCell></Table.TextHeaderCell>
                </Table.Head>
                <Table.Body height={240}>
                    {data.map(d => (
                        <Table.Row key={d.id}>
                            <Table.TextCell>{d.firstName}</Table.TextCell>
                            <Table.TextCell>{d.middleName}</Table.TextCell>
                            <Table.TextCell>{d.lastName}</Table.TextCell>
                            <Table.TextCell>{d.dateCreated}</Table.TextCell>
                            <Table.TextCell>{d.lastModifiedBy}</Table.TextCell>
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