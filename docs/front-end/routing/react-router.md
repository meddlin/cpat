# Routing

[react router](https://reacttraining.com/react-router/) is basically a defacto choice for routing in React web apps now. We'll cover some of the basics here. Check out their docs for the rest.

Docs: [https://reacttraining.com/react-router/web/guides/quick-start](https://reacttraining.com/react-router/web/guides/quick-start)

## Getting Started

Install.

```bash
npm install --save react-router-dom
```

Wrap your `App`

- Make sure you're using `BrowserRouter` not `Router`

```js
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
	return (
		<CenteredApp className="App">
			<Router>
				<div>
					<Route path="/" exact={true} name="createUser" component={Table} />
					<Route path="/create-user" exact={true} name="createUser" component={DocForm} />
				</div>
			</Router>
		</CenteredApp>
	);
}
```

## Use `history`

Access `history` in your components

```js
import { useHistory } from 'react-router-dom';

const ExampleComponent = () => {
    let history = useHistory();

    return (
        <div>
            <button onClick={() => history.goBack()}>Back</button>
            <button onClick={() => history.push("/page")}>Go to page</button>
        </div>
    );
}
```

A couple notes on some common issues setting this up.

> - New hooks in react-router: [https://dev.to/finallynero/hooks-introduced-in-react-router-v5-1-7g8](https://dev.to/finallynero/hooks-introduced-in-react-router-v5-1-7g8)
> - BrowserRouter issue: [https://stackoverflow.com/questions/42857283/react-router-typeerror-this-props-history-is-undefined](https://stackoverflow.com/questions/42857283/react-router-typeerror-this-props-history-is-undefined)
> - Using `useHistory()` hook in sub-components of `BrowserRouter` only: [https://stackoverflow.com/questions/58220995/cannot-read-property-history-of-undefined-usehistory-hook-of-react-router-5](https://stackoverflow.com/questions/58220995/cannot-read-property-history-of-undefined-usehistory-hook-of-react-router-5)