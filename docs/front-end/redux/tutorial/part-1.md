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