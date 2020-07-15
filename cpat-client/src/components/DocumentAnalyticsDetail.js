import React from 'react';
import { Table, Button, Heading } from 'evergreen-ui';

const DocumentAnalyticsDetail = (props) => {
    const { dateCreated, updatedat, lastModifiedBy } = props;

    return (
        <div>
            <div name="section-dateCreated">
                <label>Date Created: </label>
                <span>{dateCreated}</span>
            </div>
            <div name="section-updatedAt">
                <label>Updated At: </label>
                <span>{updatedat}</span>
            </div>
            <div name="section-lastModifiedBy">
                <label>Last Modified By: </label>
                <span>{lastModifiedBy}</span>
            </div>
        </div>
    );
};

export default DocumentAnalyticsDetail;