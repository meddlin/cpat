import React, { Component } from 'react';
import { withFormik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import { TextField, MaskedTextField, PrimaryButton, DefaultButton } from 'office-ui-fabric-react';

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
				<h3>Create a company</h3>

				<TextField
					name="name"
					label="Name"
					type="text"
					onChange={handleChange}
					onBlur={handleBlur}
					value={values.name} />
				{(touched.name && errors.name) ? <div>{errors.name}</div> : ""}

				<FieldArray
					name="relations"
					label="Relations"
					render={arrayHelpers => (
						<div>
							{values.relations && values.relations.length > 0 ? (
								values.relations.map( (r, index) => (
									<div key={index}>
										<div className="ms-Grid ms-Grid-row" dir="ltr">
											<div className="ms-Grid-col ms-sm6 ms-md4 ms-lg3">
												<TextField name={`relations.${index}.name`} label="Relation Name" value={r.name} />
											</div>
											<div className="ms-Grid-col ms-sm6 ms-md4 ms-lg3">
												<TextField name={`relations.${index}.type`} label="Relation Type" value={r.type} />
											</div>
										</div>
										<DefaultButton type="button" onClick={() => arrayHelpers.remove(index)}> - </DefaultButton>
										<DefaultButton type="button" onClick={() => arrayHelpers.insert(index, {name: "", type: ""})}> + </DefaultButton>
									</div>))
								) : ( 
									<DefaultButton type="button" onClick={() => arrayHelpers.push({name: "", type: ""})}>Add a relation</DefaultButton>
								)}
						</div>
				)} />

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
			relations: relations || [ { _id: '', name: "", type: ""} ]
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
})(CompanyCreateForm);

export { formikEnhancer as CompanyCreateForm };