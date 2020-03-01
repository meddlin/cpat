import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import { withFormik, Form } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { targetActions } from '../../../../state-management/target/actions';

const FormStyle = styled.div`
    padding: 3em;    

    form {
        display: flex;
        flex-direction: column;
    }
`;

const TargetUpdate = (props) => {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleReset,
    } = props;

    let history = useHistory();
    let match = useRouteMatch('/company/update/:id');
    console.log(`match: ${match && match.params ? match.params.id : ''}`);

    return (
        <div>
            <h2>Target: Update</h2>

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

                    <label>Region</label>
                    <input 
                        name="region"
                        label="Region"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.region}
                    />
                    {(touched.region && errors.region) ? <div>{errors.region}</div> : ""}

                    <label>Collection Type</label>
                    <input 
                        name="collectionType"
                        label="Collection Type"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.collectionType}
                    />
                    {(touched.collectionType && errors.collectionType) ? <div>{errors.collectionType}</div> : ""}

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
        name, 
        region, 
        collectionType,
        updatedAt,
        lastModifiedBy
    }) => {
        return {
            name: name || '',
            region: region || '',
            collectionType: collectionType || '',

            updatedAt: updatedAt,
            lastModifiedBy: lastModifiedBy
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required('Name is required')
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        let targetDocument = {
            name: values.name || '',
            region: values.region || '',
            collectionType: values.collectionType || '',

            updatedAt: values.updatedAt,
            lastModifiedBy: values.lastModifiedBy
        };

        props.dispatch(targetActions.updateTarget(targetDocument));
        setSubmitting(false);
    }
})(TargetUpdate);

function mapStateToProps(state) {
    const {  } = state;
    return { };
}

const TargetUpdateConnection = connect(mapStateToProps)(formikEnhancer);
export { TargetUpdateConnection as TargetUpdate };