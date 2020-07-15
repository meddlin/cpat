# CPAT: Collaborative Penetration-Testing and Analysis Toolkit

This project is an attempt to create a collaborative, real-time, decentralized application for aggregating network reconnaissance data and allowing network pentesting tool integrations.

## Getting Started

- Start front-end: `/cpat-client` with `npm start`
- Start API: open `/cpat-core` in Visual Studio
- Start data layer(s): `./docker-compose up -d`


## Project Structure

`cpat`
- `/cpat-client`
	- React.js front-end
- `/cpat-core`
	- Central .NET Core API
- `/python-rest-api`
	- OSINT Reconnaissance API
- `/docs`
	- project documentation outside of README.md
- `/tool-scripts`
	- python scripts (and other langs.)
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

## Architecture/Tech Stack

The **data, stream processing,** and **search** layers are currently managed via Docker. The other pieces will 
be containerized in time.

### Front-end

- React.js
- Redux
- formik

### API-layer

- Core API
	- .NET Core
	- SignalR
	- NPoco

- OSINT
	- Flask/Python

### Data Storage/Processing

_Note: CRDB is not currently integrated with Kafka due to licensing, funding._

- Apache Kafka
- MongoDB
- CockroachDB

### Search

- Elastic
- Kibana


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