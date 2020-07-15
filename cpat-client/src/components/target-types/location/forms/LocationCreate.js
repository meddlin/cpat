import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { withFormik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import { Button, TextInput, Heading } from 'evergreen-ui';
import { LocationDocumentRelationFormArray } from './form-arrays/LocationDocumentRelationFormArray';
import styled from 'styled-components';
import { locationActions } from '../../../../state-management/location/actions';
import Location from '../../../../data/Location';

const FormStyle = styled.div`
    padding: 3em;    

    form {
        display: flex;
        flex-direction: column;
    }
`;

const LocationCreate = (props) => {
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
            <h2>Location: Create New</h2>

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

                    <label>Latitude</label>
                    <TextInput 
                        name="latitude"
                        label="Latitude"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.latitude}
                    />
                    {(touched.latitude && errors.latitude) ? <div>{errors.latitude}</div> : ""}

                    <label>Longitude</label>
                    <TextInput 
                        name="longitude"
                        label="Longitude"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.longitude}
                    />
                    {(touched.longitude && errors.longitude) ? <div>{errors.longitude}</div> : ""}

                    <FieldArray name="documentRelation" component={LocationDocumentRelationFormArray} />

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

                    <Button type="submit">Create</Button>
                    <Button onClick={handleReset}>Cancel</Button>
                </Form>

                <Button onClick={() => history.goBack()}>Back</Button>
            </FormStyle>
        </div>
    )
};

const formikEnhancer = withFormik({
    mapPropsToValues: ({ 
        name, 
        latitude, 
        longitude,
        documentRelation,
        dateCreated,
        updatedAt,
        lastModifiedBy
    }) => {
        return {
            name: name || '',
            latitude: latitude || '',
            longitude: longitude || '',
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
        let newLocation = new Location();
        newLocation.name = values.name || '';
        newLocation.latitude = values.latitude || '';
        newLocation.longitude = values.longitude || '';
        newLocation.documentRelation = values.documentRelation || [{}];
        newLocation.dateCreated = values.dateCreated || new Date();
        newLocation.updatedAt = values.updatedAt || new Date();
        newLocation.lastModifiedBy = values.lastModifiedBy;

        props.dispatch(locationActions.insertLocation(newLocation.apiObject()));
        setSubmitting(false);
    }
})(LocationCreate);

function mapStateToProps(state) {
    const {  } = state;
    return { };
}

const LocationCreateConnection = connect(mapStateToProps)(formikEnhancer);
export { LocationCreateConnection as LocationCreate };