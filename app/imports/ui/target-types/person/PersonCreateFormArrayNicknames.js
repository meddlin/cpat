import React from 'react';
import { Form, Field, FieldArray } from 'formik';
import { TextField, MaskedTextField, PrimaryButton, DefaultButton } from 'office-ui-fabric-react';

export const PersonCreateFormArrayNicknames = ({ move, swap, push, insert, remove, unshift, pop, form }) => (
	<Form>
		<br />
		<div className="ms-fontSize-16">Nicknames</div>

		{form.values.nickNames && form.values.nickNames.length > 0 ? (
			form.values.nickNames.map((r, index) => (
				<div key={index}>
					<div className="ms-Grid-row" dir="ltr">
						<div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
							<TextField 
								name={`nickNames.${index}`} 
								label={`Nickname ${index + 1}`}
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
			<DefaultButton type="button" onclick={() => push('')}>Add a Nickname</DefaultButton>
		)}
	</Form>
);