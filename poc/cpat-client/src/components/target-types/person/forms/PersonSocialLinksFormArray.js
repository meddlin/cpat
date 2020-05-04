import React from 'react';
import { withFormik, Form, FieldArray } from 'formik';
import { Button, TextInput, Heading } from 'evergreen-ui';
import styled from 'styled-components';

export const PersonSocialLinksFormArray = ({ move, swap, push, insert, remove, unshift, pop, form })  => (
    <Form>
        <div>Social Links</div>

        {form.values.socialLinks && form.values.socialLinks.length > 0 ? (
            form.values.socialLinks.map((r, index) => (
                <div key={index}>
                    <div>
						<div>
                            <label>Site</label>
							<TextInput 
								name={`socialLinks.${index}.site`} 
								label="Site"
								onChange={form.handleChange}
								value={r.site} />
						</div>
                        <div>
                            <label>URL</label>
							<TextInput 
								name={`socialLinks.${index}.url`} 
								label="URL"
								onChange={form.handleChange}
								value={r.url} />
						</div>
						<div>
							<Button 
								type="button" 
								onClick={() => remove(index)}> - </Button>
							<Button 
								type="button" 
								onClick={() => insert((index + 1), {site: "", url: ""})}> + </Button>
						</div>
					</div>
                </div>
            ))
        ) : (
            <Button type="button" onClick={() => push({site: "", url: ""})}>Add a Social Link</Button>
        )}
    </Form>
);