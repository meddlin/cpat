import React from 'react';
import { Button } from 'evergreen-ui';
const DocumentAnalyticsDetail = React.lazy(() => import ('../../DocumentAnalyticsDetail'));

const PersonRemove = (props) => {
    const { data } = props;

    console.log(`Showing data from...${data && data.firstName ? data.firstName : ''}`)

    return (
        <div>
            <h3>Remove - Person: &lt;insert-here&gt;</h3>

            <div name="section-id">
                <label>Id: </label>
                <span>{data && data.id ? data.id : ''}</span>
            </div>
            <div name="section-name">
                <label>First Name: </label>
                <span>{data && data.firstName ? data.firstName : ''}</span>
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

export default PersonRemove;