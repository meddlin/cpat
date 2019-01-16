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

### Python v3.x is already included on Ubuntu behind 'python3' alias

[https://askubuntu.com/questions/320996/how-to-make-python-program-command-execute-python-3](https://askubuntu.com/questions/320996/how-to-make-python-program-command-execute-python-3)

**Setup pdfminer.six**

The issue was trying to run `pdfminer.six`, but attempting this without any other setup collides with Ubuntu's pre-installed version of python2.x. So, we need:

- `pip install` using the `python3` alias
- how to run pdfminer.six *using* the `python3` alias?
- use `virtualenv`

The `pdfminer.six` specifies running `pip install pdfminer.six` to get it.
[https://github.com/pdfminer/pdfminer.six](https://github.com/pdfminer/pdfminer.six)

The accepted answer on this SO post shows how to setup a `virtualenv` for python3.
[https://stackoverflow.com/questions/10763440/how-to-install-python3-version-of-package-via-pip-on-ubuntu](https://stackoverflow.com/questions/10763440/how-to-install-python3-version-of-package-via-pip-on-ubuntu)

...But following that on Ubuntu 18.04 LTS, an error was thrown reporting `distutils.spawn` wasn't found. So:

`sudo apt-get install python3-distutils`

[https://stackoverflow.com/questions/3810521/how-to-install-python-distutils](https://stackoverflow.com/questions/3810521/how-to-install-python-distutils)