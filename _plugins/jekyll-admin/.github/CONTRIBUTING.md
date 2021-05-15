Interested in contributing to Jekyll Admin? We’d love your help. Jekyll Admin is an open source project, built one contribution at a time by users like you.

## Where to get help or report a problem

If you think you've found a bug with Jekyll Admin, or if you'd like to propose a new feature check out the [list of open issues](https://github.com/jekyll/jekyll-admin/issues) and if it's not there [open a new one](https://github.com/jekyll/jekyll-admin).

## Ways to contribute

* Add Jekyll Admin to an existing site. Does it work? Does it do what you'd expect? Anything else you'd like to see? If you have any suggestions, [open an issue](https://github.com/jekyll/jekyll-admin/issues/new)

* Comment on some of the project’s [open issues](https://github.com/jekyll/jekyll-admin/issues/). Have you experienced the same problem? Know a work around? Do you have a suggestion for how the feature could be better?

* Read through [the documentation](http://jekyll.github.com/jekyll-admin), and click the “improve this page” button, any time you see something confusing, or have a suggestion for something that could be improved.

* Find an [open issue](https://github.com/jekyll/jekyll-admin/issues/) (especially those labeled `help-wanted`), and submit a proposed fix. If it’s your first pull request, we promise we won’t bite, and are glad to answer any questions.

* Help evaluate [open pull requests](https://github.com/jekyll/jekyll-admin/pulls/), by testing the changes locally and reviewing what’s proposed.

## Submitting a pull request

### Pull requests generally

* The smaller the proposed change, the better. If you'd like to propose two unrelated changes, submit two pull requests.

* The more information, the better. Make judicious use of the pull request body. Describe what changes were made, why you made them, and what impact they will have for users.

* Pull request are easy and fun. If this is your first pull request, it may help to [understand GitHub Flow](https://guides.github.com/introduction/flow/).

* If you're submitting a code contribution, be sure to read the [code contributions](#code-contributions) section below.

### Submitting a pull request via github.com

Many small changes can be made entirely through the github.com web interface.

1. Navigate to the file within [`jekyll/jekyll-admin`](https://github.com/jekyll/jekyll-admin) that you'd like to edit.
2. Click the pencil icon in the top right corner to edit the file
3. Make your proposed changes
4. Click "Propose file change"
5. Click "Create pull request"
6. Add a descriptive title and detailed description for your proposed change. The more information the better.
7. Click "Create pull request"

That's it! You'll be automatically subscribed to receive updates as others review your proposed change and provide feedback.

### Submitting a pull request via Git command line

1. Fork the project by clicking "Fork" in the top right corner of [`jekyll/jekyll-admin`](https://github.com/jekyll/jekyll-admin).
2. Clone the repository locally `git clone https://github.com/<you-username>/jekyll-admin`.
3. Create a new, descriptively named branch to contain your change ( `git checkout -b my-awesome-feature` ).
4. Hack away, add tests. Not necessarily in that order.
5. Make sure everything still passes by running `script/cibuild` (see [the tests section](#running-tests-locally) below)
6. Push the branch up ( `git push origin my-awesome-feature` ).
7. Create a pull request by visiting `https://github.com/<your-username>/jekyll-admin` and following the instructions at the top of the screen.

## Proposing updates to the documentation

We want the Jekyll Admin documentation to be the best it can be. We've open-sourced our docs and we welcome any pull requests if you find it lacking. Any time you propose a code change, you should also include updates to the documentation and tests within the same pull request.

If your contribution changes any Jekyll Admin behavior, make sure to update the documentation. Documentation lives in the `/docs` folder (spoiler alert: it's a Jekyll site!). If the docs are missing information, please feel free to add it in. Great docs make a great project. Include changes to the documentation within your pull request, and once merged, the site will be updated.

### How to submit changes

You can find the documentation in the [`/docs`](https://github.com/jekyll/jekyll-admin/tree/master/docs) directory. See the section above, [submitting a pull request](#submitting-a-pull-request) for information on how to propose a change.

### Previewing changes locally

1. `script/bootstrap`
2. `script/docs-server`
3. Open [localhost:4000/jekyll-admin](http://localhost:4000/jekyll-admin) in your browser
