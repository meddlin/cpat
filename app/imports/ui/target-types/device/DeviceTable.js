import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { DefaultButton } from 'office-ui-fabric-react';

import Device from '../../../api/device/device';

class DeviceTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { ready, deviceList } = this.props;

        return (
            <div>
                <DefaultButton>
                    <Link to={{ pathname: `/device/create`}}>New Device</Link>
                </DefaultButton>

                <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-lg2 ms-fontSize-18">Id</div>
                    <div className="ms-Grid-col ms-lg4 ms-fontSize-18">Name</div>
                    <div className="ms-Grid-col ms-lg2 ms-fontSize-18">Org. Count</div>
                    <div className="ms-Grid-col ms-lg2 ms-fontSize-18">Rels. Count</div>
                </div>
                { ready ?
                    deviceList.map(d => {
                        return (
                            <div key={d._id} className="ms-Grid-row">
                                <div className="ms-Grid-col ms-lg2">{d._id}</div>
                                <div className="ms-Grid-col ms-lg4">{d.name}</div>
                                <div className="ms-Grid-col ms-lg2">{d.organizations.length}</div>
                                <div className="ms-Grid-col ms-lg2">{d.relations.length}</div>
                                <div className="ms-Grid-col ms-lg2">
                                    <DefaultButton type="button">
                                        <Link to={{ pathname: `/device/view/${d._id}`, state: d }}>View</Link>
                                    </DefaultButton>
                                </div>
                            </div>
                        )
                    }) : ''
                }
            </div>
            </div>
        );
    }
};

const deviceTableSubd = withTracker((props) => {
    const handle = Meteor.subscribe('device.all');

    return {
        ready: handle.ready(),
        deviceList: handle.ready() ? Device.find().fetch() : []
    };
})(DeviceTable);

export { deviceTableSubd as DeviceTable };