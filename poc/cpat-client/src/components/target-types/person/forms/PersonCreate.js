import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { withFormik, Form } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { personActions } from '../../../../state-management/person/actions';

const FormStyle = styled.div`
    padding: 3em;    

    form {
        display: flex;
        flex-direction: column;
    }
`;

const PersonCreate = (props) => {
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
            <h2>Person: Create New</h2>

            <FormStyle>
                <Form>
                    <label>First Name</label>
                    <input 
                        name="firstName"
                        label="First Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.firstName}
                    />
                    {(touched.firstName && errors.firstName) ? <div>{errors.firstName}</div> : ""}

                    <label>Middle Name</label>
                    <input 
                        name="middleName"
                        label="Middle Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.middleName}
                    />
                    {(touched.middleName && errors.middleName) ? <div>{errors.middleName}</div> : ""}

                    <label>Last Name</label>
                    <input 
                        name="lastName"
                        label="Last Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.lastName}
                    />
                    {(touched.lastName && errors.lastName) ? <div>{errors.lastName}</div> : ""}

                    <label>Date Created:</label>
                    <input 
                        disabled 
                        name="dateCreated"
                        label="Date Created"
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
        firstName,
        middleName,
        lastName,
        dateCreated,
        updatedAt,
        lastModifiedBy
     }) => {
        return {
            firstName: firstName || '',
            middleName: middleName || '',
            lastName: lastName || '',

            dateCreated: dateCreated,
            updatedAt: updatedAt,
            lastModifiedBy: lastModifiedBy
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required('Name is required')
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        let personDocument = {
            firstName: values.firstName || '',
            middleName: values.middleName || '',
            lastName: values.lastName || '',

            dateCreated: values.dateCreated,
            updatedAt: values.updatedAt,
            lastModifiedBy: values.lastModifiedBy
        };

        props.dispatch(personActions.insertCompany(personDocument));
        setSubmitting(false);
    }
})(PersonCreate);

function mapStateToProps(state) {
    const {  } = state;
    return { };
}

const PersonCreateConnection = connect(mapStateToProps)(formikEnhancer);
export { PersonCreateConnection as PersonCreate };