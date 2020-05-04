import React from 'react';
import { withFormik, Form, FieldArray } from 'formik';
import { Button, TextInput, Heading } from 'evergreen-ui';
import styled from 'styled-components';

export const PersonNicknamesFormArray = ({ move, swap, push, insert, remove, unshift, pop, form })  => (
    <Form>
        <div>Nicknames</div>

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