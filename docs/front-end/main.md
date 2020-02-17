# Front-end Standards

### React for a Modular UI System

(explain how React + styled-components + Verdaccio can enable use of a modular
and reusable UI/UX system)

Below we have the motivations

<hr />

#### A Note on TypeScript

_I'll quote the Redux documentation here. TypeScript is generally the recommended choice over JavaScript. Redux will likely be the most complex piece of any of these standards to implement. Seeing that it comes with a recommendation for TypeScript provides a good starting point for a practical argument for other uses of these tools to use TypeScript as well._

> While we do officially recommend use of static typing with Redux, use of TypeScript does have tradeoffs in terms of setup, amount of code written, and readability. TypeScript will likely provide a net benefit in larger apps or codebases need to be maintained over time by many people, but may feel like too much overhead in smaller projects. Take time to evaluate the tradeoffs and decide whether it's worth using TS in your own application.

_Further, the examples and sample code in these docs aren't using TypeScript because the time and research to convert everything to TypeScript hasn't 

[https://redux.js.org/recipes/usage-with-typescript/](https://redux.js.org/recipes/usage-with-typescript/)

<hr />

#### React & Tools

The big advantage React provides is modularity by components. This core tenant of the library
along with the proper tools allow for a robust front-end for our web apps. A difficult--but 
major--victory will be creating a component-based UI/UX library

#### Package Management: Verdaccio

Verdaccio is a self-hosted npm proxy registry. This enables us to host custom npm packages without
using [npmjs.com](https://docs.npmjs.com/creating-and-publishing-private-packages). Of course, the
official npmjs repositories are a viable option, but such an option may not always be agreeable 
for internal tooling.

*NOTE: A more appropriate and robust option would be [Azure DevOps Artifacts](https://docs.microsoft.com/en-us/azure/devops/artifacts/get-started-npm?view=azure-devops&tabs=windows). However, research simply 
hasn't been completed for this yet.*

#### UI Design System

*We have this piece largely fulfilled!--in the current UI standards.*

*[insert link to Kestra UI standards]*

For further reading, take a look at this sample collection of other design systems.

[https://designsystemsrepo.com/design-systems/](https://designsystemsrepo.com/design-systems/)

#### "Functional" Documentation

The idea of functional documentation moves past static prose which can easily become dull or difficult to 
understand. Documenting software should focus on examples and interactives demos.

## General Applications

### Toolchain

CRA - Create React App
https://reactjs.org/docs/create-a-new-react-app.html

Stay on this for as long as possible.

CRA provides a means for quickly getting started with React and moving forward.
It is an integrated toolchain for React which largely sets up and handles
webpack for you. It's robust enough to handle moderate configurations and deploy
to production.

**Recommendation**: *Stay with CRA until your deployment needs and webpack customizations become too
demanding and/or cumbersome*.


### Styling

styled-components - [Link](https://styled-components.com/)

Styled-components is a CSS-in-JS solution for styling React components. 


### State Management

redux - [Link](https://react-redux.js.org/)

#### Middlewares

`redux-thunk` explanation: [https://alligator.io/redux/redux-thunk/](https://alligator.io/redux/redux-thunk/)

Enables async functionality in Redux data flow.

`redux-logger`: [https://github.com/LogRocket/redux-logger](https://github.com/LogRocket/redux-logger)

Excellent default logging functionality--even if only during development time.

(Untested/Experimental) `redux-appinsights`: [https://github.com/wbuchwalter/redux-appinsights](https://github.com/wbuchwalter/redux-appinsights)

The `redux-appinsights` middleware is a potential solution for logging capabilities of React client-side applications having a standardized feel similar to what's available server-side in C#/.NET Core.

### Routing

react-router - [Link](https://reacttraining.com/react-router/)


### Forms: Form Creation + Data Validation

formik - [Link](https://github.com/jaredpalmer/formik)

yup - [Link](https://github.com/jquense/yup)


### Authentication
JWT (JSON Web Token)

### Testing

Jest & enzyme - [Link](https://create-react-app.dev/docs/running-tests/)


## Documentation (Site)

### Gatsby.js - [Link](https://www.gatsbyjs.org/)

Gatsby.js is a static site generator built with React and GraphQL. However, don't
let the "static" part of the explanation make you think it can't have dynamic
capabilities.

**Recommendation**: *The idea for an interactive documentation website should
likely be accomplished with Gatsby.*

### Live Edit (Experiment)

A useful idea would be to allow for editing the source code, for React components,
dynamically as the page is rendered.

MDX.js with live code: [https://mdxjs.com/guides/live-code](https://mdxjs.com/guides/live-code)

The MDX live code example above is based on the [react-live library](https://github.com/FormidableLabs/react-live). You can see it deployed here: [https://react-live.netlify.com/](https://react-live.netlify.com/)

Attempting to put it all together following this tutorial

[https://www.christopherbiscardi.com/post/using-mdx-scope-in-react-live-scope/](https://www.christopherbiscardi.com/post/using-mdx-scope-in-react-live-scope/)


## Verdaccio