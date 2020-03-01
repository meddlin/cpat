import React from 'react';

const DocumentAnalyticsDetail = () => {
    return (
        <div>
            <div name="section-dateCreated">
                <label>Date Created: </label>
                <span>{new Date().toLocaleDateString()}</span>
            </div>
            <div name="section-updatedAt">
                <label>Updated At: </label>
                <span>{new Date().toLocaleDateString()}</span>
            </div>
            <div name="section-lastModifiedBy">
                <label>Last Modified By: </label>
                <span>User 1</span>
            </div>
        </div>
    );
};

export default DocumentAnalyticsDetail;