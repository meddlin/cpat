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