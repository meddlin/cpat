import React from 'react';
import DataTable from 'react-data-table-component';

const columns = [
    {
        name: 'Id',
        selector: 'id'
    },
    {
        name: 'Name',
        selector: 'name',
        sortable: true
    },
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
        name: 'ACME Inc.',
        dateCreated: new Date().toLocaleDateString(),
        updatedAt: new Date().toLocaleDateString(),
        lastModifiedBy: 'User01'
    }
];

const CompanyListing = () => {
    return (
        <div>
            <h1>CompanyListing</h1>

            <DataTable title="Companies" columns={columns} data={data} />
        </div>
    );
};

export default CompanyListing;