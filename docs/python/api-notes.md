# Notes: API (Flask)

Used Flask to create a REST API with Python.

## Setup Flask to be available across the network

`app.run(host=0.0.0.0)`

[https://stackoverflow.com/questions/7023052/configure-flask-dev-server-to-be-visible-across-the-network](https://stackoverflow.com/questions/7023052/configure-flask-dev-server-to-be-visible-across-the-network)

## Flask-CORS

Used this package to setup CORS in Flask.

[https://flask-cors.readthedocs.io/en/3.0.7/](https://flask-cors.readthedocs.io/en/3.0.7/)

Problem: HTTPS vs. HTTP

Be wary of trying to use HTTP to connect to HTTPS resources/services. .NET Core is _really nice_ and automatically redirects to
HTTPS for you. Python/Flask doesn't do this, and things just _**silently fail**_.

_So make sure you understand CORS pretty well._

[https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSDidNotSucceed?utm_source=devtools&utm_medium=firefox-cors-errors&utm_campaign=default](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSDidNotSucceed?utm_source=devtools&utm_medium=firefox-cors-errors&utm_campaign=default)


## Sending Requests

In the browser and React, we have the `fetch` API. Well...without some package, we're left to manually construction request objects and handling them ourselves (_see how nice that `fetch API` is now?_). So, we use the "Requests: http for humans" package (_yes, it appears to be named that on their website_).

[https://requests.readthedocs.io/en/master/user/quickstart/#make-a-request](https://requests.readthedocs.io/en/master/user/quickstart/#make-a-request)

Installation: [https://requests.readthedocs.io/en/master/user/install/#install](https://requests.readthedocs.io/en/master/user/install/#install)

```python
import requests
```