import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
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

const CompanyUpdate = (props) => {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleReset
    } = props;

    let history = useHistory();
    let match = useRouteMatch('/company/update/:id');
    console.log(`match: ${match && match.params ? match.params.id : ''}`);

    return (
        <div>
            <Heading size={600}>Company: Update</Heading>

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
        updatedAt,
        lastModifiedBy
    }) => {
        return {
            name: name || '',

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

            updatedAt: values.updatedAt,
            lastModifiedBy: values.lastModifiedBy
        };

        props.dispatch(companyActions.updateCompany(companyDocument));
        setSubmitting(false);
    }
})(CompanyUpdate);

function mapStateToProps(state) {
    const {  } = state;
    return { };
}

const CompanyUpdateConnection = connect(mapStateToProps)(formikEnhancer);
export { CompanyUpdateConnection as CompanyUpdate };