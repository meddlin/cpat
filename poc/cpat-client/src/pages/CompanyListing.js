import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dialog, Table, Button, Heading } from 'evergreen-ui';
import { useHistory } from 'react-router-dom';
import { companyActions } from '../state-management/company/actions';
import { CompanyRemove } from '../components/target-types/company/CompanyRemove';

const CompanyListing = (props) => {
    const [isShown, setIsShown] = useState(false);
    const [dialogObject, setDialogObject] = useState({});
    const { dispatch, loading, companies } = props;
    let history = useHistory();

    useEffect(() => {
        dispatch(companyActions.getCompanyPage());
    }, []);

    return (
        <div>
            <Heading size={700}>Company Listing</Heading>

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
                            {(companies && companies.length > 0) ? companies.map(d => (
                                <Table.Row key={d.id}>
                                    <Table.Cell onClick={() => history.push(`/company/detail/${d.id}`)}>
                                        <Button appearance="minimal" intent="none">{d.name}</Button>
                                    </Table.Cell>
                                    <Table.TextCell>{d.dateCreated}</Table.TextCell>
                                    <Table.TextCell>{d.lastModifiedBy}</Table.TextCell>
                                    <Table.Cell onClick={() => history.push(`/company/update/${d.id}`)}>
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
                        onClick={() => history.push("/company/create")}>
                        Create New
                    </Button>

                    <Dialog
                        isShown={isShown}
                        title="Danger intent"
                        intent="danger"
                        onCloseComplete={() => setIsShown(false)}
                        confirmLabel="Delete">

                        <CompanyRemove data={dialogObject} />
                    </Dialog>
                </div>
            }
        </div>
    );
};

function mapStateToProps(state) {
    return {
        companies: (state.company && Array.isArray(state.company.companies)) ? state.company.companies : [],
        loading: state.company ? state.company.loading : false
    };
}

const connectedCompanyListing = connect(mapStateToProps)(CompanyListing);
export { connectedCompanyListing as CompanyListing };