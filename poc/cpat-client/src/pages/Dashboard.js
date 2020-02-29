import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div>
            <h1>Dashboard</h1>

            <ul>
                <li><Link to="/companies">Companies</Link></li>
                <li><Link to="/devices">Devices</Link></li>
                <li><Link to="/locations">Locations</Link></li>
                <li><Link to="/people">People</Link></li>
                <li><Link to="/targets">Targets</Link></li>
            </ul>
        </div>
    );
};

export default Dashboard;