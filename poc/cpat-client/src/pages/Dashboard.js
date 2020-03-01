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

            <h2>Create New Entities</h2>
            <ul>
                <li><Link to="/company/create">Company</Link></li>
                <li><Link to="/device/create">Device</Link></li>
                <li><Link to="/location/create">Location</Link></li>
                <li><Link to="/person/create">Person</Link></li>
                <li><Link to="/target/create">Target</Link></li>
            </ul>
        </DashboardStyles>
    );
};

export default Dashboard;