import React from 'react';
import { withFormik, Form, FieldArray } from 'formik';
import { Button, TextInput, Heading } from 'evergreen-ui';
import styled from 'styled-components';

export const PersonSocialLinksFormArray = ({ move, swap, push, insert, remove, unshift, pop, form })  => (
    <Form>
        <div>Social Links</div>

		{/**
		 * Inserts the initial values to the beginning of the array
		 * - Check initial values is an Array
		 * - Check form values is an Array
		 * - **Only perform this 'unshift()' operation if the initial.values is "longer" than the form.values**
		 * 		-- NOTE: Formik will re-render the form a few times. This piece is key to NOT having multiple duplicates of intial.values left in the form!
		 */}
		{Array.isArray(form.initialValues.socialLinks) && Array.isArray(form.values.socialLinks) && (form.initialValues.socialLinks.length > form.values.socialLinks.length) ? (
			form.initialValues.socialLinks.map(init => (
				form.values.socialLinks.unshift(init)
			))
		) : ''}

        {form.values.socialLinks && form.values.socialLinks.length > 0 ? (
            form.values.socialLinks.map((r, index) => (
                <div key={index}>
                    <div>
						<div>
                            <label>Site</label>
							<TextInput 
								name={`socialLinks.${index}.site`} 
								label="Site"
								onChange={form.handleChange}
								value={r.site} />
						</div>
                        <div>
                            <label>URL</label>
							<TextInput 
								name={`socialLinks.${index}.url`} 
								label="URL"
								onChange={form.handleChange}
								value={r.url} />
						</div>
						<div>
							<Button 
								type="button" 
								onClick={() => remove(index)}> - </Button>
							<Button 
								type="button" 
								onClick={() => insert((index + 1), {site: "", url: ""})}> + </Button>
						</div>
					</div>
                </div>
            ))
        ) : (
            <Button type="button" onClick={() => push({site: "", url: ""})}>Add a Social Link</Button>
        )}
    </Form>
);