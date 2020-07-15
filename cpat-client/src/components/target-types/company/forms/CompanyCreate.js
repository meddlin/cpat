import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { withFormik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import { Button, TextInput, Heading } from 'evergreen-ui';
import { CompanyDocumentRelationFormArray } from './form-arrays/CompanyDocumentRelationFormArray';
import styled from 'styled-components';
import User from '../../../../data/User';
import { companyActions } from '../../../../state-management/company/actions';
import Company from '../../../../data/Company';

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
                        value={values.dateCreated || `${new Date('2020-01-30').toLocaleDateString()}`} />

                    <label>Updated At:</label>
                    <TextInput 
                        disabled 
                        name="updatedAt"
                        label="Updated At"
                        value={values.updatedAt || `${new Date().toLocaleDateString()}`} />

                    <label>Last Modified By:</label>
                    <TextInput 
                        disabled 
                        name="lastModifiedBy"
                        label="Last Modified By"
                        value={`You - User 1`} />
                    
                    <FieldArray name="documentRelation" component={CompanyDocumentRelationFormArray} />

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
        documentRelation,
        dateCreated,
        updatedAt,
        lastModifiedBy
    }) => {
        return {
            name: name || '',
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
        let newCompany = new Company();
        newCompany.name = values.name || '';
        newCompany.documentRelation = values.documentRelation || [];
        newCompany.dateCreated = values.dateCreated || new Date();
        newCompany.updatedAt = values.updatedAt || new Date();
        newCompany.lastModifiedBy = values.lastModifiedBy || new User();

        props.dispatch(companyActions.insertCompany(newCompany.apiObject()));
        setSubmitting(false);
    }
})(CompanyCreate);

function mapStateToProps(state) {
    const {  } = state;
    return { };
}

const CompanyCreateConnection = connect(mapStateToProps)(formikEnhancer);
export { CompanyCreateConnection as CompanyCreate };