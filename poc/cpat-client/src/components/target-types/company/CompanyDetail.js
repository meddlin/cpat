import React from 'react';
const DocumentAnalyticsDetail = React.lazy(() => import ('../../DocumentAnalyticsDetail'));

const CompanyDetail = () => {
    return (
        <div>
            <h3>Company: &lt;insert-here&gt;</h3>

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

export default CompanyDetail;