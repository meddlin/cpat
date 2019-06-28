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
				<div className="ms-fontSize-18">Create a company</div>

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
										<div className="ms-Grid-row" dir="ltr">
											<div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
												<TextField 
													name={`relations.${index}.collectionName`} 
													label="Relation Collection Name" 
													value={r.collectionName} />
											</div>
											<div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
												<TextField 
													name={`relations.${index}.collectionId`} 
													label="Relation Collection Id" 
													value={r.collectionId} />
											</div>
											<div className="ms-Grid-col ms-sm-2 ms-md4 ms-lg-2" style={{'marginTop': '1.8em'}}>
												<DefaultButton 
													type="button" 
													onClick={() => arrayHelpers.remove(index)}> - </DefaultButton>
												<DefaultButton 
													type="button" 
													onClick={() => arrayHelpers.insert(index, {collectionName: "", collectionId: ""})}> + </DefaultButton>
											</div>
										</div>
									</div>))
								) : ( 
									<DefaultButton 
										type="button" 
										onClick={() => arrayHelpers.push({name: "", type: ""})}>Add a relation</DefaultButton>
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
			relations: relations || [ { collectionName: "", collectionId: ""} ]
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