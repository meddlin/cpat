import React, { Component } from 'react';
import { withFormik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import { TextField, MaskedTextField, PrimaryButton, DefaultButton } from 'office-ui-fabric-react';
import { LocationCreateFormArray } from './LocationCreateFormArray';
import { LocationTable } from '../LocationTable';

class LocationCreateForm extends Component {
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
            <div>
                <Form>
                    <div className="ms-fontSize-18">Create a device</div>
                    <TextField
						name="name"
						label="Name"
						type="text"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.name} />
                    {(touched.name && errors.name) ? <div>{errors.name}</div> : ""}
                    
                    <FieldArray name="relations" component={LocationCreateFormArray} />

                    <PrimaryButton
						type="submit"
						text="Submit" />
                </Form>

                <LocationTable />
            </div>
        );
    }
};

const formikEnhancer = withFormik({
	mapPropsToValues({ name, relations }) {
		return {
			name: name || '',
			relations: relations || [ { } ]
		}
	},
	validationSchema: Yup.object().shape({
		name: Yup.string().required("Name is required.")
	}),
	handleSubmit: (values, { props, setSubmitting }) => {
		const { name, relations } = values;
		const { insertDocFunc } = props.meteorSubd;

		if (name) {
			// kick-off server-side methods to store in DB, here
			console.log(`Submit on Company Create form. Name: ${name}`);
			insertDocFunc({ name });
		}

		setSubmitting(false);
	}
})(LocationCreateForm);

export { formikEnhancer as LocationCreateForm };