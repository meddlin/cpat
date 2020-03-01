import React from 'react';
import { Button } from 'evergreen-ui';
const DocumentAnalyticsDetail = React.lazy(() => import ('../../DocumentAnalyticsDetail'));

const CompanyRemove = (props) => {
    const { data } = props;

    return (
        <div>
            <h3>Remove - Company: &lt;insert-here&gt;</h3>

            <div name="section-id">
                <label>Id: </label>
                <span>{data && data.id ? data.id : ''}</span>
            </div>
            <div name="section-name">
                <label>Name: </label>
                <span>{data && data.id ? data.name : ''}</span>
            </div>

            <DocumentAnalyticsDetail />

            <div>
                <b>Are you sure?</b>

                <Button appearance="minimal" type="submit">Remove</Button>
                <Button appearance="minimal">Cancel</Button>
            </div>
        </div>
    );
};

export default CompanyRemove;