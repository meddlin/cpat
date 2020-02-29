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
        name: 'Latitude',
        selector: 'latitude',
    },
    {
        name: 'Longitude',
        selector: 'longitude',
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
        latitude: '23.234',
        longitude: '94.234',
        dateCreated: new Date().toLocaleDateString(),
        updatedAt: new Date().toLocaleDateString(),
        lastModifiedBy: 'User01'
    }
];
const LocationListing = () => {
    return (
        <div>
            <h1>LocationListing</h1>

            <DataTable title="Locations" columns={columns} data={data} />
        </div>
    );
};

export default LocationListing;