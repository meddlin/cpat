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


### State Management

redux - https://react-redux.js.org/

```bash
npm install --save redux react-redux redux-thunk redux-logger
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


## Documentation (Site)

### Gatsby.js

https://www.gatsbyjs.org/

Gatsby.js is a static site generator built with React and GraphQL. However, don't
let the "static" part of the explanation make you think it can't have dynamic
capabilities.

**Recommendation**: *The idea for an interactive documentation website should
likely be accomplished with Gatsby.*