import React from 'react';
import { withFormik, Form, FieldArray } from 'formik';
import { Button, TextInput, Heading } from 'evergreen-ui';
import styled from 'styled-components';

export const PersonEmployersFormArray = ({ move, swap, push, insert, remove, unshift, pop, form })  => (
    <Form>
        <div>Employers</div>

		{/**
		 * Inserts the initial values to the beginning of the array
		 * - Check initial values is an Array
		 * - Check form values is an Array
		 * - **Only perform this 'unshift()' operation if the initial.values is "longer" than the form.values**
		 * 		-- NOTE: Formik will re-render the form a few times. This piece is key to NOT having multiple duplicates of intial.values left in the form!
		 */}
		{Array.isArray(form.initialValues.employers) && Array.isArray(form.values.employers) && (form.initialValues.employers.length > form.values.employers.length) ? (
			form.initialValues.employers.map(init => (
				form.values.employers.unshift(init)
			))
		) : ''}

        {form.values.employers && form.values.employers.length > 0 ? (
            form.values.employers.map((r, index) => (
                <div key={index}>
                    <div>
                        <div>
                            <label>Name</label>
							<TextInput 
								name={`employers.${index}.name`} 
								label="Name"
								onChange={form.handleChange}
								value={r.name} />
						</div>
                        <div>
                            <label>Meta Info</label>
							<TextInput 
								name={`employers.${index}.metaInfo`} 
								label="Meta Info"
								onChange={form.handleChange}
								value={r.metaInfo} />
						</div>
						<div>
							<Button 
								type="button" 
								onClick={() => remove(index)}> - </Button>
							<Button 
								type="button" 
								onClick={() => insert((index + 1), {name: "", metaInfo: ""})}> + </Button>
						</div>
					</div>
                </div>
            ))
        ) : (
            <Button type="button" onClick={() => push({name: "", metaInfo: ""})}>Add an Employer</Button>
        )}
    </Form>
);