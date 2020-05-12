import React, { useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import { withFormik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import { CompanyDocumentRelationFormArray } from './form-arrays/CompanyDocumentRelationFormArray';
import { Button, TextInput, Heading } from 'evergreen-ui';
import styled from 'styled-components';
import { companyActions } from '../../../../state-management/company/actions';
import Company from '../../../../data/Company';

const FormStyle = styled.div`
    padding: 3em;    

    form {
        display: flex;
        flex-direction: column;
    }
`;

const CompanyUpdate = (props) => {
    let history = useHistory();
    let match = props.match; //useRouteMatch('/company/update/:id');

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleReset
    } = props;

    // Other supporting values supplied via props
    const { dispatch, company, loading, updateResult } = props;

    useEffect(() => {
        dispatch(companyActions.getCompany(match.params.id));
    }, []);

    return (
        <div>
            {loading === true ? <h3>Loading...</h3> :
                <FormStyle>
                    <Heading size={600}>Company: Update</Heading>
                    <h2>Updating: {company && company.name ? company.name : ''}</h2>

                    <p>
                        <b>update result: {(updateResult !== null) ? updateResult : ''}</b>
                    </p>

                    <Form>
                        <label>Name</label>
                        <TextInput 
                            name="name"
                            label="Name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name || company.name}
                        />
                        {(touched.name && errors.name) ? <div>{errors.name}</div> : ""}

                        <FieldArray name="documentRelation" component={CompanyDocumentRelationFormArray} />

                        <label>Date Created:</label>
                        <TextInput 
                            disabled 
                            name="dateCreated"
                            label="Date Created"
                            value={company.dateCreated} />

                        <label>Updated At:</label>
                        <TextInput 
                            disabled 
                            name="updatedAt"
                            label="Updated At"
                            value={company.updatedAt} />

                        <label>Last Modified By:</label>
                        <TextInput 
                            disabled 
                            name="lastModifiedBy"
                            label="Last Modified By"
                            value={`You - User 1`} />
                        
                        <Button type="submit">Save Update</Button>
                        <Button onClick={handleReset}>Cancel</Button>
                    </Form>

                    <Button onClick={() => history.goBack()}>Back</Button>
                </FormStyle>
            }
        </div>
    )
};

const formikEnhancer = withFormik({
    mapPropsToValues: ({ 
        name,
        documentRelation,
        updatedAt,
        lastModifiedBy,

        company
    }) => {
        return {
            name: name || company.name,
            documentRelation: (Array.isArray(documentRelation) && documentRelation.length > 0) || company.documentRelation,
            updatedAt: updatedAt || company.updatedAt,
            lastModifiedBy: lastModifiedBy || company.lastModifiedBy
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required('Name is required')
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        let newCompany = new Company();
        newCompany.name = values.name || '';
        newCompany.documentRelation = values.documentRelation;
        newCompany.updatedAt = values.updatedAt;
        newCompany.lastModifiedBy = values.lastModifiedBy;

        props.dispatch(companyActions.partialUpdateCompany(props.company.id, newCompany.apiObject()));
        setSubmitting(false);
    }
})(CompanyUpdate);

function mapStateToProps(state) {
    const {  } = state;
    return {
        company: (state.company && state.company.company) ? state.company.company : {},
        updateResult: (state.company && state.company.partialUpdateResult) ? state.company.partialUpdateResult : 0,
        loading: state.company ? state.company.loading : false
    };
}

const companyUpdateConnection = connect(mapStateToProps)(formikEnhancer);
export { companyUpdateConnection as CompanyUpdate };