import React, { useState } from 'react';
import { Dialog, Table, Button } from 'evergreen-ui';
const TargetRemove = React.lazy(() => import ('../components/target-types/target/TargetRemove'));

const data = [
    {
        id: '0',
        name: 'ACME Inc.',
        region: 'East',
        collectionType: 'Company',

        dateCreated: new Date().toLocaleDateString(),
        updatedAt: new Date().toLocaleDateString(),
        lastModifiedBy: 'User01'
    }
];

const TargetListing = () => {
    const [isShown, setIsShown] = useState(false);
    const [dialogObject, setDialogObject] = useState({});

    return (
        <div>
            <h1>TargetListing</h1>

            <Table>
                <Table.Head>
                    <Table.TextHeaderCell>Name</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Region</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Collection Type</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Date Created</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Last Modified By</Table.TextHeaderCell>
                    <Table.TextHeaderCell></Table.TextHeaderCell>
                </Table.Head>
                <Table.Body height={240}>
                    {data.map(d => (
                        <Table.Row key={d.id}>
                            <Table.TextCell>{d.name}</Table.TextCell>
                            <Table.TextCell>{d.region}</Table.TextCell>
                            <Table.TextCell>{d.collectionType}</Table.TextCell>
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

                <TargetRemove data={dialogObject} />
            </Dialog>
        </div>
    );
};

export default TargetListing;