import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { DefaultButton } from 'office-ui-fabric-react';

import Location from '../../../api/location/location';

class LocationTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { ready, locationList } = this.props;

        return (
            <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-lg2 ms-fontSize-18">Id</div>
                    <div className="ms-Grid-col ms-lg4 ms-fontSize-18">Name</div>
                    <div className="ms-Grid-col ms-lg2 ms-fontSize-18">Org. Count</div>
                    <div className="ms-Grid-col ms-lg2 ms-fontSize-18">Rels. Count</div>
                </div>
                { ready ?
                    locationList.map(d => {
                        return (
                            <div key={d._id} className="ms-Grid-row">
                                <div className="ms-Grid-col ms-lg2">{d._id}</div>
                                <div className="ms-Grid-col ms-lg4">{d.name}</div>
                                <div className="ms-Grid-col ms-lg2">{d.organizations.length}</div>
                                <div className="ms-Grid-col ms-lg2">{d.relations.length}</div>
                                <div className="ms-Grid-col ms-lg2">
                                    <DefaultButton type="button">
                                        <Link to={{ pathname: "/location/view", state: d }}>View</Link>
                                    </DefaultButton>
                                </div>
                            </div>
                        )
                    }) : ''
                }
            </div>
        );
    }
};

const locationTableSubd = withTracker((props) => {
    const handle = Meteor.subscribe('location.all');

    return {
        ready: handle.ready(),
        locationList: handle.ready() ? Location.find().fetch() : []
    };
})(LocationTable);

export { locationTableSubd as LocationTable };