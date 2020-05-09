# Building Forms: Nested Arrays

This document will focus on building forms with `formik` where the data requires a nested array. _It's trickier than it sounds._

formik docs: [https://jaredpalmer.com/formik/docs/overview](https://jaredpalmer.com/formik/docs/overview)

formik, Field Array doc: [https://jaredpalmer.com/formik/docs/api/fieldarray#fieldarray-helpers](https://jaredpalmer.com/formik/docs/api/fieldarray#fieldarray-helpers)


## Model w/ Nested Array of Objects

The model we're trying to handle is relatively simple to reason about. For example:

```js
var person = {

    firstName: 'Jane',
    lastName: 'Doe',
    age: 32,

    phoneNumbers: [
        {
            type: 'Cell', number: '555-555-1234'
        },
        {
            type: 'Work', number: '555-555-4567'
        }
    ]
}
```

## Starting Point: A Form w/ Basic Input

Our form would start off following pretty closely what the `formik` docs cover pretty well. We'll be using the `formikEnhancer` HOC implementation. So, it looks a little wordy, but it's a bit more organized than writing all of this from scratch.

_NOTE: Keep in mind we're using "update" in the name of this form. **That is key to the issue we'll cover later on.**_

```jsx
const PersonUpdate = (props) => {
    const { values, touched, errors, handleChange, handleBlur, handleReset } = props;

    return (
        <Form>
            <label>First Name</label>
            <TextInput 
                name="firstName"
                label="First Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
            />
            {(touched.firstName && errors.firstName) ? <div>{errors.firstName}</div> : ""}

            <div style={{ display: 'flex' }}>
                <Button type="submit">Create</Button>
                <Button onClick={handleReset}>Cancel</Button>
            </div>
        </Form>
    );
};

const formikEnhancer = withFormik({
    mapPropsToValues: ({ 
        firstName,

        person
    }) => {
        return {
            firstName: name || person.firstName,
            
            phoneNumbers: (Array.isArray(phoneNumbers) && phoneNumbers.length > 0) || person.phoneNumbers
        }
    },
    validationSchema: Yup.object().shape({
        firstName: Yup.string().required('First Name is required')
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        let newPerson = new Person(); // 
        newTarget.firstName = values.firstName;
        newTarget.phoneNumbers = values.phoneNumbers;

        // Using redux to submit data
        props.dispatch(personActions.partialUpdateTarget(props.person.id, newPerson.apiObject()));
        setSubmitting(false);
    }
})(PersonUpdate);
```

Now, there's a bit going on above, but it's all explained pretty well by the `formik` docs. I just wanted to give us a solid starting point-_quite a bit has been accomplished for our form so far._

## Using `FieldArray` on a Form

Not too bad. It looks like this...

```jsx
<FieldArray name="phoneNumbers" component={PersonPhoneNumberFormArray} />
```

...and we just shove it in our form where we want it.

```jsx
<Form>
    <label>First Name</label>
    <TextInput 
        name="firstName"
        label="First Name"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.firstName}
    />
    {(touched.firstName && errors.firstName) ? <div>{errors.firstName}</div> : ""}

    <FieldArray name="phoneNumbers" component={PersonPhoneNumberFormArray} />

    {/* removed for brevity */}
</Form>
```

## Creating our `FieldArray` component

Now with `FieldArray` referencing the property in our original model, we've passed it a new component used to render that array of nested objects. So, let's create that.

```jsx
export const PersonPhoneNumberFormArray = ({ move, swap, push, insert, remove, unshift, pop, form }) => (
    <Form>
        {form.values.phoneNumbers && form.values.phoneNumbers.length > 0 ? (
            form.values.phoneNumbers.map((p, index) => (
                <div key={index}>
                    <div>
						<div>
                            <label>Phone #, Type</label>
							<TextInput 
								name={`phoneNumbers.${index}.type`} 
								label="Type"
								onChange={form.handleChange}
								value={p.type} />
						</div>
						<div>
                            <label>Phone #, Number</label>
							<TextInput 
								name={`phoneNumbers.${index}.number`} 
								label="Number"
								onChange={form.handleChange}
                                value={p.number} />
						</div>
						<div>
							<Button 
								type="button" 
								onClick={() => remove(index)}> - </Button>
							<Button 
								type="button" 
								onClick={() => insert((index + 1), {type: '', number: ''})}> + </Button>
						</div>
					</div>
                </div>
            ))
        ) : (
            <Button type="button" onClick={() => push({type: '', number: ''})}>Add a Relation</Button>
        )}
    </Form>
);
```

We've created a special component to render _only the objects of the array_. This is where the `formik` docs start breaking down.

### arrayHelpers

Referenced [here](https://jaredpalmer.com/formik/docs/api/fieldarray#fieldarray-helpers) in the docs, but only _kind of_ shown [in action here](https://jaredpalmer.com/formik/docs/api/fieldarray#fieldarray-array-of-objects). All of the deconstructed props at the top of `PersonPhoneNumberFormArray` are pulled out of this `arrayHelpers` prop.

Ref: [https://jaredpalmer.com/formik/docs/api/fieldarray#fieldarray-helpers](https://jaredpalmer.com/formik/docs/api/fieldarray#fieldarray-helpers)

Ref: [https://jaredpalmer.com/formik/docs/api/fieldarray#fieldarray-array-of-objects](https://jaredpalmer.com/formik/docs/api/fieldarray#fieldarray-array-of-objects)

### Hidden Detail

The detail hidden in plain sight here is _we're iterating over `form.values` to create the form, but these aren't the initial values passed to our `PersonPhoneNumberFormArray` component.

**_Remember that little detail about this being an "update" form? Here it comes._**

If we're only trying to fill out the form to create a new "Person" object, until now everything we've covered will work perfectly. HOWEVER, this is to _UPDATE_ a pre-existing object so we have pre-existing data to provide to the form. This is done by-way of `form.initialValues`.

## An "Update" form: Handling initial values

I can't say much for how `formik` is handling data in the forms. Everything is available, and we're able to build out a fairly complex form with little issue _once you learn where `formik` puts things._ These next points just aren't made explicit in the docs.

- `form.values` is a completely different array from `form.initialValues`.
- `form.values` and `form.initialValues` _**will not**_ be merged unless you do so.
- While using a component to render our array form, `form.initialValues` is provided from `mapPropsToValues` back in `formikEnhancer()` in the parent form/component.

### Problem

_We need to introduce `form.initialValues` into `form.values`. We are responsible for it._

Ideally, we need to merge the two arrays at before we iterate over `form.values` to create the form elements. Sounds like some deep comparisons and merging two arrays--annoying, but manageable.

However, this `PersonPhoneNumberFormArray` component re-renders every time the values change. On top of this, `form.values` isn't refreshed on each re-render. And `form.values` shouldn't be emptied! This re-render (or re-compute to be precise), is checking field validation; we don't want `form.values` flushed until we submit the form.

So...if we aren't careful we can continue to merge `form.initialValues` into `form.values` upon each computation--producing lots of duplicates.

### Solution

We need to merge the two arrays, but _only do so when `form.initialValues` has more data than `form.values`._ 

This prevents duplicates from entering our array's form elements, _**AND**_ allows us to make use of the initial values supplied to our parent form.

I realize this isn't a perfect condition to check, but I couldn't find a situation where `form.values` would have more data than `form.initialValues`, as long as `initialValues` was merged on the first computation.

So, our "merge check" looks like this.

```js
{
    Array.isArray(form.initialValues.phoneNumbers) && 
        Array.isArray(form.values.phoneNumbers) && 
            (form.initialValues.phoneNumbers.length > form.values.phoneNumbers.length) ? 
                (
                    form.initialValues.phoneNumbers.map((init, idx) => (
                        form.values.phoneNumbers.unshift(init)
                    ))
                ) : 
''}
```

And now, the full form array component looks like this.

```jsx
export const PersonPhoneNumberFormArray = ({ move, swap, push, insert, remove, unshift, pop, form }) => (
    <Form>
        {/**
		 * Inserts the initial values to the beginning of the array
		 * - Check initial values is an Array
		 * - Check form values is an Array
		 * - **Only perform this 'unshift()' operation if the initial.values is "longer" than the form.values**
		 * 		-- NOTE: Formik will re-render the form a few times. This piece is key to NOT having multiple duplicates of intial.values left in the form!
		 */}
		{Array.isArray(form.initialValues.phoneNumbers) && Array.isArray(form.values.phoneNumbers) && (form.initialValues.phoneNumbers.length > form.values.phoneNumbers.length) ? (
			form.initialValues.phoneNumbers.map((init, idx) => (
				form.values.phoneNumbers.unshift(init)
			))
		) : ''}

        {form.values.phoneNumbers && form.values.phoneNumbers.length > 0 ? (
            form.values.phoneNumbers.map((p, index) => (
                <div key={index}>
                    <div>
						<div>
                            <label>Phone #, Type</label>
							<TextInput 
								name={`phoneNumbers.${index}.type`} 
								label="Type"
								onChange={form.handleChange}
								value={p.type} />
						</div>
						<div>
                            <label>Phone #, Number</label>
							<TextInput 
								name={`phoneNumbers.${index}.number`} 
								label="Number"
								onChange={form.handleChange}
                                value={p.number} />
						</div>
						<div>
							<Button 
								type="button" 
								onClick={() => remove(index)}> - </Button>
							<Button 
								type="button" 
								onClick={() => insert((index + 1), {type: '', number: ''})}> + </Button>
						</div>
					</div>
                </div>
            ))
        ) : (
            <Button type="button" onClick={() => push({type: '', number: ''})}>Add a Relation</Button>
        )}
    </Form>
);
```