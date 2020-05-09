import React, { useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import { withFormik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import { TargetCreateFormArray } from './TargetCreateFormArray';
import { Button, TextInput, Heading } from 'evergreen-ui';
import styled from 'styled-components';
import { targetActions } from '../../../../state-management/target/actions';
import Target from '../../../../data/Target';

const FormStyle = styled.div`
    padding: 3em;    

    form {
        display: flex;
        flex-direction: column;
    }
`;

const TargetUpdate = (props) => {
    let history = useHistory();
    let match = props.match; //useRouteMatch('/company/update/:id');

    const {
        values,
        touched,
        errors,
        handleSubmit,
        handleChange,
        handleBlur,
        handleReset,
    } = props;

    // Other supporting values supplied via props
    const { dispatch, target, loading, updateResult } = props;

    useEffect(() => {
        dispatch(targetActions.getTarget(match.params.id));
    }, []);

    return (
        <div>
            {(loading === true) ? <h3>Loading...</h3> :
                <FormStyle>
                    <h1>Target Update</h1>
                    <h2>Updating: {target && target.name ? target.name : ''}</h2>
                    <h3>Target type: {target && target.collectionType ? target.collectionType : ''}</h3>

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
                            value={values.name || target.name}
                        />
                        {(touched.name && errors.name) ? <div>{errors.name}</div> : ""}

                        <label>Region</label>
                        <TextInput 
                            name="region"
                            label="Region"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.region || target.region}
                        />
                        {(touched.region && errors.region) ? <div>{errors.region}</div> : ""}

                        <label>Collection Type</label>
                        <TextInput 
                            name="collectionType"
                            label="Collection Type"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.collectionType || target.collectionType}
                        />
                        {(touched.collectionType && errors.collectionType) ? <div>{errors.collectionType}</div> : ""}

                        <FieldArray name="documentRelation" component={TargetCreateFormArray} />

                        <label>Date Created:</label>
                        <TextInput 
                            disabled 
                            name="dateCreated"
                            label="Date Created"
                            value={target.dateCreated} />

                        <label>Updated At:</label>
                        <TextInput 
                            disabled 
                            name="updatedAt"
                            label="Updated At"
                            value={target.updatedAt} />

                        <label>Last Modified By:</label>
                        <TextInput 
                            disabled 
                            name="lastModifiedBy"
                            label="Last Modified By"
                            value={target.lastModifiedBy || 'some user'} />
                        
                        <div style={{ display: 'flex' }}>
                            <Button type="submit">Save Update</Button>
                            <Button onClick={handleReset}>Cancel</Button>
                        </div>
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
        region, 
        collectionType,
        dateCreated,
        updatedAt,
        lastModifiedBy,
        documentRelation,

        target
    }) => {
        return {
            name: name || target.name,
            region: region || target.region,
            collectionType: collectionType || target.collectionType,
            dateCreated: dateCreated || target.dateCreated,
            updatedAt: updatedAt || target.updatedAt,
            lastModifiedBy: lastModifiedBy || target.lastModifiedBy,
            documentRelation: (Array.isArray(documentRelation) && documentRelation.length > 0) || target.documentRelation
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required('Name is required')
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        let newTarget = new Target();

        newTarget.name = values.name;
        newTarget.region = values.region;
        newTarget.collectionType = values.collectionType;
        newTarget.documentRelation = values.documentRelation; //values.documentRelation || props.target.documentRelation;
        // newTarget.selected = false; //values.selected === null ? props.target.selected : values.selected;
        // newTarget.lastModifiedBy = "bob"; //values.lastModifiedBy || props.target.lastModifiedBy;
        newTarget.updatedAt = new Date();

        props.dispatch(targetActions.partialUpdateTarget(props.target.id, newTarget.apiObject()));
        setSubmitting(false);
    }
})(TargetUpdate);

function mapStateToProps(state) {
    return {
        target: (state.target && state.target.targets) ? state.target.targets : {},
        updateResult: (state.target && state.target.partialUpdateResult) ? state.target.partialUpdateResult : 0,
        loading: state.target ? state.target.loading : false
     };
}

const TargetUpdateConnection = connect(mapStateToProps)(formikEnhancer);
export { TargetUpdateConnection as TargetUpdate };