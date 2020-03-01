import React from 'react';
const DocumentAnalyticsDetail = React.lazy(() => import ('../../DocumentAnalyticsDetail'));

const PersonDetail = () => {
    return (
        <div>
            <h3>Person: &lt;insert-here&gt;</h3>

            <div name="section-id">
                <label>Id: </label>
                <span>0</span>
            </div>
            <div name="section-firstName">
                <label>First Name: </label>
                <span>John</span>
            </div>
            <div name="section-middleName">
                <label>Middle Name: </label>
                <span>B</span>
            </div>
            <div name="section-lastName">
                <label>Last Name: </label>
                <span>Smith</span>
            </div>

            <DocumentAnalyticsDetail />
        </div>
    );
};

export default PersonDetail;