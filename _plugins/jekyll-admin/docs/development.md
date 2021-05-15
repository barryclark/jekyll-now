---
title: Development
permalink: /development/
---

### To install locally

1. `git clone https://github.com/jekyll/jekyll-admin && cd jekyll-admin`
2. `script/bootstrap`

This will copy down the code and install all Node and Ruby dependencies.

### Running tests

`script/cibuild`

This will run both Node and Ruby tests.

You can run one or the other with `script/cibuild-node` and `script/cibuild-ruby`.

### Running Jekyll Admin locally

There is a site in `spec/fixtures/site`, with some dummy content. Both local development servers below use that site's dummy
content for development. Feel free to make any changes you'd like, just don't commit them, unless you're adding a new fixture
(e.g., for a test).

#### Running a test server with a dummy site

If you just want to click around and see how things work, or if you're making changes to the Ruby back end side of things,
this is probably what you want.

1. Run `script/build` to compile the static frontend
2. Run `script/test-server` to start the server
3. Open `http://localhost:4000/admin` in your browser (or `http://localhost:4000/_api`)

#### Running the front end server in development mode

`script/server-frontend`

This will run the front end server via Node's development stack, meaning changes will be reloaded on subsequent requests
and is generally useful when making changes to the front end side of things. In the background, it's also going to call
`script/test-server` for you, so that the front end has an API that it can make calls to.

**Note**: Node version should be >= v6.0.0

### Running installation/test scripts on Windows

You are mostly going to need a Unix-like environment. The best choice would be Git Bash which comes with the
[Git Windows Installation](https://git-for-windows.github.io/) or [MSYS](http://www.mingw.org/wiki/msys). Try to avoid any
POSIX compliant software (e.g. Cygwin) that may get you in trouble.


### The environment flag

When developing locally, it can be helpful to see error backtraces, disable template caching, have expanded request logs,
and to allow cross-origin requests between the Ruby server and the Node server. By default, however, JekyllAdmin runs in
`production` mode, meaning these development features are disabled.

To enable the development features, set the environmental variable `RACK_ENV` to `development`. When enabled, the `/_api/`
endpoint will add `Access-Control-Allow-Origin: any` headers, and respond to `OPTIONS` pre-flight checks. This flag is set
automatically when the `script/test-server` command is used.
