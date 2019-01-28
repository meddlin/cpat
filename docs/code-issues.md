# Code Issues

**What's in here?**

- Known issues, abnormalities in working code.
- Questionable design choices.
- Footguns and code weird that works.

## Server-side Code

**Collection name is undefined after `import`**

*Problem*

This caused an error to be thrown like "can't call `.find()` on undefined". This seemed strange, because the '/api/targets/targets.js' file is found and imported just fine in other areas. However, this problem comes down to a misunderstood use of the JavaScript destructuring syntax.

```js
import { Targets } from './targets';

Meteor.methods({
	'targets.insert': function insert(data) {
		debugger;

		return Targets.insert({
			name: data.name,
			collectionType: data.collectionType
		});
	}
});
```

This change from `{ Targets }` to `Targets` worked.

*How it was solved*

Server-side debugging via the Chrome Node.js inspector

- [https://nodejs.org/en/docs/guides/debugging-getting-started/](https://nodejs.org/en/docs/guides/debugging-getting-started/)
- run: `meteor run --inspect-brk` [https://docs.meteor.com/commandline.html](https://docs.meteor.com/commandline.html)
- In Chrome, navigate to: "chrome://inspect"

```js
import Targets from './targets';

Meteor.methods({
	'targets.insert': function insert(data) {
		return Targets.insert({
			name: data.name,
			collectionType: data.collectionType
		});
	}
});
```

### Executing Server/System Scripts with MongoDB Inserts, and Making Relations

**Issue:** Pass parameters from client to server, accounting for resouces completely outside of Meteor application code

**Issue:** Kicking off scripts in their own process from Node.js

**Issue:** Communicating back from the script to Node listeners

**Issue:** Communicating from Node listeners back up to Meteor.js server/Node.js code

**Issue:** Establishing multiple relationships based on results of a single script execution

Two key points here:

- The MongoDB "multi parameter" is your friend.
- In Meteor.js server-side calls, iterating over collection changes (i.e. updates, inserts, etc.) will cause the calling server method to refire.

Together what these pieces mean is that we can create the following pattern: 

> When it is desirable to update MANY documents based on a SINGLE action, a "bulk" or "multi-document" operation is wanted.


### Dynamically query related documents based on a Target's relationships

*Related to "Executing Server/System Scripts with MongoDB Inserts, and Making Relations"*

A potential issue arises when trying to query any of the data related to a specific Target. A Target can be related to almost *any* of the other collection types, so we don't know which collection to query until the actual Target has been selected. It leaves a situation like this:

`${Collection}.find()`

**Dynamic Imports**

*1st Attempt: Trying a fully-dynamic (never statically-typed), import pattern*

This type of fully-dynamic, at-runtime import isn't allowed by design because of the security concern.
See: [https://github.com/meteor/meteor/pull/8327](https://github.com/meteor/meteor/pull/8327)
```js
let colName = res.relations[0].collectionName.toLowerCase();
import(`${API_EntryPath}/${colName}/${colName}.js`)
	.then((col) => {
		console.log(col);
	});
```