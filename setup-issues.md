### Per file dependencies

Without a "proper" python project scenario setup, we can't just use the typical `pipenv install` command to install dependencies. So, here's the dependencies broken down per file anyway.

- fileconv.py
	- xmltodict
	- pymongo

### Setting up Python Environment

- (Ubuntu) If pipenv isn't recognized as a command
[https://stackoverflow.com/questions/46391721/pipenv-command-not-found](https://stackoverflow.com/questions/46391721/pipenv-command-not-found)
	- Run: `sudo -H pip install -U pipenv`

- Generate a `pipfile` with `pipenv`
[https://pipenv.readthedocs.io/en/latest/basics/](https://pipenv.readthedocs.io/en/latest/basics/)
	- Run: `pipfile install`

