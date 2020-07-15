import React from 'react';
import { withFormik, Form } from 'formik';
import { Button, TextInput, Heading } from 'evergreen-ui';
import styled from 'styled-components';
import { validations } from '../../../../../data/form-helpers/formArray-property-validation';
// import { v4 as uuidv4 } from 'uuid';

export const DeviceOrganizationsFormArray = ({ move, swap, push, insert, remove, unshift, pop, form }) => (
	<Form>
        <div className="ms-fontSize-16">Organizations</div>

		{/**
		 * Inserts the initial values to the beginning of the array
		 * - Check initial values is an Array
		 * - Check form values is an Array
		 * - **Only perform this 'unshift()' operation if the initial.values is "longer" than the form.values**
		 * 		-- NOTE: Formik will re-render the form a few times. This piece is key to NOT having multiple duplicates of intial.values left in the form!
		 */}
		{validations.emptyFormValues(form.initialValues.organizations, form.values.organizations) || 
			validations.initialLongerThanValues(form.initialValues.organizations, form.values.organizations) ? (
						form.initialValues.organizations.map((init, idx) => (
							form.values.organizations.unshift(init)
						))
		) : ''}

        {form.values.organizations && form.values.organizations.length > 0 ? (
            form.values.organizations.map((r, index) => (
                <div key={index}>
                    <div>
						<div>
                            <label>Organization Name</label>
							<TextInput 
								name={`organizations.${index}.name`} 
								label="Organization Name"
								onChange={form.handleChange}
								value={r.name} />
						</div>
						<div>
                            <label>Organization MetaInfo</label>
							<TextInput 
								name={`organizations.${index}.metaInfo`} 
								label="Organization Metainfo"
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
            <Button type="button" onClick={() => push({name: '', metaInfo: ''})}>Add an Organization</Button>
        )}
    </Form>
);