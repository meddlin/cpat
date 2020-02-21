## Establish Actions and Constants

*NOTE: This organization scheme stops just shy of setting up fully decoupled action creators. This is only a decision of coding and organization style--not functionality. See more about action creators here:* [https://redux.js.org/basics/actions/#action-creators](https://redux.js.org/basics/actions/#action-creators)

We'll start with a basic `Table` component. As of now this component only displays some self-contained mock data, and then displays it in a semi-tabled format.

Inside your `src` directory, create a new `components` directory. Then inside of the new directory create a new file, `Table.js` and copy/paste the following. We won't do anything with it for now, but we'll quickly come back to it.

*This is where we trigger the action to retrieve our data, and where that data will finally be displayed.*

__*src/components/Table.js*__

```js
import React from 'react';
import styled from 'styled-components';
/* import { tableActions } from '../table/actions'; */

const Row = styled.div`
    margin: 1em;
    span {
        margin: 0.25em;
    }
`;

const Table = () => {
    const dataItems = [
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' }
    ];

    return (
        <div>
            {(dataItems && dataItems.length !== 0) ? dataItems.map(item => {
                return (
                    <Row key={item.id}>
                        <span>id: {item.id}</span>
                        <span>{item.name}</span>
                    </Row>
                );
            }) : 'No items to display.'}
        </div>
    );
}

export default Table;
```

### Create a "domain space"

Now, we'll be following a [domain-driven design](https://medium.com/@hassan.djirdeh/domain-driven-react-redux-a474ecf7d126) for our redux code. So, let's create a new directory, `table`. Then create two new files:

- `actions.js`
- `constants.js`

So, now in total, we should have the following structure:

- `src/components/Table.js`
- `src/table/actions.js`
- `src/table/constants.js`
- ` /* ...we're almost done... */ `

### Write the first "action"

Below we have our first action defined for the `Table` component. Let's copy/paste this inside of our `table/actions.js`. It's quite a bit of code. So, let's get it in the editor, and then explain a little bit at a time.

*NOTE: Later on we'll return to this action to add some logging support.*

__*src/table/actions.js*__

```js
import { tableConstants } from './constants';

/* We haven't set this up yet. That's next! */
// import { tableService } from './services';

export const tableActions = {
    getInitialTable
};

function getInitialTable() {
    return dispatch => {
        dispatch(request());

        tableService.getPage(1)
            .then(
                result => {
                    dispatch(success());
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request() { return { type: tableConstants.GET_TABLE_REQUEST } }
    function success() { return { type: tableConstants.GET_TABLE_SUCCESS } }
    function failure(error) { return { type: tableConstants.GET_TABLE_FAILURE, error } }
};
```

__General Structure__

The general structure of the file is setup such that we `export` a bunch of functions that we define later on. So, as this file grows it may be more difficult to see, but the structure follows this.

```js
export const tableActions = {
    /* 
        yourFunc1,
        yourFunc2
     */
};

function yourFunc() {
    /* function body and redux "fun" */
}

function yourFunc2() {
    /* function body and _moar_ redux "fun" */
}
```

__Dispatch__

In short, `dispatch` is the connection from "action" to "reducer".

> Check the [official redux docs](https://redux.js.org/basics/actions) for more `dispatch` and how it interacts with actions and the store.

So, we pass `dispatch` into our action, and our first line seems to not accomplish much so let's look at a couple pieces together.

This might not appear to do much, but it plays an important part in the larger role of redux. So, we have a function `request()` defined below which appears to simply return an object. And we pass this function to `dispatch()`.

Recall that `dispatch` informs our store that something is changing--*our application has __done__ something*. In this case, we're informing the store a "request" is being made. Nothing has really been done yet, but the request is in-flight.

> *NOTE: Read about [action creators here](https://redux.js.org/basics/actions#action-creators). The formalized `request()`, `success()`, `failure()` functions aren't fully decoupled as action creators often are, but it's the same idea being expressed here.*

```js
return dispatch => {
        dispatch(request());

        /* other processing */
    };

    function request() { return { type: tableConstants.GET_TABLE_REQUEST } }
};
```

__More Dispatch...and a service call__

The other piece of our action is an asynchronous call to retrieve some data. *This is the actual work the action is defining to be performed.* It doesn't have to be async. Doesn't even have to follow the pattern of using a "service". This is just a pattern that's good enough to follow, and allows for us to build on top of it later.

So, we call to our service `tableService.getPage(1)` which returns a promise.

We handle the promise with a `.then()`.

And based on if the call was successful we dispatch `success()` or `failure()`. Notice on the `dispatch(failure())` call we're passing along some data--*not just an empty dispatch.* 

```js
/* ...the surrounding action code */

tableService.getPage(1)
    .then(
        result => {
            dispatch(success());
        },
        error => {
            dispatch(failure(error.toString()));
        }
    );

/* ...the surrounding action code */
```

Then this is all wrapped inside an anonymous function to make up the bulk of our action.

```js
function getInitialTable() {
    return dispatch => {
        dispatch(request());

        tableService.getPage(1)
            .then(
                result => {
                    dispatch(success(result));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request() { return { type: tableConstants.GET_TABLE_REQUEST } }
    function success() { return { type: tableConstants.GET_TABLE_SUCCESS, data } }
    function failure(error) { return { type: tableConstants.GET_TABLE_FAILURE, error } }
};
```

### Don't Forget Your Constants

The constants are rather simple, and might even appear bit useless. *But they're not.* They performn an incredibly important piece of "future-maintenance".

> This allows us to centralize the name of our actions so that we don't have hard-coded action names--*which are used across many places*--sprawled across the application.

Copy/paste this into your `table/constants.js` file. These will get us started, and we can add more later as we add more actions.

__*src/table/constants.js*__

```js
export const tableConstants = {
    GET_TABLE_REQUEST: 'GET_TABLE_REQUEST',
    GET_TABLE_SUCCESS: 'GET_TABLE_SUCCESS',
    GET_TABLE_FAILURE: 'GET_TABLE_FAILURE',
};
```