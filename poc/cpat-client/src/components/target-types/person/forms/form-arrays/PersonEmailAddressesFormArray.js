import React from 'react';
import { withFormik, Form, FieldArray } from 'formik';
import { Button, TextInput, Heading } from 'evergreen-ui';
import styled from 'styled-components';

export const PersonEmailAddressesFormArray = ({ move, swap, push, insert, remove, unshift, pop, form })  => (
    <Form>
        <div>Email Addresses</div>

		{/**
		 * Inserts the initial values to the beginning of the array
		 * - Check initial values is an Array
		 * - Check form values is an Array
		 * - **Only perform this 'unshift()' operation if the initial.values is "longer" than the form.values**
		 * 		-- NOTE: Formik will re-render the form a few times. This piece is key to NOT having multiple duplicates of intial.values left in the form!
		 */}
		{Array.isArray(form.initialValues.emailAddresses) && Array.isArray(form.values.emailAddresses) && (form.initialValues.emailAddresses.length > form.values.emailAddresses.length) ? (
			form.initialValues.emailAddresses.map(init => (
				form.values.emailAddresses.unshift(init)
			))
		) : ''}

        {form.values.emailAddresses && form.values.emailAddresses.length > 0 ? (
            form.values.emailAddresses.map((r, index) => (
                <div key={index}>
                    <div>
						<div>
                            <label>Type</label>
							<TextInput 
								name={`emailAddresses.${index}.type`} 
								label="Type"
								onChange={form.handleChange}
								value={r.type} />
						</div>
                        <div>
                            <label>Email</label>
							<TextInput 
								name={`emailAddresses.${index}.address`} 
								label="Address"
								onChange={form.handleChange}
								value={r.address} />
						</div>
						<div>
							<Button 
								type="button" 
								onClick={() => remove(index)}> - </Button>
							<Button 
								type="button" 
								onClick={() => insert((index + 1), {type: "", address: ""})}> + </Button>
						</div>
					</div>
                </div>
            ))
        ) : (
            <Button type="button" onClick={() => push({type: "", address: ""})}>Add an Email Address</Button>
        )}
    </Form>
);