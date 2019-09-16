

### front-end

**On ScriptSelector**

The button that kicks things off is the `id="run-script-btn"`

It's click handler triggers the `submitScriptToServer` method.


```js
submitScriptToServer(relatedTargets) {
	// relate "script submission" call to the 'relatedTargets'
	let scriptResult = "";
	Meteor.call('getPythonOutput', relatedTargets, (err, res) => {
		if (err) console.log(err);
		if (res) console.log(res);
	});
}
```

### back-end (Meteor server)

The line `Meteor.call('getPythonOutput')` calls to `async getPythonOutput(targets) {...}`. This method runs on the Meteor server--*Node environment with some specific Meteor limitations*.

This is where the JS -> Python call happens.

- Declare a future
- Setup an `async` JS function to handle calling Python
- Use `spawn` and cleverly-built command options (as `[string]`)
- Setup `stdout` and `stderr` handlers to catch data from Python -> JS

```js
async getPythonOutput(targets) {
	// Declare a future
	var Future = require('fibers/future');
	var fut = new Future();

	// embedded async function that will be calling Python
	async function callPython(targets) {
		// pull in spawn to make the low-level call (this allows any call, not just Python)
		const { spawn, exec } = require('child_process');

		// setup handlers to listen after spawn is called
		// data comes back to JS as a string
		var py = spawn('python', [pyScriptPath, paramStr]);
		py.stdout.on('data', function(data) {  /*... handle feedback ...*/ });
		py.stderr.on('data', function(data) {  /*... handle feedback ...*/ });
		py.stdout.on('end', function() {  /*... handle feedback ...*/ });
	}

	// calls out async function
	const res = await callPython(targets);
}
```

### server script: python

It's a standard python script here--if you have it on the system you can run it.

- Pull input from JS via `sys.argv[1]`
- Organize input params
- Run desired script
- Setup database connection, insert data

The "flush call" is used to send data back to the originating process on the Meteor server

```python
sys.stdout.flush()
```

### Refactoring

The handlers always have the same structure.


**Original**

```js
var py = spawn('python', [pyScriptPath, paramStr]);
			py.stdout.on('data', function(data) {
				dataString += data.toString();
				console.log('from on->data: ' + dataString);

				// extract pymongo from Python flush results
				if (data.toString().includes('result:')) { // at this point, 'data' is a byte array without calling '.toString()'
					pymongoResult = data.toString().split(': ').pop().replace("'", "");
				}
			});
			py.stderr.on('data', function(data) {
				if (data) console.error(`child stderr:\n${data.toString()}`);
			});
			py.stdout.on('end', function() {
				console.log(dataString);
				console.log('end of stream');

				fut.return(pymongoResult);
			});
```

**In-progress**

The idea here is to turn the "python inter-connect" for running scripts into its own re-usable package.

```js
class PythonConnection {
	let scriptParentPath = '/home/meddlin/git/cpat/';
	let IN_paramString = '';
	let IN_scriptPath = '';

	const handlerType = {
		data: 'data',
		end: 'end'
	};

	let handlerFuncs = {
		onDataStandardHandler,
		onEndStandardHandler,
		onDataErrorHandler
	}

	let py = spawn('python', [`${scriptParentPath}/${IN_scriptPath}`, `${IN_paramString}`]);

	py.stdout.on(handlerType.data, onDataStandardHandler);
	py.stdout.on(handlerType.end, onEndStandardHandler);
	py.stderr.on(handlerType.data, onDataErrorHandler);
}

let pythonEnv = new PythonConnection(
	"nmap 192.168.1.1 -oX", 
	"/tool-scripts/python/nmap-scan.py",
	func1, 
	func1, 
	func3
);
```