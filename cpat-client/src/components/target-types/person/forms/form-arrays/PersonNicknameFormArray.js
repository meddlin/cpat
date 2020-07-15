import React from 'react';
import { withFormik, Form, FieldArray } from 'formik';
import { Button, TextInput, Heading } from 'evergreen-ui';
import { validations } from '../../../../../data/form-helpers/formArray-property-validation';
import styled from 'styled-components';

export const PersonNicknamesFormArray = ({ move, swap, push, insert, remove, unshift, pop, form })  => (
    <Form>
        <div>Nicknames</div>

		{/**
		 * Inserts the initial values to the beginning of the array
		 * - Check initial values is an Array
		 * - Check form values is an Array
		 * - **Only perform this 'unshift()' operation if the initial.values is "longer" than the form.values**
		 * 		-- NOTE: Formik will re-render the form a few times. This piece is key to NOT having multiple duplicates of intial.values left in the form!
		 */}
		{/* {Array.isArray(form.initialValues.nickNames) && Array.isArray(form.values.nickNames) && (form.initialValues.nickNames.length > form.values.nickNames.length) ? (
			form.initialValues.nickNames.map(init => (
				form.values.nickNames.unshift(init)
			))
		) : ''} */}
		{validations.emptyFormValues(form.initialValues.nickNames, form.values.nickNames) || 
			validations.initialLongerThanValues(form.initialValues.nickNames, form.values.nickNames) ? (
						form.initialValues.nickNames.map((init, idx) => (
							form.values.nickNames.unshift(init)
						))
		) : ''}

        {form.values.nickNames && form.values.nickNames.length > 0 ? (
            form.values.nickNames.map((r, index) => (
                <div key={index}>
                    <div>
						<div>
                            <label>Name</label>
							<TextInput 
								name={`nickNames.${index}.name`} 
								label="Name"
								onChange={form.handleChange}
								value={r.name} />
						</div>
						<div>
                            <label>Meta info</label>
							<TextInput 
								name={`nickNames.${index}.metaInfo`} 
								label="Meta info"
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
            <Button type="button" onClick={() => push({name: "", metaInfo: ""})}>Add a Nickname</Button>
        )}
    </Form>
);