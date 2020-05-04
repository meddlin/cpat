import React from 'react';
import { withFormik, Form, FieldArray } from 'formik';
import { Button, TextInput, Heading } from 'evergreen-ui';
import styled from 'styled-components';

export const PersonOrganizationsFormArray = ({ move, swap, push, insert, remove, unshift, pop, form })  => (
    <Form>
        <div>Organizations</div>

        {form.values.organizations && form.values.organizations.length > 0 ? (
            form.values.organizations.map((r, index) => (
                <div key={index}>
                    <div>
						<div>
                            <label>Name</label>
							<TextInput 
								name={`organizations.${index}.name`} 
								label="Name"
								onChange={form.handleChange}
								value={r.name} />
						</div>
                        <div>
                            <label>Meta Info</label>
							<TextInput 
								name={`organizations.${index}.metaInfo`} 
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
            <Button type="button" onClick={() => push({name: "", metaInfo: ""})}>Add an Organization</Button>
        )}
    </Form>
);