import React, { Component } from 'react';
import { withFormik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import { TextField, MaskedTextField, PrimaryButton, DefaultButton } from 'office-ui-fabric-react';
import { PersonCreateFormArray } from './PersonCreateFormArray';
import { PersonCreateFormArrayPhoneNumbers } from './PersonCreateFormArrayPhoneNumbers';
import { PersonCreateFormArraySocialLinks } from './PersonCreateFormArraySocialLinks';

class PersonCreateForm extends Component {
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
				<div className="ms-fontSize-18">Create a person</div>

				<TextField
					name="firstName"
					label="First Name"
					type="text"
					onChange={handleChange}
					onBlur={handleBlur}
					value={values.firstName} />
				{(touched.firstName && errors.firstName) ? <div>{errors.firstName}</div> : ""}

				<TextField
					name="middleName"
					label="Middle Name"
					type="text"
					onChange={handleChange}
					onBlur={handleBlur}
					value={values.middleName} />
				{(touched.middleName && errors.middleName) ? <div>{errors.middleName}</div> : ""}

				<TextField
					name="lastName"
					label="Last Name"
					type="text"
					onChange={handleChange}
					onBlur={handleBlur}
					value={values.lastName} />
				{(touched.lastName && errors.lastName) ? <div>{errors.lastName}</div> : ""}

				<TextField
					name="nickNames"
					label="Nick Names/Pseudonyms"
					type="text"
					onChange={handleChange}
					onBlur={handleBlur}
					value={values.nickNames} />
				{(touched.nickNames && errors.nickNames) ? <div>{errors.nickNames}</div> : ""}

				<FieldArray name="phoneNumbers" component={PersonCreateFormArrayPhoneNumbers} />

				<TextField
					name="organizations"
					label="Organizations"
					type="text"
					onChange={handleChange}
					onBlur={handleBlur}
					value={values.organizations} />
				{(touched.organizations && errors.organizations) ? <div>{errors.organizations}</div> : ""}

				<TextField
					name="emailAddresses"
					label="Email Addresses"
					type="text"
					onChange={handleChange}
					onBlur={handleBlur}
					value={values.emailAddresses} />
				{(touched.emailAddresses && errors.emailAddresses) ? <div>{errors.emailAddresses}</div> : ""}

				<TextField
					name="employers"
					label="Employers"
					type="text"
					onChange={handleChange}
					onBlur={handleBlur}
					value={values.employers} />
				{(touched.employers && errors.employers) ? <div>{errors.employers}</div> : ""}

				<FieldArray name="socialLinks" component={PersonCreateFormArraySocialLinks} />
				<FieldArray name="relations" component={PersonCreateFormArray} />

				<PrimaryButton type="submit" text="Submit" />

			</Form>
		);
	}
};

const formikEnhancer = withFormik({
	mapPropsToValues({ firstName, middleName, lastName, nickNames, phoneNumbers, organizations, emailAddresses, employers, socialLinks, relations }) {
		return {
			firstName: firstName || '',
			middleName: middleName || '',
			lastName: lastName || '',
			nickNames: nickNames || '',
			phoneNumbers: phoneNumbers || [''],
			organizations: organizations || '',
			emailAddresses: emailAddresses || '',
			employers: employers || '',
			socialLinks: socialLinks || [{}],
			relations: relations || [{}]
		}
	},
	validationSchema: Yup.object().shape({
		firstName: Yup.string().required("First name is required.")
	}),
	handleSubmit: (values, { props, setSubmitting }) => {
		const { firstName, middleName, lastName, nickNames, phoneNumbers, organizations, emailAddresses, employers, socialLinks, relations } = values;
		const { insertDocFunc } = props.meteorSubd;

		// kick-off server-side methods to store in DB, here
		console.log(`Submit on Person Create form. Name: ${firstName}`);
		insertDocFunc({ firstName, middleName, lastName, nickNames, phoneNumbers, organizations, emailAddresses, employers, socialLinks, relations });

		setSubmitting(false);
	}
})(PersonCreateForm);

export { formikEnhancer as PersonCreateForm };