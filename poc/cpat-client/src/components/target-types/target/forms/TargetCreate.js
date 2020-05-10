import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { withFormik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import { TargetDocumentRelationFormArray } from './form-arrays/TargetDocumentRelationFormArray';
import { Button, TextInput, Heading } from 'evergreen-ui';
import styled from 'styled-components';
import { targetActions } from '../../../../state-management/target/actions';
import User from '../../../../data/User';
import Target from '../../../../data/Target';

const FormStyle = styled.div`
    padding: 3em;

    form {
        display: flex;
        flex-direction: column;
    }
`;

const TargetCreate = (props) => {
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
            <h2>Target: Create New</h2>

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

                    <label>Region</label>
                    <TextInput 
                        name="region"
                        label="Region"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.region}
                    />
                    {(touched.region && errors.region) ? <div>{errors.region}</div> : ""}

                    <label>Collection Type</label>
                    <TextInput 
                        name="collectionType"
                        label="Collection Type"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.collectionType}
                    />
                    {(touched.collectionType && errors.collectionType) ? <div>{errors.collectionType}</div> : ""}

                    <label>Date Created:</label>
                    <TextInput 
                        disabled 
                        name="dateCreated"
                        label="Date Created"
                        value={values.dateCreated || `${new Date().toLocaleDateString()}`} />

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
                        value={values.lastModifiedBy || `You - User 1`} />

                    <FieldArray name="documentRelation" component={TargetDocumentRelationFormArray} />

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
        region,
        collectionType,
        documentRelation,
        dateCreated,
        updatedAt,
        lastModifiedBy
    }) => {
        return {
            name: name || '',
            region: region || '',
            collectionType: collectionType || '',
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
        let newTarget = new Target();
        newTarget.name = values.name || '';
        newTarget.region = values.region || '';
        newTarget.collectionType = values.collectionType || '';
        newTarget.selected = false;
        newTarget.documentRelation = values.documentRelation || [];
        newTarget.dateCreated = values.dateCreated || new Date();
        newTarget.updatedAt = values.updatedAt || new Date();
        newTarget.lastModifiedBy = values.lastModifiedBy || new User();

        props.dispatch(targetActions.insertTarget(newTarget.apiObject()));
        setSubmitting(false);
    }
})(TargetCreate);

function mapStateToProps(state) {
    const {  } = state;
    return { };
}

const TargetCreateConnection = connect(mapStateToProps)(formikEnhancer);
export { TargetCreateConnection as TargetCreate };