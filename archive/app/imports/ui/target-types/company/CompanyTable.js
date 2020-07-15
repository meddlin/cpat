import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Company from '../../../api/company/company';

class CompanyTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { ready, companyList } = this.props;

        return (
            <div className="ms-Grid" dir="ltr">
                { ready ?
                    companyList.map(c => {
                        return (
                            <div key={c._id} className="ms-Grid-row">
                                <div className="ms-Grid-col ms-lg2">{c._id}</div>
                                <div className="ms-Grid-col ms-lg8">{c.name}</div>
                            </div>
                        )
                    }) : ''
                }
            </div>
        );
    }
};

const companyTableSubd = withTracker((props) => {
    const handle = Meteor.subscribe('company.all');

    return {
        ready: handle.ready(),
        companyList: handle.ready() ? Company.find().fetch() : []
    };
})(CompanyTable);

export { companyTableSubd as CompanyTable };