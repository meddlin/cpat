import React from 'react';
import { Form } from 'formik';
import { TextField, DefaultButton } from 'office-ui-fabric-react';

export const PersonCreateFormArrayEmailAddresses = ({ move, swap, push, insert, remove, unshift, pop, form }) => (
	<Form>
		<br />
		<div className="ms-fontSize-16">Email Addresses</div>

		{form.values.emailAddresses && form.values.emailAddresses.length > 0 ? (
			form.values.emailAddresses.map((r, index) => (
				<div key={index}>
					<div className="ms-Grid-row" dir="ltr">
						<div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
							<TextField 
								name={`emailAddresses.${index}`} 
								label={`Email Address ${index + 1}`}
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
			<DefaultButton type="button" onclick={() => push('')}>Add an Email Address</DefaultButton>
		)}
	</Form>
);