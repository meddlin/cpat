import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import { withFormik, Form } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { deviceActions } from '../../../../state-management/device/actions';

const FormStyle = styled.div`
    padding: 3em;    

    form {
        display: flex;
        flex-direction: column;
    }
`;

const DeviceUpdate = (props) => {
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
            <h2>Device: Update</h2>

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
        let deviceDocument = {
            name: values.name || '',

            updatedAt: values.updatedAt,
            lastModifiedBy: values.lastModifiedBy
        };

        props.dispatch(deviceActions.updateDevice(deviceDocument));
        setSubmitting(false);
    }
})(DeviceUpdate);

function mapStateToProps(state) {
    const {  } = state;
    return { };
}

const DeviceUpdateConnection = connect(mapStateToProps)(formikEnhancer);
export { DeviceUpdateConnection as DeviceUpdate };