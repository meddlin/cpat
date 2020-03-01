import React from 'react';
import { Button } from 'evergreen-ui';
const DocumentAnalyticsDetail = React.lazy(() => import ('../../DocumentAnalyticsDetail'));

const LocationRemove = (props) => {
    const { data } = props;

    console.log(`Showing data from...${data && data.name ? data.name : ''}`)

    return (
        <div>
            <h3>Remove - Location: &lt;insert-here&gt;</h3>

            <div name="section-id">
                <label>Id: </label>
                <span>{data && data.id ? data.id : ''}</span>
            </div>
            <div name="section-name">
                <label>Name: </label>
                <span>{data && data.name ? data.name : ''}</span>
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

export default LocationRemove;