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