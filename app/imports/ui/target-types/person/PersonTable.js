import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { DefaultButton } from 'office-ui-fabric-react';

import Person from '../../../api/person/person';

class PersonTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { ready, personList } = this.props;

        return (
            <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-lg2 ms-fontSize-18">Id</div>
                    <div className="ms-Grid-col ms-lg4 ms-fontSize-18">Name</div>
                    <div className="ms-Grid-col ms-lg2 ms-fontSize-18">Org. Count</div>
                    <div className="ms-Grid-col ms-lg2 ms-fontSize-18">Rels. Count</div>
                </div>
                { ready ?
                    personList.map(d => {
                        return (
                            <div key={d._id} className="ms-Grid-row">
                                <div className="ms-Grid-col ms-lg2">{d._id}</div>
                                <div className="ms-Grid-col ms-lg4">{d.name}</div>
                                <div className="ms-Grid-col ms-lg2">{d.organizations.length}</div>
                                <div className="ms-Grid-col ms-lg2">{d.relations.length}</div>
                                <div className="ms-Grid-col ms-lg2">
                                    <DefaultButton type="button">
                                        <Link to={{ pathname: "/person/view", state: d }}>View</Link>
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

const personTableSubd = withTracker((props) => {
    const handle = Meteor.subscribe('person.all');

    return {
        ready: handle.ready(),
        personList: handle.ready() ? Person.find().fetch() : []
    };
})(PersonTable);

export { personTableSubd as PersonTable };