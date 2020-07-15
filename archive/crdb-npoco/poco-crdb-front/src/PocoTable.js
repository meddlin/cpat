import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { store } from './redux-root/store';
import { crudActions } from './basic-crud/actions';

const StyledHeader = styled.div`
    display: flex;
    flex-direction: row;
`;

const StyledRow = styled.div`
    display: flex;
    flex-direction: row;

    cursor: pointer;
    padding: 5px;

    &:hover {
        background-color: lightgray;
    }

    div {
        padding: 0 5px 0 5px;
    }
`;

class PocoTable extends Component {
    componentDidMount() {
        store.dispatch(crudActions.getAll());
    }

    click_remove = (doc) => {
        store.dispatch(crudActions.remove(doc));
    }

    click_update = (doc) => {
        store.dispatch(crudActions.update(doc.id, doc));
    }

    click_upsert = (doc) => {
        store.dispatch(crudActions.upsert(doc.id, doc));
    }

    click_updateSnapshot = (doc) => {
        store.dispatch(crudActions.updateSnapshot(doc.id, doc));
    }

    click_updateMany = (doc) => {
        store.dispatch(crudActions.updateMany(doc.id, doc));
    };

    render() {
        const { accounts } = this.props;

        return (
            <div>
                <StyledHeader>
                    <div>ID</div>
                    <div>Acct. Owner</div>
                    <div>Balance</div>
                    <div>Date Created</div>
                    <div>Last Updated</div>
                </StyledHeader>
                {accounts.map(a => {
                    return (
                        <StyledRow key={a.id}>
                            <div>{a.id}</div>
                            <div>{a.accountOwner}</div>
                            <div>{a.balance}</div>
                            <div>{a.dateCreated}</div>
                            <div>{a.lastUpdated}</div>

                            <button onClick={() => this.click_update(a)}>Update</button>
                            <button onClick={() => this.click_upsert(a)}>Upsert</button>
                            <button onClick={() => this.click_updateSnapshot(a)}>UpdSn</button>
                            <button onClick={() => this.click_updateMany(a)}>UpdM</button>
                            <button onClick={() => this.click_remove(a)}>X</button>
                        </StyledRow>
                    );
                })}
            </div>
        );
    }
};

function mapStateToProps(state) {
    const { crudOps: { loading, accounts } } = state;
    return {
        loading: loading ? loading : false,
        accounts: accounts ? accounts: []
    };
};

const connectedPocoTable = connect(mapStateToProps)(PocoTable);
export { connectedPocoTable as PocoTable };