# Building Forms: Getting Started

We'll be using `formik` to build the actual forms and `yup` for data validation. Then we'll pull in Redux for actually submitting the form data and handling it in regards to the rest of the app.

formik docs: [https://jaredpalmer.com/formik/docs/overview](https://jaredpalmer.com/formik/docs/overview)

yup docs: [https://github.com/jquense/yup](https://github.com/jquense/yup)

## Install.

```bash
npm install --save formik yup
```

## Import Dependencies

We're following along from the previous `Table` example, so import those actions as well.

```js
import { withFormik, Form } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { store } from '../_helpers/store';
import { tableActions } from '../table/actions';
```

## Start by Creating the Component

Starting with a basic functional component.

```js
const DocForm = (props) => {

    return (
        <div>
        </div>
    );
};

export default DocForm;
```

### Pull in fomrik

Create the opening structure of the form, and add a couple buttons.

Formik is providing the `<Form>` component. It's a wrapper around the normal `<form>` HTML element. We're also pulling in quite a few props. These are [provided by the `withFormik()`](https://jaredpalmer.com/formik/docs/api/withFormik) higher-order component which we'll cover in just a bit.

All of these props aren't _always_ necessary, but we'll use most of them and including them here is a good demonstration of how much boilerplate utility formik is providing.

```js
const DocForm = (props) => {
    const {
        values,
        touched,
        errors,
        dirty,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset,
        isSubmitting,
    } = props;

    return (
        <div>
            <Form>

            </Form>

            <button type="submit">Create</button>
            <button onClick={handleReset}>Cancel</button>
        </div>
    );
};

export default DocForm;
```

### Use the `withFormik()` higher-order component

> _NOTE: For more on higher-order components: [https://reactjs.org/docs/higher-order-components.html](https://reactjs.org/docs/higher-order-components.html)_

Here we have three main options of formik we're concerned about:

- `mapPropsToValues()`: [https://jaredpalmer.com/formik/docs/api/withFormik#mappropstovalues-props-props--values](https://jaredpalmer.com/formik/docs/api/withFormik#mappropstovalues-props-props--values)
- `validationSchema`: [https://jaredpalmer.com/formik/docs/api/withFormik#validationschema-schema--props-props--schema](https://jaredpalmer.com/formik/docs/api/withFormik#validationschema-schema--props-props--schema)
- `handleSubmit`: [https://jaredpalmer.com/formik/docs/api/withFormik#handlesubmit-values-values-formikbag-formikbag--void--promiseany](https://jaredpalmer.com/formik/docs/api/withFormik#handlesubmit-values-values-formikbag-formikbag--void--promiseany)

`mapPropsToValues` moves the values of the elements of our form into the `values` property of formik, so we can use them.

`validationSchema` allows us tie formik and yup together. Check out yup's [validation API](https://github.com/jquense/yup#yup) for what's possible.

`handleSubmit` does exactly what it sounds like. This is the method that runs when we finally click that "submit" button. _Notice the commented action trigger._ After transforming the formik `values` into the proper document structure, this is where we can send that document with the action along to Redux.

```js
const formikEnhancer = withFormik({
    mapPropsToValues: ({ name }) => {
        return {
            name: name || ''
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required('Name is required')
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        let userDocument = {
            name: values.name || ''
        };

        // store.dispatch(tableActions.createUser(userDocument));
        setSubmitting(false);
    }
})(DocForm);
```

### formik and Redux tie-in

After we've created the HoC, `formikEnhancer` with a call to `withFormik()` we now have a nice formik object to handle our form, but we need to connect it all to Redux.

We still have our `mapStateToProps()` for Redux as normal, although we aren't doing much with it yet.

We also have the same pattern of using currying with Redux's `connect()`; except this time we're passing it `formikEnhancer`.

```js
function mapStateToProps(state) {
    const { table } = state;
    return { };
}

const DocFormConnection = connect(mapStateToProps)(formikEnhancer);
export { DocFormConnection as DocForm };
```

Keep in mind we used currying to pass `DocForm` to `withFormik()` and create a new component with _contains_ `DocForm`. So, at this point when we `connect()` to Redux, we have that same pattern _only an extra layer deep_. Which is why we can pass along `formikEnhancer` and still export this component as an alias of `DocForm`.

## Finished Basic Form

Only a single field is included on this form for simplicity. However, to add more fields we only need to add more `<input>` and `<label>` elements, and to map those inside of our `withFormik()` handler.

```js
const FormStyle = styled.div`
    display: flex;
    flex-direction: column;
`;

const DocForm = (props) => {
    const {
        values,
        touched,
        errors,
        dirty,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset,
        isSubmitting,
    } = props;
    let history = useHistory();

    useEffect(() => {
        console.log('DocForm loaded');
    }, []);

    return (
        <FormStyle>
            <Form>
                <label>Name</label>
                <input 
                    name="name"
                    label="Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                />
                {(touched.name && errors.name) ? <div>{errors.name}</div> : ""}
            </Form>

            <button type="submit">Create</button>
            <button onClick={handleReset}>Cancel</button>

            <button onClick={() => history.goBack()}>Back to Table</button>
        </FormStyle>
    );
};

const formikEnhancer = withFormik({
    enableReinitialize: true,
    mapPropsToValues: ({ name }) => {
        return {
            name: name || ''
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required('Name is required')
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        let userDocument = {
            name: values.name || ''
        };

        // store.dispatch(tableActions.createUser(userDocument));
        setSubmitting(false);
    }
})(DocForm);

function mapStateToProps(state) {
    const { table } = state;
    return { };
}

const DocFormConnection = connect(mapStateToProps)(formikEnhancer);
export { DocFormConnection as DocForm };
```