import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { withFormik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { Button, TextInput, Heading } from 'evergreen-ui';
import { deviceActions } from '../../../../state-management/device/actions';
import { DeviceDocumentRelationFormArray } from './form-arrays/DeviceDocumentRelationFormArray';
import { DeviceOrganizationsFormArray } from './form-arrays/DeviceOrganizationsFormArray';
import Device from '../../../../data/Device';
import User from '../../../../data/User';

const FormStyle = styled.div`
    padding: 3em;    

    form {
        display: flex;
        flex-direction: column;
    }
`;

const DeviceCreate = (props) => {
    const {
        values,
        touched,
        errors,
        dirty,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset,
        isSubmitting,
    } = props;

    let history = useHistory();

    return (
        <div>
            <h2>Device: Create New</h2>

            <FormStyle>
                <Form>
                    <label>Name</label>
                    <TextInput
                        name="name"
                        label="Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                    />
                    {(touched.name && errors.name) ? <div>{errors.name}</div> : ""}

                    <FieldArray name="organizations" component={DeviceOrganizationsFormArray} />
                    <FieldArray name="documentRelation" component={DeviceDocumentRelationFormArray} />

                    <label>Date Created:</label>
                    <TextInput
                        disabled 
                        name="dateCreated"
                        label="Date Created"
                        value={`${new Date('2020-01-30').toLocaleDateString()}`} />

                    <label>Updated At:</label>
                    <TextInput
                        disabled 
                        name="updatedAt"
                        label="Updated At"
                        value={`${new Date().toLocaleDateString()}`} />

                    <label>Last Modified By:</label>
                    <TextInput
                        disabled 
                        name="lastModifiedBy"
                        label="Last Modified By"
                        value={`You - User 1`} />

                    <div style={{ display: 'flex' }}>
                        <Button type="submit">Create</Button>
                        <Button onClick={handleReset}>Cancel</Button>
                    </div>
                </Form>

                <Button onClick={() => history.goBack()}>Back</Button>
            </FormStyle>
        </div>
    )
};

const formikEnhancer = withFormik({
    mapPropsToValues: ({ 
        name,
        organizations,
        documentRelation,
        dateCreated,
        updatedAt,
        lastModifiedBy
    }) => {
        return {
            name: name || '',
            organizations: organizations || [{}],
            documentRelation: documentRelation || [{}],
            dateCreated: dateCreated,
            updatedAt: updatedAt,
            lastModifiedBy: lastModifiedBy
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required('Name is required')
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        let newDevice = new Device();
        newDevice.name = values.name || '';
        newDevice.organizations = values.organizations || [{}];
        newDevice.documentRelation = values.documentRelation || [{}];
        newDevice.dateCreated = values.dateCreated || new Date();
        newDevice.updatedAt = values.updatedAt || new Date();
        newDevice.lastModifiedBy = values.lastModifiedBy || new User();

        props.dispatch(deviceActions.insertDevice(newDevice.apiObject()));
        setSubmitting(false);
    }
})(DeviceCreate);

function mapStateToProps(state) {
    const {  } = state;
    return { };
}

const DeviceCreateConnection = connect(mapStateToProps)(formikEnhancer);
export { DeviceCreateConnection as DeviceCreate };