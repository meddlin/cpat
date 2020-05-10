import React, { useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import { withFormik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import { LocationDocumentRelationFormArray } from './form-arrays/LocationDocumentRelationFormArray';
import styled from 'styled-components';
import { Button, TextInput, Heading } from 'evergreen-ui';
import { locationActions } from '../../../../state-management/location/actions';
import Location from '../../../../data/Location';

const FormStyle = styled.div`
    padding: 3em;    

    form {
        display: flex;
        flex-direction: column;
    }
`;

const LocationUpdate = (props) => {
    let history = useHistory();
    let match = props.match; //useRouteMatch('/location/update/:id');

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleReset,
    } = props;

    // Other supporting values supplied via props
    const { dispatch, location, loading, updateResult } = props;

    useEffect(() => {
        dispatch(locationActions.getLocation(match.params.id));
    }, []);

    return (
        <div>
            <h2>Location: Update</h2>

            {(loading === true) ? <h3>Loading...</h3> :
                <div>
                    <FormStyle>
                        <Form>
                            <label>Name</label>
                            <TextInput 
                                name="name"
                                label="Name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name || location.name}
                            />
                            {(touched.name && errors.name) ? <div>{errors.name}</div> : ""}

                            <label>Latitude</label>
                            <TextInput 
                                name="latitude"
                                label="Latitude"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.latitude || location.latitude}
                            />
                            {(touched.latitude && errors.latitude) ? <div>{errors.latitude}</div> : ""}

                            <label>Longitude</label>
                            <TextInput 
                                name="longitude"
                                label="Longitude"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.longitude || location.longitude}
                            />
                            {(touched.longitude && errors.longitude) ? <div>{errors.longitude}</div> : ""}

                            <FieldArray name="documentRelation" component={LocationDocumentRelationFormArray} />

                            <label>Date Created:</label>
                            <TextInput 
                                disabled 
                                value={location.dateCreated} />

                            <label>Updated At:</label>
                            <TextInput 
                                disabled 
                                name="updatedAt"
                                label="Updated At"
                                value={location.updatedAt} />

                            <label>Last Modified By:</label>
                            <TextInput 
                                disabled 
                                name="lastModifiedBy"
                                label="Last Modified By"
                                value={location.lastModifiedBy || 'some user'} />

                            <Button type="submit">Create</Button>
                            <Button onClick={handleReset}>Cancel</Button>
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
        latitude, 
        longitude,
        documentRelation,
        updatedAt,
        lastModifiedBy,

        location
    }) => {
        return {
            name: name || location.name,
            latitude: latitude || location.latitude,
            longitude: longitude || location.longitude,
            documentRelation: (Array.isArray(documentRelation) && documentRelation.length > 0) || location.documentRelation,
            updatedAt: updatedAt || location.updatedAt,
            lastModifiedBy: lastModifiedBy || location.lastModifiedBy
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required('Name is required')
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        let newLocation = new Location();
        newLocation.name = values.name;
        newLocation.latitude = values.latitude;
        newLocation.longitude = values.longitude;
        newLocation.documentRelation = values.documentRelation;
        
        newLocation.updatedAt = values.updatedAt;
        newLocation.lastModifiedBy = values.lastModifiedBy;

        props.dispatch(locationActions.partialUpdateLocation(props.location.id, newLocation.apiObject()));
        setSubmitting(false);
    }
})(LocationUpdate);

function mapStateToProps(state) {
    return {
        location: (state.location && state.location.location) ? state.location.location : {},
        updateResult: (state.location && state.location.partialUpdateResult) ? state.location.partialUpdateResult : 0,
        loading: state.location ? state.location.loading : false
    };
}

const LocationUpdateConnection = connect(mapStateToProps)(formikEnhancer);
export { LocationUpdateConnection as LocationUpdate };