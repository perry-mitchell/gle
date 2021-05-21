# GLE
> Global Log Engine: Environment-agnostic debugging & logging utility

GLE is a logging and debugging utility which allows for easy application/library debug log output when flagged by environment variables.

Inspired by `debug`, but with additional support for more environments like:
 * NodeJS
 * Browsers
 * React-Native

## Installation

Run the following to install: `npm install gle --save`.

## Usage

Import one of the two following functions to start logging:

```typescript
import { createLog, log } from "gle";

const logContext = createLog("my-app:core");
logContext("test log", "some info");

// Or

log("my-app:core", "test log:", "some info");
```

`createLog` builds a log function with the **context** already defined. It is generally better for performance, as well. `log` does everything on the fly, and requires a **context** in every call.

> A _context_ is a way to group logs together into some kind of logical "area" of your application or library.

To be able to _view_ these logs, the correct environment variable must be specified.

### Displaying logs in the browser

To enable logging for a context in the browser, you can use something like the following:

```typescript
localStorage.debug = "app:*";
```

_Later:_

```typescript
import { createLog, log } from "gle";

const logContext = createLog("app:websocket");
logContext("connecting socket");
```

Which will display a log like the following in the browser's console:

```
app:websocket connecting socket +0ms
```

### Displaying logs in NodeJS

To enable logging for a context in a NodeJS app, set the `DEBUG` environment variable:

```bash
DEBUG=app:* node index.js
```

_Later, after building:_

```typescript
import { createLog, log } from "gle";

const logContext = createLog("app:db");
logContext("connecting database");
```

### Log flags

The debug environment value can be made up of several different types of patterns:

 * A single context: `my-app:some:context`
 * Multiple contexts: `app:core,app:net`
 * A Negated context: `-app:test`
 * A combination: `-app:test,app:init`
 * Wild cards: `app:*`
   * Multiple: `app:*,system:*`
   * Anywhere: `app:test,system:*:core`
   * Negated: `-system:*`
