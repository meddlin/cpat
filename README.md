## CPAT: Collaborative Penetration-Testing and Analysis Toolkit

This project is an attempt to create a collaborative, real-time, decentralized application for aggregating network reconnaissance data and allowing network pentesting tool integrations.

### Getting Started

- Start front-end: `/poc/cpat-client` with `npm start`
- Start API: open `/poc/cpat-core` in Visual Studio
- Start data layer(s): `./docker-compose up -d`

_Deprecated: These are old notes from the previous version of CPAT._

```js
// **Dependencies**

// - Meteor.js
// - MongoDB
// - python
// - pymongo

// *If you don't have a Python environment setup already.*

// - Install `pip` [https://pypi.org/project/pip/](https://pypi.org/project/pip/)
// 	- Run: `sudo apt install python-pip`
// - Install `pipenv` [https://packaging.python.org/tutorials/managing-dependencies/#managing-dependencies](https://packaging.python.org/tutorials/managing-dependencies/#managing-dependencies)
// 	- Run: `pip install --user pipenv`
```


**Project Structure**

`cpat`
- `/poc` main CPAT code areas currently live in here...
- `/app` meteor app								
- `/rest-api` rest api (impl.)
- `/python-rest-api` rest api (impl.)
- `/docs` project documentation outside of README.md
- `/tool-scripts` python scripts (and other langs.)
- `/tool-data` data mined/stored locally from tools
	- `/test-area` for dev/testing purposes
		- `/metagoofil`
		- `/recon-ng`
	- `/${date}_${targetName}`
		- `/metagoofil`
			- `/run_001`  <-- make it a date iteration?
		- `/recon-ng`
		- [...and so on]
	- `/${date}_${targetName}`
		- [...and so on]
