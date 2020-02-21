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

At this point it's good to double check your `services.js`, `constants.js`, and `reducers.js` files too.

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

### Finally, Table component

Alright, here we have what we need to finally call and display data in our `Table` component.

We'll start with our new imports. We're now pulling in a new `useEffect` thing from React, `connect` from Redux, and we need a reference to the store so we can `dispatch` actions.

```js
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { store } from '../_helpers/store';
```

Next we change the way data is handled in our `Table` component. We are now pulling in `props`. We've removed the hard-coded data, and we're using the `useEffect` hook to force the component to trigger an action before loading. 

Finally, we've fleshed out the `mapStateToProps` function since we're actually returning data now. We're pulling in the `state` parameter from the _state of the Redux store_, not your component state. Then we're destructuring `table` from `state`--remember, `table` was the name of our exported function from our reducer! And finally, our we return an object that handles the shape of our state accounting for default values.

Recall from earlier in the tutorial, `connect(mapStateToProps)(Table)` uses currying to connect our component to the rest of the Redux data flow.

```js
const Table = (props) => {
    const { data } = props;

    useEffect(() => {
        store.dispatch(tableActions.getInitialTable());
    }, []); // don't put 'data' here without an "exit condition"--infinite recall loop.

    return (
        /* Component structure removed for brevity */
    );
}

function mapStateToProps(state) {
    const { table } = state;
    return {
        loading: (table && table.loading) || false,
        data: (table && table.data) || [],
    };
}

const connectedTable = connect(mapStateToProps)(Table);
export { connectedTable as Table };
```

> NOTE: [React Hooks](https://reactjs.org/docs/hooks-intro.html) are outside the scope of what we're covering here. `useEffect` is allowing us to make sure we trigger an action to retrieve our data *before* the component loads. Its first parameter is the function we want to run. The empty array denotes `useEffect` isn't watching anything to re-execute on.

Here's our new, complete `Table` component connected to our Redux store, and displaying the data it retrieves! At this point, it's _highly encouraged_ to run your application with Dev Tools open. Set some breakpoints then trigger an action, and watch how the data moves around.

> Component -> Action -> Service -> Reducer -> Store -> (back to!...) Component

```js
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { tableActions } from '../table/actions';
import { connect } from 'react-redux';
import { store } from '../_helpers/store';

const Row = styled.div`
    margin: 1em;
    span {
        margin: 0.25em;
    }
`;

const Table = (props) => {
    const { data } = props;

    useEffect(() => {
        store.dispatch(tableActions.getInitialTable());
    }, []); // don't put 'data' here without an "exit condition"--infinite recall loop.

    return (
        <div>
            {(data && data.length !== 0) ? data.map(item => {
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

function mapStateToProps(state) {
    const { table } = state;
    return {
        loading: (table && table.loading) || false,
        data: (table && table.data) || [],
    };
}

const connectedTable = connect(mapStateToProps)(Table);
export { connectedTable as Table };
```