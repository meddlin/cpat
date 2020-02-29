import React from 'react';
import DataTable from 'react-data-table-component';

const columns = [
    {
        name: 'Id',
        selector: 'id'
    },
    {
        name: 'First Name',
        selector: 'firstName',
        sortable: true
    },
    {
        name: 'Middle Name',
        selector: 'middleName',
        sortable: true
    },
    {
        name: 'Last Name',
        selector: 'lastName',
        sortable: true
    },

    // {
    //     // Need button, etc. that somehow represents "small" lists of data
    //     // i.e. nicknames, phone numbers, email addresses, organizations, etc.
    // },
    
    {
        name: 'Date Created',
        selector: 'dateCreated',
        sortable: true
    },
    {
        name: 'Updated At',
        selector: 'updatedAt',
        sortable: true
    },
    {
        name: 'Last Modified By',
        selector: 'lastModifiedBy',
        sortable: true
    }
];
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
    return (
        <div>
            <h1>PersonListing</h1>

            <DataTable title="People" columns={columns} data={data} />
        </div>
    );
};

export default PersonListing;