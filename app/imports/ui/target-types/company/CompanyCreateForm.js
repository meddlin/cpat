import React, { Component } from 'react';
import { withFormik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import { TextField, MaskedTextField, PrimaryButton, DefaultButton } from 'office-ui-fabric-react';
import { CompanyCreateFormArray } from './CompanyCreateFormArray';

class CompanyCreateForm extends Component {
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
				<div className="ms-fontSize-18">Create a company</div>

				<TextField
					name="name"
					label="Name"
					type="text"
					onChange={handleChange}
					onBlur={handleBlur}
					value={values.name} />
				{(touched.name && errors.name) ? <div>{errors.name}</div> : ""}

				<FieldArray name="relations" component={CompanyCreateFormArray} />

				<PrimaryButton
					type="submit"
					text="Submit" />

			</Form>
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
			insertDocFunc({ name, relations });
		}

		setSubmitting(false);
	}
})(CompanyCreateForm);

export { formikEnhancer as CompanyCreateForm };