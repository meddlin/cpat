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
        name: 'Region',
        selector: 'region',
        sortable: true
    },
    {
        name: 'Collection Type',
        selector: 'collectionType',
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
        region: 'East',
        collectionType: 'Company',

        dateCreated: new Date().toLocaleDateString(),
        updatedAt: new Date().toLocaleDateString(),
        lastModifiedBy: 'User01'
    }
];

const TargetListing = () => {
    return (
        <div>
            <h1>TargetListing</h1>

            <DataTable title="Targets" columns={columns} data={data} />
        </div>
    );
};

export default TargetListing;