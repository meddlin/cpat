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