import React, { useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import { withFormik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { Button, TextInput, Heading } from 'evergreen-ui';
import { DeviceDocumentRelationFormArray } from './form-arrays/DeviceDocumentRelationFormArray';
import { DeviceOrganizationsFormArray } from './form-arrays/DeviceOrganizationsFormArray';
import { deviceActions } from '../../../../state-management/device/actions';
import Device from '../../../../data/Device';

const FormStyle = styled.div`
    padding: 3em;    

    form {
        display: flex;
        flex-direction: column;
    }
`;

const DeviceUpdate = (props) => {
    let history = useHistory();
    let match = props.match; //useRouteMatch('/company/update/:id');

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleReset,
    } = props;

    // Other supporting values supplied via props
    const { dispatch, device, loading, updateResult } = props;

    useEffect(() => {
        dispatch(deviceActions.getDevice(match.params.id));
    }, []);

    return (
        <div>
            <h2>Device: Update</h2>
            <h2>Updating: {device && device.name ? device.name : ''}</h2>

            <p>
                <b>update result: {(updateResult !== null) ? updateResult : ''}</b>
            </p>

            {loading === true ? <h3>Loading...</h3> : 
                <div>
                    <FormStyle>
                        <Form>
                            <label>Name</label>
                            <TextInput 
                                name="name"
                                label="Name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name || device.name}
                            />
                            {(touched.name && errors.name) ? <div>{errors.name}</div> : ""}

                            <FieldArray name="organizations" component={DeviceOrganizationsFormArray} />
                            <FieldArray name="documentRelation" component={DeviceDocumentRelationFormArray} />

                            <label>Date Created:</label>
                            <TextInput 
                                disabled 
                                name="dateCreated"
                                label="Date Created"
                                value={device.dateCreated} />

                            <label>Updated At:</label>
                            <TextInput 
                                disabled 
                                name="updatedAt"
                                label="Updated At"
                                value={device.updatedAt} />

                            <label>Last Modified By:</label>
                            <TextInput 
                                disabled 
                                name="lastModifiedBy"
                                label="Last Modified By"
                                value={device.lastModifiedBy || `some user`} />

                            <div style={{ display: 'flex' }}>
                                <Button type="submit">Save Update</Button>
                                <Button onClick={handleReset}>Cancel</Button>
                            </div>
                        </Form>

                        <Button onClick={() => history.goBack()}>Back</Button>
                    </FormStyle>
                </div>
            }
        </div>
    )
};

const formikEnhancer = withFormik({
    mapPropsToValues: ({ 
        name,
        organizations,
        documentRelation,
        updatedAt,
        lastModifiedBy,

        device
    }) => {
        return {
            name: name || device.name,
            organizations: (Array.isArray(organizations) && organizations.length > 0) || device.organizations,
            documentRelation: (Array.isArray(documentRelation) && documentRelation.length > 0) || device.documentRelation,
            updatedAt: updatedAt || device.updatedAt,
            lastModifiedBy: lastModifiedBy || device.lastModifiedBy
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required('Name is required')
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        let newDevice = new Device();
        newDevice.name = values.name;
        newDevice.organizations = values.organizations;
        newDevice.documentRelation = values.documentRelation;
        newDevice.dateCreated = values.dateCreated;
        newDevice.updatedAt = values.updatedAt;
        newDevice.lastModifiedBy = values.lastModifiedBy;

        props.dispatch(deviceActions.partialUpdateDevice(props.device.id, newDevice.apiObject()));
        setSubmitting(false);
    }
})(DeviceUpdate);

function mapStateToProps(state) {
    const {  } = state;
    return {
        device: (state.device && state.device.devices) ? state.device.devices : {},
        updateResult: (state.device && state.device.partialUpdateResult) ? state.device.partialUpdateResult : 0,
        loading: state.device ? state.device.loading : false
    };
}

const DeviceUpdateConnection = connect(mapStateToProps)(formikEnhancer);
export { DeviceUpdateConnection as DeviceUpdate };