# React.js Standards

## General Applications

CRA - Create React App [https://reactjs.org/docs/create-a-new-react-app.html](https://reactjs.org/docs/create-a-new-react-app.html)


Stay on this for as long as possible.

CRA is a means to avoid setting up a tedious webpack toolchain configuration. It provides a means for quickly getting started with 95% of what is needed with React and then moving forward. It's robust enough to handle moderate configurations and deploy to production.

**Recommendation**: *Stay with CRA until your deployment needs become too
demanding and/or cumbersome for the built-in webpack configuration.*

### Styling

styled-components - https://styled-components.com/

```bash
npm install --save styled-components
```

### Routing

react-router - https://reacttraining.com/react-router/

```bash
npm install react-router-dom
```

### Forms

formik - https://github.com/jaredpalmer/formik

yup - https://github.com/jquense/yup

```bash
npm install --save formik yup
```

### Testing

Jest & enzyme - https://create-react-app.dev/docs/running-tests/

### State Management

redux - https://react-redux.js.org/

```bash
npm install --save redux react-redux redux-thunk redux-logger
```

> A note on Redux and state management.
>
> The most complex piece of this example code and documentation covers Redux. This isn't because Redux is inherently difficult, but because it attempts to solve a difficult problem for client-side JavaScript applications. Redux attempts to handle "state" for the entire application. 1) Provide a standard means for components to _store_ state. And... 2) Provide a standardized way to _update_ said state.
>
> This is becomes a difficult problem.
> 
> Sense of **"global state"**
> - Handling global variables is difficult even they have sophisticated structures around them. (i.e. store + reducers) 
> - Redux begins to appear more like a local cache of server state--_caching is a **hard** problem_.
>
> Tight-er coupling
> - A beneft of writing modularized, component-based appplications is loose coupling. _Re-use things as needed, where needed._
> - Redux inherently couples features between components, actions, and reducers. Meaning more complex development to update a functionality.
>
> Redux is ***not*** always the answer, but instead should be viewed as a decent tradeoff. It is being covered in-depth here because of the benefit it can bring to a large React application. In such large apps, the complication already exists. So, the impact of any complexity Redux introduces is minimized by how complex the app already is. Also, being complex is demands more attention for documentation.
>
> Where appropriate, consider other solutions for managing state. Here's two examples:
> 
> - The new(er) Context API [https://reactjs.org/docs/context.html](https://reactjs.org/docs/context.html)
> - Use of inversion of control designs like component composition
>
> This is an article from Dan Abromov, author of Redux, on this topic.
>
> [https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367)

## Documentation (Site)

### Gatsby.js

https://www.gatsbyjs.org/

Gatsby.js is a static site generator built with React and GraphQL. However, don't
let the "static" part of the explanation make you think it can't have dynamic
capabilities.

**Recommendation**: *The idea for an interactive documentation website should
likely be accomplished with Gatsby.*