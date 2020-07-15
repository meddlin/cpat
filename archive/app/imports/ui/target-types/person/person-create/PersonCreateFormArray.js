import React from 'react';
import { Form } from 'formik';
import { TextField, DefaultButton } from 'office-ui-fabric-react';

export const PersonCreateFormArray = ({ move, swap, push, insert, remove, unshift, pop, form }) => (
	<Form>
		<br />
		<div className="ms-fontSize-16">Relations</div>

		{form.values.relations && form.values.relations.length > 0 ? (
			form.values.relations.map((r, index) => (
				<div key={index}>
					<div className="ms-Grid-row" dir="ltr">
						<div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
							<TextField 
								name={`relations.${index}.collectionName`} 
								label="Relation Collection Name"
								onChange={form.handleChange}
								value={r.collectionName} />
						</div>
						<div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
							<TextField 
								name={`relations.${index}.collectionId`} 
								label="Relation Collection Id"
								onChange={form.handleChange}
								value={r.collectionId} />
						</div>
						<div className="ms-Grid-col ms-sm-2 ms-md4 ms-lg-2" style={{'marginTop': '1.8em'}}>
							<DefaultButton 
								type="button" 
								onClick={() => remove(index)}> - </DefaultButton>
							<DefaultButton 
								type="button" 
								onClick={() => insert((index + 1), {collectionName: "", collectionId: ""})}> + </DefaultButton>
						</div>
					</div>
				</div>
			))
			) : (
			<DefaultButton type="button" onclick={() => push({collectionName: '', collectionId: ''})}>Add a Relation</DefaultButton>
		)}
	</Form>
);