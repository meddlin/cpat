import React from 'react';
import { withFormik, Form, FieldArray } from 'formik';
import { Button, TextInput, Heading } from 'evergreen-ui';
import styled from 'styled-components';

export const PersonEmployersFormArray = ({ move, swap, push, insert, remove, unshift, pop, form })  => (
    <Form>
        <div>Employers</div>

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