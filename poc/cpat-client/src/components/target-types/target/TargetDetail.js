import React from 'react';
const DocumentAnalyticsDetail = React.lazy(() => import ('../../DocumentAnalyticsDetail'));


const TargetDetail = () => {
    return (
        <div>
            <h3>Target: &lt;insert-here&gt;</h3>

            <div name="section-id">
                <label>Id: </label>
                <span>0</span>
            </div>
            <div name="section-name">
                <label>Name: </label>
                <span>ACME Inc.</span>
            </div>
            <div name="section-region">
                <label>Region: </label>
                <span>B</span>
            </div>
            <div name="section-collectionType">
                <label>Collection Type: </label>
                <span>Company</span>
            </div>

            <DocumentAnalyticsDetail />
        </div>
    );
};

export default TargetDetail;