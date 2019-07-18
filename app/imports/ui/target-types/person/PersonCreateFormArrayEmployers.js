import React from 'react';
import { Form, Field, FieldArray } from 'formik';
import { TextField, MaskedTextField, PrimaryButton, DefaultButton } from 'office-ui-fabric-react';

export const PersonCreateFormArrayEmployers = ({ move, swap, push, insert, remove, unshift, pop, form }) => (
	<Form>
		<br />
		<div className="ms-fontSize-16">Employers</div>

		{form.values.employers && form.values.employers.length > 0 ? (
			form.values.employers.map((r, index) => (
				<div key={index}>
					<div className="ms-Grid-row" dir="ltr">
						<div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
							<TextField 
								name={`employers.${index}`} 
								label={`Employer ${index + 1}`}
								onChange={form.handleChange}
								value={r} />
						</div>
						<div className="ms-Grid-col ms-sm-2 ms-md4 ms-lg-2" style={{'marginTop': '1.8em'}}>
							<DefaultButton 
								type="button" 
								onClick={() => remove(index)}> - </DefaultButton>
							<DefaultButton 
								type="button" 
								onClick={() => insert((index + 1), '')}> + </DefaultButton>
						</div>
					</div>
				</div>
			))
			) : (
			<DefaultButton type="button" onclick={() => push('')}>Add an Employer</DefaultButton>
		)}
	</Form>
);