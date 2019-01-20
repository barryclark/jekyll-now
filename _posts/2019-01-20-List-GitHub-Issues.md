---
layout: post
title: Assignment: list-github-issues
---

This site was a coding challenge given during a company interview. The task was to build a way to view GitHub issues for open source repos. 

You can find the repo [here](https://github.com/astrosquid/list-github-issues) and the live version on Heroku [here](https://list-github-issues.herokuapp.com/).

I enjoyed this project a lot - it was very open ended, and since this is for a company that does a lot of prototyping, it had to be completed quickly and efficiently. This post will be about how it was made, and what caveats stood in the way of it being better. 

## Getting started
Almost as soon as I was given this task, I thought of the tutorial for React Router. It’s right on the front page of their site; [see for yourself](https://reacttraining.com/react-router/)! This example is about jumping between info for gists hosted on GitHub.

The first thing the site does is load JSON data from a URL. Technically the main objective was to view issues from a particular repo, and I wanted to use Rails since I know ~~there will always be a massive amount of bugs~~ that the friendly community is always willing to point out potential areas of improvement. This is happening in the App component, which is the highest level, and in its `componentDidMount()` function. We’re doing it here because the React documentation [says so](https://reactjs.org/docs/react-component.html#componentdidmount), and since we always need to kick things off with a default repo, React will guarantee this happens after the App is inserted into the DOM tree. Quick and easy.

Once this fetch is done, the issues are stored in state for later.

## Workflow

Next up was to create two panels in the app. I really wanted these to fill the screen and be scrollable, and I wanted the issue titles to take up roughly a third of the horizontal space.

```javascript
<div className="issue-app-container">
	<ResultsSelector issues={this.state.issues} />
	<IssueViewer issues={this.state.issues} />
</div>
```

So we’ll have the selector on the right, and the detailed view on the left, just like in the video tutorial.

We’ll take a look at both of these, but let’s handle ResultsSelector first.

ResultsSelector receives all the issues as a prop and then calls an internal function called `createIssueTitles(issues)`, which looks like this:

```javascript
createIssueTitles = issuesJson => {
  return issuesJson.map( issue => {
    return (
      <div className="issue-title-card" key={issue.id}>
        <Link to={`/issue/${issue.id}`}>
        <p>
          {issue.title}
        </p>
        </Link>
      </div>
    )
  })
}
```

The only thing of note here is that we are wrapping a Link component from react-router-dom within the div, so that when someone clicks the contents of that div, they’ll load the detail page of that issue in the right hand panel.

Speaking of that link, if we head over to IssueViewer.js. Links tell the browser where to go, and Routes are where the browser will land when visiting a URL you Link’d to. With that in mind, in here, we’ve got a route being matched exactly to the root URL, or `/`, which will tell users to select an issue on the left. If they land on an issue, which is `/issue/:issueId`, we find the issue based on the ID in the URL and pass it to the IssueDetails component as a prop.

Again, this component is just picking random bits of info from the issue prop we gave it, but there’s some nice-to-haves I felt were appropriate to include.

### Link to issue on GitHub

First, and perhaps the easiest, is that when you request issue info from GitHub’s API, you’re given a ton of other URIs to relevant data. Most of these will provide some kind of additional JSON, but the actual GitHub issue is in here too, so I provide a link to the real issue in case you want to see it in the native site. 

There’s a ton of other great info here, including things like linking to the comments data, which I’ll come back to later.

### Opener’s status

Second, also provided with the base issue data is some info about the user that opened it. We also get a URL to this person’s profile, so that’s an easy inclusion — we’ll link directly to them. But also in here in their relationship to the project, and I really like this. If you look at the posts from this person within the issue, you can see it there, but I like this printed right next to the name. So if this value is null or empty, we print nothing, but if they’re a contributor, maintainer, owner, etc, we’ll attach it to their name.

### Labels

Next, we’re replicating the labels that are found on the actual GitHub issue. This is fun — when a label’s JSON arrives from your request, you can poke through it and see what color was chosen for it by the org. Since this is just a hexadecimal value, we can override the style of the labels to be a pound sign (octothorpe, hashtag, whatever) plus this value. All you have to do is:

```javascript
<div style={{backgroundColor: `#${labelColor}`}}></div>
```

I dislike inline styles in React (or plain JavaScript for that matter), but it’s got some uses!

### Issue body

OK, so now we’ve come to the meat of the issue which is the detail that this user included in their original post. This can have all sorts of great content, including things like code snippets, which I really want to be formatted as the original poster intended. 

Luckily, GitHub just uses markdown! So all we need is a way to parse that. We can try rolling our own, but I’ve tried that before and it gets messy fast 😅, besides, there’s tons of packages out there that will do this for us. (Plus, just something I’ve noticed, tons of open source projects relating to markdown will use GitHub’s own styling as the default preset. Perfect for us!)

So, I did some quick searching and decided on `markdown-react-js`. It’s a very easy to use library from npm which you pull in on a per-component basis, pass it some text, and get HTML out. Super quick and easy.

So this is how we’re generating the body, the library will just spit out some HTML tags and render them through our component. It doesn’t have any styling opinions on those tags, which is great, but your browser probably will. I wrote some quick css to highlight inline and preformatted code, and that’s all it took to make things look a lot better than they did by default.

We’re also employing this library for the title text.

## Areas of Improvement

There’s some problems with how I approached this project, but the most obvious is that comments are not included on the site.

### Matching Routes Doesn’t Rerender Components

Remember that link to the comments JSON from earlier? One thing I really wanted to do was render the issue comments below the body, just like on GitHub. But there’s a catch — matching a new Route in React Router doesn’t make the components rendered by it refresh. 

Normally this is okay, but it gets in the way when you want to make another network request. Since we know from the React documentation earlier that the correct place to make a network request is from `componentDidMount()`, it makes sense to 

- have a comment container component of some kind 
- use its `componentDidMount` to fetch the comments and put them in state
- render the comments upon success

But the problem is that this container will only be inserted into the DOM tree once using React Router, and since that’s when `componentDidMount` executes, this request will only happen for the first issue a user happens to click on. 

That meant that when I clicked on another issue, I was still viewing comments from the previous one (even if that meant there were no comments). 

There’s a way around this, of course — why not make the fetch requests for all of the issues I’ve got? I don’t even have to do it for _all_ of them necessarily, since I can filter out the ones with no comments with just the issue data (there’s a very helpful `comments` key in the issue JSON that points to an integer).

Unfortunately… 

### GitHub Has a Rate Limiter

I wanted to show the maximum number of issues possible without complicating the logic too much. So I’m requesting the latest 100 issues, all of which can have comments. Even if I filter out the ones that don’t, this number easily exceeded 60, which is where GitHub cuts you off for about an hour.

Once this happened, there was no way to load the issue data, and I didn’t want comments to break the app.

## If I Could Do It Again

If I had to do this again, I’d take a slightly different approach. 

### Architecture 

First, there would be some kind of backend server, possibly with Rails, but maybe just Sinatra, that would 

- hold a GitHub API key, 
- so that it could make requests on behalf of my front end

Since the OAuth API keys are allowed to make more requests, all I’d have to do is get my site to ask the backend for the data and round-trip it from GitHub. This way, I could easily make a ton of requests for things like comments and not care _too much_ about the number of requests being made. 

### Production Release

I’d also spend a lot less time being sidetracked by trying to make a production release of this app for Heroku. It wasn’t part of the requirements, but I liked that a prod build

- would stop the React extension from turning red in the evaluator’s browser, which made it feel a bit more professional, and 
- wouldn’t spit out error pages if it encountered an exception I didn’t see during development.

I wrote a whole post on this, which you can see [here](https://astrosquid.github.io/React-Heroku-Prod/). This was a silly thing to get hung up on, and it took me a couple hours of fiddling since I had never done it before. One whole extra day in fact! So if I had spent that energy on thinking up the better solution above, I think the project would have been better for it.

This was given to me on a Thursday and it was ready Saturday — I submitted at noon Sunday because I like to sleep on these decisions before committing. 

## Wrap up

In conclusion, I felt this was a really interesting project. It wasn’t needlessly difficult like some CS-based whiteboard questions and it had a lot of practical elements built in. Plus, the speed necessary from kickoff meant the real challenge was planning correctly from the beginning. I hope that while this assignment could have turned out better, it demonstrated resourcefulness and speed, two qualities I imagine are very important at a prototyping company.
