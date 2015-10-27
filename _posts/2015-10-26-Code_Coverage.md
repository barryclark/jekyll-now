---
layout: post
title: Code Coverage Report for Waterbear
author: Alex MacLean
---

So we have all heard many times about how important it is to test our code, and there are many ways to do so, but when discussing unit testing it is especially important to consider how we'll know what parts have been tested.

Enter the code coverage report. This is a powerful tool that should be included in any project. The idea is simple, it checks that each line/branch/statement has been considered by a unit test. If the report shows that some lines have not been touched then the decision of what to test next is a simple one.

Javascript makes this process slightly more complicated than a no-nonsense language like C with the chance that it's mixed up in some HTML or CSS but there are still helpful modules available to make this a relatively painless task.

For Waterbear, we used a 3-part combo: [Karma](http://karma-runner.github.io/0.13/index.html) for the testing environment, [PhantomJS](http://phantomjs.org/) for the headless browser, and [Istanbul](https://gotwarlost.github.io/istanbul/) for the report generation.

And [QUnit](https://qunitjs.com/) was what we used for the testing framework.

The first step, as you might expect, was to install all the required packages in addition to phantomjs and qunitjs, which we already had:

```
npm install --save-dev istanbul qukarma karma-qunit karma-phantomjs-launcher karma-coverage
```

After all those were acquired it was time to generate the karma configuration file with: 

`./node_modules/.bin/karma init karma.conf.js`

This began a series of prompts in order to get the neccessary information about which files we wanted to check the coverage on, which modules to use, and the which test scripts to run.

Of high importance was to use QUnit as the framework and PhantomJS as the browser. Also make sure to include the files in the correct order so that all dependencies are satisfied. There are options to include librairies but not watch them since they won't be tested here. For more information on this see the Karma [documentation](http://karma-runner.github.io/0.13/config/files.html).

When this was done, all that was left to do was modify the test script in package.json and run the tests:

```
  "scripts": {
    "test": "./node_modules/karma/bin/karma start karma.conf.js"
  },
```

Then simply:

`npm test`

And the report can be found in coverage/ from the root directory of the project.

So with that we now have a tool to keep track of what's been tested and what hasn't. As unit tests continue to be written aim for that 100%!

-Alex