import React from 'react';
import { withFormik, Form, FieldArray } from 'formik';
import { Button, TextInput, Heading } from 'evergreen-ui';
import styled from 'styled-components';

export const PersonEmailAddressesFormArray = ({ move, swap, push, insert, remove, unshift, pop, form })  => (
    <Form>
        <div>Email Addresses</div>

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