import React from 'react';
import { withFormik, Form, FieldArray } from 'formik';
import { Button, TextInput, Heading } from 'evergreen-ui';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

export const TargetCreateFormArray = ({ move, swap, push, insert, remove, unshift, pop, form }) => (
    <Form>
        <div className="ms-fontSize-16">Relations</div>

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
                                value={uuidv4()} />
                                {/* value={r.documentId} /> */}
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