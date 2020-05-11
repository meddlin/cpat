import React from 'react';
import { withFormik, Form, FieldArray } from 'formik';
import { Button, TextInput, Heading } from 'evergreen-ui';
import styled from 'styled-components';
import { validations } from '../../../../../data/form-helpers/formArray-property-validation';
// import { v4 as uuidv4 } from 'uuid';

export const TargetDocumentRelationFormArray = ({ move, swap, push, insert, remove, unshift, pop, form }) => (
    <Form>
        <div className="ms-fontSize-16">Relations</div>

		{/**
		 * Inserts the initial values to the beginning of the array
		 * - Check initial values is an Array
		 * - Check form values is an Array
		 * - **Only perform this 'unshift()' operation if the initial.values is "longer" than the form.values**
		 * 		-- NOTE: Formik will re-render the form a few times. This piece is key to NOT having multiple duplicates of intial.values left in the form!
		 */}
		{validations.emptyFormValues(form.initialValues.documentRelation, form.values.documentRelation) || 
			validations.initialLongerThanValues(form.initialValues.documentRelation, form.values.documentRelation) ? (
						form.initialValues.documentRelation.map((init, idx) => (
							form.values.documentRelation.unshift(init)
						))
		) : ''}

        {form.values.documentRelation && form.values.documentRelation.length > 0 ? (
            form.values.documentRelation.map((r, index) => (
                <div key={index}>
                    <div>
						<div>
                            <label>Relation Collection Name</label>
							<TextInput 
								name={`documentRelation.${index}.collectionName`} 
								label="Relation Collection Name"
								onChange={form.handleChange}
								value={r.collectionName} />
						</div>
						<div>
                            <label>Relation Document Id</label>
							<TextInput 
								name={`documentRelation.${index}.documentId`} 
								label="Relation Document Id"
								onChange={form.handleChange}
                                value={r.documentId} />
						</div>
						<div>
							<Button 
								type="button" 
								onClick={() => remove(index)}> - </Button>
							<Button 
								type="button" 
								onClick={() => insert((index + 1), {collectionName: "", documentId: ""})}> + </Button>
						</div>
					</div>
                </div>
            ))
        ) : (
            <Button type="button" onClick={() => push({collectionName: '', documentId: ''})}>Add a Relation</Button>
        )}
    </Form>
);