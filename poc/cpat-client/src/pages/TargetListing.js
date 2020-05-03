import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dialog, Table, Button, Heading } from 'evergreen-ui';
import { useHistory, withRouter } from 'react-router-dom';
import { targetActions } from '../state-management/target/actions';
const TargetRemove = React.lazy(() => import ('../components/target-types/target/TargetRemove'));

const TargetListing = (props) => {
    const [isShown, setIsShown] = useState(false);
    const [dialogObject, setDialogObject] = useState({});
    const { dispatch, targets } = props;
    let history = useHistory();

    useEffect(() => {
        dispatch(targetActions.getTargetPage());
    }, []);

    return (
        <div>
            <Heading size={700}>TargetListing</Heading>

            <Table>
                <Table.Head>
                    <Table.TextHeaderCell>Name</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Region</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Collection Type</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Date Created</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Last Modified By</Table.TextHeaderCell>
                    <Table.TextHeaderCell></Table.TextHeaderCell>
                    <Table.TextHeaderCell></Table.TextHeaderCell>
                </Table.Head>
                <Table.Body>
                    {(targets && targets.length > 0) ? targets.map(d => (
                        <Table.Row key={d.id}>
                            {/* <Table.TextCell>{d.name}</Table.TextCell> */}
                            <Table.Cell onClick={() => history.push(`/target/detail/${d.id}`)}>
                                <Button appearance="minimal" intent="none">{d.name}</Button>
                            </Table.Cell>

                            <Table.TextCell>{d.region}</Table.TextCell>
                            <Table.TextCell>{d.collectionType}</Table.TextCell>
                            <Table.TextCell>{d.dateCreated}</Table.TextCell>
                            <Table.TextCell>{d.lastModifiedBy}</Table.TextCell>
                            <Table.Cell onClick={() => history.push(`/target/update/${d.id}`)}>
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
                onClick={() => history.push("/target/create")}>
                Create New
            </Button>

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

function mapStateToProps(state) {
    return {
        targets: (state.target && Array.isArray(state.target.targets)) ? state.target.targets : [],
        loading: state.target ? state.target.loading : false
    };
}

const connectedTargetListing = connect(mapStateToProps)(TargetListing);
export { connectedTargetListing as TargetListing };