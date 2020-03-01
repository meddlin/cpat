import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const DashboardStyles = styled.div`
    display: flex;
    flex-direction: column;

    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }
`;

const Dashboard = () => {
    return (
        <DashboardStyles>
            <h1>Dashboard</h1>
        </DashboardStyles>
    );
};

export default Dashboard;