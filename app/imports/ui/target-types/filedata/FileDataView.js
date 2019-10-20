import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import FileData from '../../../api/files/files';

class FileDataView extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const { subdFileData } = this.props;

        return (
            <div>


                {subdFileData ? 
                    <div>
                        <h4>id: {subdFileData._id}</h4>

                        <i>Date Created: {subdFileData && subdFileData.dateCreated ? subdFileData.dateCreated.toDateString() : ''}</i>

                        <h4>Source/Contents</h4>
                        <div>{subdFileData.source}</div>
                    </div> : 
                    'filedata was false/non-existent'}
            </div>
        );
    }
};

export default withTracker((props) => {
    const { match } = props;

    let docId = match.params.id;
    const handle = Meteor.subscribe('filedata.single', docId);

    return {
        ready: handle.ready(),
        subdFileData: FileData.findOne()
    };
})(FileDataView);