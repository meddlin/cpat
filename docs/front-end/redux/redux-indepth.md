# Redux: "Practically" In-Depth

For a deep-dive on the individual methods and inner-workings of redux, it is recommended to reference the Redux documentation. Here, we'll walk through an example which covers about ~80% of what is needed when working with Redux.

- [Redux Docs - Getting Started](https://redux.js.org/introduction/getting-started)
- [Redux Docs - Advanced Tutorial](https://redux.js.org/advanced/advanced-tutorial)

As for the rest of this document, it is written assuming you are starting with an already running React app created with [create-react-app](https://reactjs.org/docs/create-a-new-react-app.html).

<hr />

## Sample Project

See `sample-project.md` for an explanation of the project, `redux-table`. Much of its core functionality will be covered in this document.

<hr />

## Setup Store and Middleware

Before we dive into the redux code, we need to install our dependencies.

### Install packages

```bash
npm install --save redux react-redux redux-thunk redux-logger
```

### Store and Middleware

Alright, now let's create the store where the data we want to manage for the application will be stored.

First, create a new directory, `_helpers`, and inside of it create a new file `store.js`. Copy and paste the following into it. We'll explain the `thunkMiddleware` and `loggerMiddleware` later on. 

Really the only method to pay attention to in here is `export const store = createStore();`. *Thats' it.* That line is the piece that creates our redux store.

__*_helpers/store.js*__

```js
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

// We'll come back to set this up later.
/* import rootReducer from '../_reducers'; */

const loggerMiddleware = createLogger();

export const store = createStore(
	// rootReducer,
	applyMiddleware(thunkMiddleware, loggerMiddleware)
);
```

Then, inside `index.js` we need to wrap the central `<App />` component in a provider. This is so we can "provide" the store to rest of the application.

__*index.js*__

```js
/* other packages... */
import { Provider } from 'react-redux';
import { store } from './_helpers';

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, 
	document.getElementById('root')
);
```

### Connect the `App` Component

We need to connect `App` to the `store` provided by redux. There's a lot to take in, so I've laid out all of the major parts below.

Now let's go through it piece by piece.

__*src/App.js*__

```js
import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {
    render() {
        const { example } = this.props;

        return (
            <div className="App">
                {/* ...the rest of the contents of App... */}
            </div>
        );
    }
}

function mapStateToProps(state) {
  const { example } = state;
  return { example };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
```

_Pull in dependencies_

First, import `connect` from redux. We'll need it later. This method is what literally "_connects_" `<App />` to the redux store. *Remember, data only flows one direction; so, components can only directly receive data from the store.*

```js
import { connect } from 'react-redux';
```

_Create a `mapStateToProps()` function_

After the class declaration for `App` we have this strange function. The naming is meant to describe that we are "mapping store state to the component's props". So, the example `mapStateToProps()` is fairly simplistic, but more could be happening here. 

The function accepts the `state` parameter. Then destructures `example` out of the state object parameter, and returns `example` wrapped in a new object.

This function is necessary because of the following two key points:

- Components only accept data passed down through `props`
- With redux, components receive data from the store

```js
function mapStateToProps(state) {
  const { example } = state;
  return { example };
}
```

_Use `connect()` to move data from store to component_

The way `connect()` is being used here might look strange. We call `connect()` passing in our function, `mapStateToProps`. Then, we connect all of that to the `App` component via currying. We can do this because `connect()` is written as a curried function. Once it completes it returns a new React component.

```js
const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
```

> For a longer form explanation on currying:
> - [https://stackoverflow.com/questions/36314/what-is-currying?rq=1](https://stackoverflow.com/questions/36314/what-is-currying?rq=1)
> - [https://blog.bitsrc.io/understanding-currying-in-javascript-ceb2188c339](https://blog.bitsrc.io/understanding-currying-in-javascript-ceb2188c339)

In other words, we call `connect()` passing `mapStateToProps` and then immediately call the `App` component. `connect` grants us access to the store, `mapStateToProps` provides instructions on which parts of the store should be supplied to our component and how, and finally we reference the component we're connecting.

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
            {dataItems ? dataItems.map(item => {
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

## Connect and Combine Reducers

Now, the reducers. These perform most of the work of maintaing our store. When our actions and/or services have finished retrieving data doing whatever is necessary that data is dropped off here, and we have to decide how to update the store.

<hr />

_A Note on Immutability_

Some of the tactics used in updating the store may seem atypical compared to how data updates are handled in other applications, such as those written within object-oriented paradigms. This change in tactics is due to React's push for practicing immutability. While nothing outright prevents directly mutating any piece of data we're still going to stick to keeping things consistent.

> See these resources for more on immutability and Redux
> - Prerequisite Reducer Concepts [https://redux.js.org/recipes/structuring-reducers/prerequisite-concepts/#note-on-immutability-side-effects-and-mutation](https://redux.js.org/recipes/structuring-reducers/prerequisite-concepts/#note-on-immutability-side-effects-and-mutation)
> - Immutability in React (Article) [https://blog.logrocket.com/immutability-in-react-ebe55253a1cc/](https://blog.logrocket.com/immutability-in-react-ebe55253a1cc/)
> - Excellent, practical StackOverflow explanation [https://stackoverflow.com/questions/34958775/why-should-objects-in-redux-be-immutable/34962065#34962065](https://stackoverflow.com/questions/34958775/why-should-objects-in-redux-be-immutable/34962065#34962065)
> - Dan Abromov, explaining why he built Redux (Video) [https://www.youtube.com/watch?v=xsSnOQynTHs](https://www.youtube.com/watch?v=xsSnOQynTHs)

<hr />

_Back to the App!_

Let's create a new `reducers.js` file for our table domain. So, `table/reducers.js`, and then we have our first three reducers.

__*src/table/reducers.js*__

```js
import { tableConstants } from './constants';

export function table(state = {}, action) {
    switch(action.type) {
        case tableConstants.GET_TABLE_REQUEST:
            return Object.assign({}, ...state, {
                loading: true
            });
        case tableConstants.GET_TABLE_SUCCESS:
            return Object.assign({}, ...state, {
                loading: false
            });
        case tableConstants.GET_TABLE_FAILURE:
            return Object.assign({}, ...state, {
                loading: false
            });

        default:
            return state;
    }
}
```

There isn't much going on here, but it's the basis for what we'll need later on.

Here, we are setting our initial state, an empty object. Also, we're passing along the `action` object from `dispatch`.

```js
function table(state = {}, action) {
    /* ...reducers */
}
```

Then we switch on the `action.type`--using our *constants*. If nothing matches return the same `state`.

```js
switch(action.type) {
    case tableConstants.GET_TABLE_REQUEST:
    // other cases...

    default:
        return state;
}
```

> Recall that we created actions taking the form of:
> ```js
> { type: tableConstants.GET_TABLE_REQUEST }
> ```

The immutability shows up in our use of `Object.assign()`. Instead of directly mutating the `loading` property of our `state`, we do the following:

- Create a new object
- "Spread" `state` across our new object using the spread operator, `...`
- Also pass in a new `loading` property

```js
return Object.assign({}, ...state, {
    loading: true
});
```

> Read more about `Object.assign` and the spread operator here.
> - [Object.assign()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
> - [Spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

## Connect Services

Now for the final piece, connecting our redux flow to a service handler to make requests against endpoints. First, create the file, `table/services.js`.

*NOTE: I'll be referencing a REST API in this section that we're using to make example calls against. I'll cover more of the specifics later on, but for now assume it's just a standard REST API written in any popular server-side language.*

At the top of the file, we export the name of our functions (only one for now) and setup an object for easier use of our config information.

```js
export const tableService = {
    getInitialTable
};

const config = {
    apiUrl: process.env.REACT_APP_API_URL || 'https://localhost:5001'
};
```

Here is our `getInitialTable()` function. Pretty simplistic, but this leaves room for stretching things out for more complex requests. For a GET request we don't have much to setup, but create the `requestOptions` object anyway. Then we pass this data along to `fetch()` from the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).

Notice the use of a [template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) to pull in the API endpoint URL, and `requestOptions` are passed as a parameter.

Finally, `fetch()` returns a Promise which we handle with a `.then(handleResponse)`. We'll cover this next.

```js
function getInitialTable() {
    const requestOptions = {
        method: 'GET',
    };

    return fetch(`${config.apiUrl}/table`, requestOptions).then(handleResponse);
};
```

If things looked a _little too simplistic_ with that `fetch()` call, then this should answer any straggling questions. Our `handleResponse()` handles the literal HTTP response from our call to the API.

```js
function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                authenticationService.logout();
                Location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
```

That's it! Here's the `table/services.js` in its entirety. Of course, as you add more complexity to the API communication (e.g. CORS support, JWT authorization, and/or other HTTP request methods) this piece of the application will grow.

_*src/table/services.js*_

```js
export const tableService = {
    getInitialTable
};

const config = {
    apiUrl: process.env.REACT_APP_API_URL || 'https://localhost:5001'
};

/**
 * Get an initial set of data from the API to show in a table.
 */
function getInitialTable() {
    const requestOptions = {
        method: 'GET',
        // headers: { 'Authorization': `Bearer ${user.token}`, 'Content-Type': 'application/json' }
    };

    return fetch(`${config.apiUrl}/table`, requestOptions).then(handleResponse);
};

/**
 * Generic handler to manage the HTTP response from the endpoint.
 * @param {*} response 
 */
function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                // authenticationService.logout();
                Location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
```

## Circling Back...Final Connections

Previously, we left certain pieces out so the application wouldn't be constantly crashing while we were trying to build out all of the Redux pieces. Let's add those back in to bring it all together.

### Revisit imports

_*src/components/Table.js*_

In the Table component , add/uncomment an import for the actions and `connect()`.

```js
import { connect } from 'react-redux';
import { tableActions } from '../table/actions';
```

_*src/table/actions.js*_

In the actions file, add/uncomment an import for the services.

```js
import { tableService } from './services';
```

### Adjust the store

Now that we have a reducer, update your `store.js` to the following. We're importing the table reducer, and then "combining" it into a `rootReducer`. This is how reducers communicate their changes back to the store.

_*src/_helpers/store.js*_

```js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { table } from '../table/reducers';

const loggerMiddleware = createLogger();

const rootReducer = combineReducers({
	table
});

export const store = createStore(
	rootReducer,
	applyMiddleware(thunkMiddleware, loggerMiddleware)
);
```

At this point it's good to double check your `services.js`, `constants.js`, and `reducers.js` files too.

### Make the call in the Table component

```js
/* Table needs to actually call the tableActions instead of rely on hardcoded dummy data. */
```

## What's left: Add Logging Support (`redux-logger`)

*Add logging to `Table.js`*

```js

/* in the /table/actions.js */
// import { alertActions } from '../_helpers/_telemetry/alertActions';

// dispatch(alertActions.success('Table retrieved!'));
// dispatch(alertActions.error(error.toString()));
```