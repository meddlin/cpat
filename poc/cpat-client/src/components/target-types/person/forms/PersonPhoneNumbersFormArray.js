import React from 'react';
import { withFormik, Form, FieldArray } from 'formik';
import { Button, TextInput, Heading } from 'evergreen-ui';
import styled from 'styled-components';

export const PersonPhoneNumbersFormArray = ({ move, swap, push, insert, remove, unshift, pop, form })  => (
    <Form>
        <div>Phone Numbers</div>

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