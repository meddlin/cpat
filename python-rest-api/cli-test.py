## This tool shows how to make a REST call from Python to a separate API
## In this case, the other API is implemented with .NET Core, but doesn't
## have to be.

import requests

url = 'http://localhost:5000/api/osint/test'
# url = 'https://google.com'
r = requests.get(url)
print(r.text)