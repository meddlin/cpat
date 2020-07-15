import React, { Component } from 'react';
import { withFormik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import { TextField, PrimaryButton, DefaultButton } from 'office-ui-fabric-react';
import { DeviceEditFormArray } from './DeviceEditFormArray';

class DeviceEditForm extends Component {
    render() {
        const {
            values,
			touched,
			errors,
			dirty,
			handleChange,
			handleBlur,
			handleSubmit,
			handleReset,
			isSubmitting
        } = this.props;

        return (
            <Form>
                <div className="ms-fontSize-18">Edit device</div>

                <TextField
						name="name"
						label="Name"
						type="text"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.name} />
                    {(touched.name && errors.name) ? <div>{errors.name}</div> : ""}
                
                <br />
                <div className="ms-fontSize-16">Organization(s)</div>
                <FieldArray 
                    name="organizations"
                    render={arrayHelpers => (
                        <div>
                            {values.organizations && values.organizations.length > 0 ? (
                                    values.organizations.map( (org, index) => (
                                        <div key={index}>
                                            <div className="ms-Grid-row" dir="ltr">
                                                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                                                    <TextField 
                                                        name={`organizations.${index}`} 
                                                        label="Organization"
                                                        onChange={handleChange}
                                                        value={org} />
                                                </div>
                                                <div className="ms-Grid-col ms-sm-2 ms-md4 ms-lg-2" style={{'marginTop': '1.8em'}}>
                                                    <DefaultButton 
                                                        type="button" 
                                                        onClick={() => arrayHelpers.remove(index)}> - </DefaultButton>
                                                    <DefaultButton 
                                                        type="button" 
                                                        onClick={() => arrayHelpers.insert((index + 1), '')}> + </DefaultButton>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <DefaultButton type="button" onclick={() => push('')}>Add an Organization</DefaultButton>
                                )}
                        </div>
                    )} />

                <FieldArray name="relations" component={DeviceEditFormArray} />
                    

                <PrimaryButton type="submit" text="Save" />
            </Form>
        );
    }
};

const formikEnhancer = withFormik({
    mapPropsToValues({ meteorSubd, name, organizations, relations }) {

        return {
            name: (meteorSubd ? meteorSubd.doc.name : ''),
			organizations: (meteorSubd ? meteorSubd.doc.organizations : ['']),
			relations: (meteorSubd ? meteorSubd.doc.relations : [ { } ])
        }
    },
    validationSchema: Yup.object().shape({
		name: Yup.string().required("Name is required.")
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
		const { name, organizations, relations } = values;
        const { updateDocFunc } = props.meteorSubd;
        const { _id } = props.meteorSubd.doc;

		if (name) {
			console.log(`Submit on Company Create form. Name: ${name}`);
			updateDocFunc(_id, { name, organizations, relations });
		}

		setSubmitting(false);
	}
})(DeviceEditForm);

export { formikEnhancer as DeviceEditForm };