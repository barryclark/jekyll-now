---
layout: post
title: Proxies for debugging
tag: javascript,manikin
published: true
---

After my last post on debugging canvas, I just kept digging a bit and came up with a general purpose class to debug third-party objects (like canvas contexts).

Edit: Of course I only now found out about the [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) object in ES6. Could have saved me some time, but what's done is done!

This is pretty straightforward. The idea is to replace an existing object with a proxy object which will be able to log method calls and property changes before routing those things to the original object. This is completely generic, so it'll work on more things than just canvas contexts.

```javascript
let ProxyDebugger = {
	instrumentContext: (original, logName, logger, modifiers) => {
		// The object that all calls will go through
		let proxyObj = {};

		for (let propName in original) {
			if (original[propName] instanceof Function) {
				// Proxying methods.
				proxyObj[propName] = (...args) => {
					let argsForLogging = args;
					if (propName in modifiers) {
						argsForLogging = modifiers[propName](args);
					}
					logger.log(`${logName}.${propName}`, argsForLogging);  
					original[propName].apply(original, args);
				};
			} else {
				// Setters and getters for proxy'ed properties.
				Object.defineProperty(proxyObj, propName, {
					set: function(value) {
					 	original[propName] = value;
						logger.log(`${logName}.${propName} = ${value}`);
					},
					get: function(name)	{
						return original[propName];
					}
				});    
			}
		}
		return proxyObj;
	}
}

module.exports = ProxyDebugger;
```

A quick example of how to use it:

```javascript
let ctx = document.getElementById('manikin').getContext('2d');
ctx = ProxyDebugger.instrumentContext(ctx, 'ctx', window.console, {
	'rotate': (argsIn) => {
		// Print angles in degrees.
		return [argsIn[0] * 180 / Math.PI]
	}
});
```

The first argument is the object to instrument, the second one is the name that will appear in the logs. The third argument can be any object implementing a `log()` method.

The last argument is a little luxury: it's an object containing functions that will be used to format arguments for display when logging method calls.

Pretty simple, yet super useful, it's the reason why I didn't lose my mind debugging canvas transforms :)

The [full version can be found on GitHub](https://github.com/mikaelgramont/manikin/blob/master/src/scripts/proxydebugger.js).
