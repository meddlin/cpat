import React, { Component } from 'react';
import { withFormik, Form } from 'formik';
import * as Yup from 'yup';
import { TextField, MaskedTextField, PrimaryButton } from 'office-ui-fabric-react';

class CreateForm extends Component {
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
				<TextField
					name="name"
					label="Name"
					type="text"
					onChange={handleChange}
					onBlur={handleBlur}
					value={values.name} />
				{(touched.name && errors.name) ? <div>{errors.name}</div> : ""}

				<TextField
					name="relations"
					label="Relations"
					onChange={handleChange}
					onBlur={handleBlur}
					value={values.relations}
					margin="normal" />
				{(touched.relations && errors.relations) ? <div>{errors.relations}</div> : ""}

				<PrimaryButton
					type="submit"
					text="submit" />

			</Form>
		);
	}
};

const formikEnhancer = withFormik({
	mapPropsToValues({ name, relations }) {
		return {
			name: name || '',
			relations: relations || ''
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
})(CreateForm);

export { formikEnhancer as CreateForm };