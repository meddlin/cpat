import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { withFormik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, TextInput, Heading } from 'evergreen-ui';
import styled from 'styled-components';
import { companyActions } from '../../../../state-management/company/actions';

const FormStyle = styled.div`
    padding: 3em;    

    form {
        display: flex;
        flex-direction: column;
    }
`;

const CompanyCreate = (props) => {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleReset,
    } = props;

    let history = useHistory();

    return (
        <div>
            <Heading size={600}>Company: Create New</Heading>

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
                </Form>

                <Button type="submit">Create</Button>
                <Button onClick={handleReset}>Cancel</Button>

                <Button onClick={() => history.goBack()}>Back</Button>
            </FormStyle>
        </div>
    )
};

const formikEnhancer = withFormik({
    mapPropsToValues: ({ 
        name,
        dateCreated,
        updatedAt,
        lastModifiedBy
    }) => {
        return {
            name: name || '',

            dateCreated: dateCreated,
            updatedAt: updatedAt,
            lastModifiedBy: lastModifiedBy
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required('Name is required')
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        let companyDocument = {
            name: values.name || '',

            dateCreated: values.dateCreated,
            updatedAt: values.updatedAt,
            lastModifiedBy: values.lastModifiedBy
        };

        props.dispatch(companyActions.insertCompany(companyDocument));
        setSubmitting(false);
    }
})(CompanyCreate);

function mapStateToProps(state) {
    const {  } = state;
    return { };
}

const CompanyCreateConnection = connect(mapStateToProps)(formikEnhancer);
export { CompanyCreateConnection as CompanyCreate };