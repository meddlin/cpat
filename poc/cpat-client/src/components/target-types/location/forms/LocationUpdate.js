import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { withFormik, Form } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { locationActions } from '../../../../state-management/location/actions';

const FormStyle = styled.div`
    padding: 3em;    

    form {
        display: flex;
        flex-direction: column;
    }
`;

const LocationUpdate = (props) => {
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
            <h2>Location: Update</h2>

            <FormStyle>
                <Form>
                    <label>Name</label>
                    <input 
                        name="name"
                        label="Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                    />
                    {(touched.name && errors.name) ? <div>{errors.name}</div> : ""}

                    <label>Latitude</label>
                    <input 
                        name="latitude"
                        label="Latitude"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.latitude}
                    />
                    {(touched.latitude && errors.latitude) ? <div>{errors.latitude}</div> : ""}

                    <label>Longitude</label>
                    <input 
                        name="longitude"
                        label="Longitude"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.longitude}
                    />
                    {(touched.longitude && errors.longitude) ? <div>{errors.longitude}</div> : ""}

                    <label>Date Created:</label>
                    <input 
                        disabled 
                        value={`${new Date('2020-01-30').toLocaleDateString()}`} />

                    <label>Updated At:</label>
                    <input 
                        disabled 
                        name="updatedAt"
                        label="Updated At"
                        value={`${new Date().toLocaleDateString()}`} />

                    <label>Last Modified By:</label>
                    <input 
                        disabled 
                        name="lastModifiedBy"
                        label="Last Modified By"
                        value={`You - User 1`} />
                </Form>

                <button type="submit">Create</button>
                <button onClick={handleReset}>Cancel</button>

                <button onClick={() => history.goBack()}>Back</button>
            </FormStyle>
        </div>
    )
};

const formikEnhancer = withFormik({
    mapPropsToValues: ({ 
        name, 
        latitude, 
        longitude,
        dateCreated,
        updatedAt,
        lastModifiedBy
    }) => {
        return {
            name: name || '',
            latitude: latitude || '',
            longitude: longitude || '',

            updatedAt: updatedAt,
            lastModifiedBy: lastModifiedBy
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required('Name is required')
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        let locationDocument = {
            name: values.name || '',
            latitude: values.latitude || '',
            longitude: values.longitude || '',

            updatedAt: values.updatedAt,
            lastModifiedBy: values.lastModifiedBy
        };

        props.dispatch(locationActions.updateLocation(locationDocument));
        setSubmitting(false);
    }
})(LocationUpdate);

function mapStateToProps(state) {
    const {  } = state;
    return { };
}

const LocationUpdateConnection = connect(mapStateToProps)(formikEnhancer);
export { LocationUpdateConnection as LocationUpdate };