import React from 'react';
import { withFormik, Form, FieldArray } from 'formik';
import { Button, TextInput, Heading } from 'evergreen-ui';
import styled from 'styled-components';
// import { v4 as uuidv4 } from 'uuid';

export const PersonDocumentRelationsFormArray = ({ move, swap, push, insert, remove, unshift, pop, form }) => (
    <Form>
        <div className="ms-fontSize-16">Relations</div>

		{/**
		 * Inserts the initial values to the beginning of the array
		 * - Check initial values is an Array
		 * - Check form values is an Array
		 * - **Only perform this 'unshift()' operation if the initial.values is "longer" than the form.values**
		 * 		-- NOTE: Formik will re-render the form a few times. This piece is key to NOT having multiple duplicates of intial.values left in the form!
		 */}
		{Array.isArray(form.initialValues.relations) && Array.isArray(form.values.relations) && (form.initialValues.relations.length > form.values.relations.length) ? (
			form.initialValues.relations.map(init => (
				form.values.relations.unshift(init)
			))
		) : ''}

        {form.values.relations && form.values.relations.length > 0 ? (
            form.values.relations.map((r, index) => (
                <div key={index}>
                    <div>
						<div>
                            <label>Relation Collection Name</label>
							<TextInput 
								name={`relations.${index}.collectionName`} 
								label="Relation Collection Name"
								onChange={form.handleChange}
								value={r.collectionName} />
						</div>
						<div>
                            <label>Relation Document Id</label>
							<TextInput 
								name={`relations.${index}.documentId`} 
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