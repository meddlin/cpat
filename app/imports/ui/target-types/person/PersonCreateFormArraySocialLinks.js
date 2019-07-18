import React from 'react';
import { Form, Field, FieldArray } from 'formik';
import { TextField, MaskedTextField, PrimaryButton, DefaultButton } from 'office-ui-fabric-react';

export const PersonCreateFormArraySocialLinks = ({ move, swap, push, insert, unshift, pop, form }) => (
	<Form>
		<br />
		<div className="ms-fontSize-16">Social Links</div>

		{form.values.socialLinks && form.values.socialLinks.length > 0 ? (
			form.values.socialLinks.map((r, index) => (
				<div key={index}>
					<div className="ms-Grid-row" dir="ltr">
						<div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
							<TextField 
								name={`socialLinks.${index}.site`} 
								label="Social Link Site"
								onChange={form.handleChange}
								value={r.site} />
						</div>
						<div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
							<TextField 
								name={`socialLinks.${index}.url`} 
								label="Social Link URL"
								onChange={form.handleChange}
								value={r.url} />
						</div>
						<div className="ms-Grid-col ms-sm-2 ms-md4 ms-lg-2" style={{'marginTop': '1.8em'}}>
							<DefaultButton 
								type="button" 
								onClick={() => remove(index)}> - </DefaultButton>
							<DefaultButton 
								type="button" 
								onClick={() => insert((index + 1), {site: "", url: ""})}> + </DefaultButton>
						</div>
					</div>
				</div>
			))
			) : (
			<DefaultButton type="button" onclick={() => push({site: '', url: ''})}>Add a Link</DefaultButton>
		)}
	</Form>
);