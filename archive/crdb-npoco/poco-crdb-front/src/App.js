import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { store } from './redux-root/store';
import { crudActions } from './basic-crud/actions';
import { PocoTable } from './PocoTable';

const StyledUnlist = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  padding: 20px;
`;

const StyledListItem = styled.li`
  cursor: pointer;
  padding: 10px;
  margin: 2px;
  background-color: lightgray;

  &:hover {
    background-color: darkgray;
  }
`;

const FlexDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const Left = styled.div`
  flex-grow: 1;
`;
const Right = styled.div`
  flex-grow: 3;

  display: flex;
  flex-direction: column;
`;

function App() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {

  }, [accounts]);

  const click_GetSingle = () => {
    store.dispatch(crudActions.getSingle('123'))
  }

  const click_insert = () => {
    let acc = {
      accountOwner: 'John Smith',
      balance: 0,
      dateCreated: new Date(),
      lastUpdated: new Date()
    };

    store.dispatch(crudActions.insert(acc));
  }

  const click_test = () => {
    store.dispatch(crudActions.testGet());
  }

  return (
    <div className="App">
      <FlexDiv>
        <Left>
          <StyledUnlist>
            <StyledListItem onClick={click_GetSingle}>Get Single</StyledListItem>
            <StyledListItem onClick={click_insert}>Insert</StyledListItem>
            <StyledListItem>Update Snapshot</StyledListItem>
            <StyledListItem>Update Many</StyledListItem>
            <StyledListItem>Remove</StyledListItem>

            <StyledListItem onClick={click_test}>Test</StyledListItem>
          </StyledUnlist>
        </Left>
        <Right>
          <span>Acct. Owner</span>
          <input placeholder="..." />

          <span>Date Created</span>
          <div>{new Date().toString()}</div>

          <button onClick={click_insert}>Create new Account</button>
        </Right>
      </FlexDiv>

      <PocoTable />
    </div>
  );
}

export default App;
