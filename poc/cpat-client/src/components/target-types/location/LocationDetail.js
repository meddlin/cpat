import React from 'react';
const DocumentAnalyticsDetail = React.lazy(() => import ('../../DocumentAnalyticsDetail'));

const LocationDetail = () => {
    return (
        <div>
            <h3>Location: &lt;insert-here&gt;</h3>

            <div name="section-id">
                <label>Id: </label>
                <span>0</span>
            </div>
            <div name="section-name">
                <label>Name: </label>
                <span>ACME Inc.</span>
            </div>
            <div name="section-latitude">
                <label>Latitude: </label>
                <span>23.234</span>
            </div>
            <div name="section-longitude">
                <label>Longitude: </label>
                <span>94.234</span>
            </div>

            <DocumentAnalyticsDetail />
        </div>
    );
};

export default LocationDetail;