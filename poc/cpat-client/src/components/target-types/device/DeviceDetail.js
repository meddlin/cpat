import React from 'react';
const DocumentAnalyticsDetail = React.lazy(() => import ('../../DocumentAnalyticsDetail'));

const DeviceDetail = () => {
    return (
        <div>
            <h3>Device: &lt;insert-here&gt;</h3>

            <div name="section-id">
                <label>Id: </label>
                <span>0</span>
            </div>
            <div name="section-name">
                <label>Name: </label>
                <span>ACME Inc.</span>
            </div>

            <DocumentAnalyticsDetail />
        </div>
    );
};

export default DeviceDetail;