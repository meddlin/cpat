import React from 'react';
import { withFormik, Form, FieldArray } from 'formik';
import { Button, TextInput, Heading } from 'evergreen-ui';
import { validations } from '../../../../../data/form-helpers/formArray-property-validation';
import styled from 'styled-components';

export const PersonPhoneNumbersFormArray = ({ move, swap, push, insert, remove, unshift, pop, form })  => (
    <Form>
        <div>Phone Numbers</div>

		{/**
		 * Inserts the initial values to the beginning of the array
		 * - Check initial values is an Array
		 * - Check form values is an Array
		 * - **Only perform this 'unshift()' operation if the initial.values is "longer" than the form.values**
		 * 		-- NOTE: Formik will re-render the form a few times. This piece is key to NOT having multiple duplicates of intial.values left in the form!
		 */}
		{/* {Array.isArray(form.initialValues.phoneNumbers) && Array.isArray(form.values.phoneNumbers) && (form.initialValues.phoneNumbers.length > form.values.phoneNumbers.length) ? (
			form.initialValues.phoneNumbers.map(init => (
				form.values.phoneNumbers.unshift(init)
			))
		) : ''} */}
		{validations.emptyFormValues(form.initialValues.phoneNumbers, form.values.phoneNumbers) || 
			validations.initialLongerThanValues(form.initialValues.phoneNumbers, form.values.phoneNumbers) ? (
						form.initialValues.phoneNumbers.map((init, idx) => (
							form.values.phoneNumbers.unshift(init)
						))
		) : ''}

        {form.values.phoneNumbers && form.values.phoneNumbers.length > 0 ? (
            form.values.phoneNumbers.map((r, index) => (
                <div key={index}>
                    <div>
						<div>
                            <label>Type</label>
							<TextInput 
								name={`phoneNumbers.${index}.type`} 
								label="Type"
								onChange={form.handleChange}
								value={r.type} />
						</div>
                        <div>
                            <label>Ph #</label>
							<TextInput 
								name={`phoneNumbers.${index}.number`} 
								label="Number"
								onChange={form.handleChange}
								value={r.number} />
						</div>
						<div>
							<Button 
								type="button" 
								onClick={() => remove(index)}> - </Button>
							<Button 
								type="button" 
								onClick={() => insert((index + 1), {type: "", number: ""})}> + </Button>
						</div>
					</div>
                </div>
            ))
        ) : (
            <Button type="button" onClick={() => push({type: "", number: ""})}>Add a Phone Number</Button>
        )}
    </Form>
);