import React, { Component } from 'react';
import { withFormik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import { TextField, PrimaryButton } from 'office-ui-fabric-react';

// import { ScriptsTable } from '../ScriptsTable';

class ScriptsCreateForm extends Component {
    render() {
        const {
			values,
			touched,
			errors,
			dirty,
			handleChange,
			handleBlur,
			handleSubmit,
			handleReset,
			isSubmitting
        } = this.props;
        
        return (
            <div>
                <Form>
                    <div className="ms-fontSize-18">Create a script</div>

                    <TextField
                        name="name"
						label="Name"
						type="text"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.name} />
                    {(touched.name && errors.name) ? <div>{errors.name}</div> : ""}

                    <TextField
                        name="tool"
						label="Tool"
						type="text"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.tool} />
                    {(touched.tool && errors.tool) ? <div>{errors.tool}</div> : ""}

                    <TextField
                        name="toolCommand"
						label="Tool Command"
						type="text"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.toolCommand} />
                    {(touched.toolCommand && errors.toolCommand) ? <div>{errors.toolCommand}</div> : ""}

                    <TextField
                        name="language"
						label="Language"
						type="text"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.language} />
                    {(touched.language && errors.language) ? <div>{errors.language}</div> : ""}

                    <PrimaryButton type="submit" text="Submit" />
                </Form>
                {/* <ScriptsTable /> */}
            </div>
        );
    }
};

const formikEnhancer = withFormik({
	mapPropsToValues({ name, relations }) {
		return {
			name: name || '',
			relations: relations || [{}]
		}
	},
	validationSchema: Yup.object().shape({
		name: Yup.string().required("Name is required.")
	}),
	handleSubmit: (values, { props, setSubmitting }) => {
		const { name, relations } = values;
		const { insertDocFunc } = props.meteorSubd;

		// kick-off server-side methods to store in DB, here
		console.log(`Submit on Scripts Create form. Name: ${name}`);
		insertDocFunc({ name, relations });

		setSubmitting(false);
	}
})(ScriptsCreateForm);

export { formikEnhancer as ScriptsCreateForm };