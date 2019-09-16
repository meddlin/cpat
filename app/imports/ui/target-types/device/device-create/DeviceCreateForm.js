import React, { Component } from 'react';
import { withFormik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import { TextField, MaskedTextField, PrimaryButton, DefaultButton } from 'office-ui-fabric-react';
import { DeviceCreateFormArray } from './DeviceCreateFormArray';
import { DeviceTable } from '../DeviceTable';

class DeviceCreateForm extends Component {
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

					<FieldArray name="relations" component={DeviceCreateFormArray} />

					<PrimaryButton
						type="submit"
						text="Submit" />

				</Form>

				<DeviceTable />
			</div>

		);
	}
};

const formikEnhancer = withFormik({
	mapPropsToValues({ name, organizations, relations }) {
		return {
			name: name || '',
			organizations: organizations || [''],
			relations: relations || [ { } ]
		}
	},
	validationSchema: Yup.object().shape({
		name: Yup.string().required("Name is required.")
	}),
	handleSubmit: (values, { props, setSubmitting }) => {
		const { name, organizations, relations } = values;
		const { insertDocFunc } = props.meteorSubd;

		if (name) {
			// kick-off server-side methods to store in DB, here
			console.log(`Submit on Company Create form. Name: ${name}`);
			insertDocFunc({ name, organizations, relations });
		}

		setSubmitting(false);
	}
})(DeviceCreateForm);

export { formikEnhancer as DeviceCreateForm };