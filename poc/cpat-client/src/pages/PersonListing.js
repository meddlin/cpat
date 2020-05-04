import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dialog, Table, Button, Heading } from 'evergreen-ui';
import { useHistory } from 'react-router-dom';
import { personActions } from '../state-management/person/actions';
const PersonRemove = React.lazy(() => import ('../components/target-types/person/PersonRemove'));

const PersonListing = (props) => {
    const [isShown, setIsShown] = useState(false);
    const [dialogObject, setDialogObject] = useState({});
    const { dispatch, loading, persons } = props;
    let history = useHistory();

    useEffect(() => {
        dispatch(personActions.getPersonPage());
    }, []);

    return (
        <div>
            <Heading size={700}>PersonListing</Heading>

            {(loading === true) ? <h3>Loading...</h3> :
                <div>
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
                            {(persons && persons.length > 0) ? persons.map(d => (
                                <Table.Row key={d.id}>
                                    <Table.Cell onClick={() => history.push(`/person/detail/${d.id}`)}>
                                        <Button appearance="minimal" intent="none">{d.firstName}</Button>
                                    </Table.Cell>
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
                            )) : []}
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
            }
        </div>
    );
};

function mapStateToProps(state) {
    return {
        persons: (state.person && Array.isArray(state.person.persons)) ? state.person.persons : [],
        loading: state.person ? state.person.loading : false
    };
}

const connectedPersonListing = connect(mapStateToProps)(PersonListing);
export { connectedPersonListing as PersonListing };