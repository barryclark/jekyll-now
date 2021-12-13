---
layout: post
title: Handling Promise Errors
author_avatar: https://avatars.githubusercontent.com/u/5316399?v=4
author_name: Sam Messina
author_github_username: regexpressyourself
---

In a recent Lunch and Learn with the Maxwell engineering team, we noticed two different ways to handle a rejected Promise. One can either include a second argument to the Promise's `.then()` function, or add a `.catch()` function. Curious to learn more, I decided to dig in further.

![](/images/posts/2021-12-13-promises-unfulfilled-handling-promise-errors/detour.jpeg)

## The two methods of catching rejected Promises

**Method #1**: The first method to handle a rejected Promise involves adding a second callback to the `.then()` function:

```javascript
Promise.reject().then(
  () => console.log('Success'),
  () => console.log('Error')
)
```

**Method #2**: The second method to handle a rejected Promise is adding a `.catch()` function:

```javascript
Promise.reject()
  .then(() => console.log('Success'))
  .catch(() => console.log('Error'))
```


## Similarities between the two methods

The two methods of handling rejected Promises are almost entirely the same. From MDN:

> ...calling obj.catch(onRejected) internally calls obj.then(undefined, onRejected).
>
> - [MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch)

In almost all cases, either method will work. There is one major exception, however.

## Differences between the two methods

Despite the nearly-identical implementations, there is one major difference. When either (1) an error is thrown in the `.then()` handler, or (2) the `.then()` handler returns a rejected Promise, only the `.catch()` function will catch the error.

```javascript
Promise.resolve()
  .then(
    () => Promise.reject('Rejected'), // or throw new Error()
    () => console.log('Second .then() function') // not called
  )
  .catch((err) => console.error('.catch() function')) // called
```

### Why would we reject a Promise in the `.then()` function?

A rejected Promise would most commonly occur when chaining Promises together. Consider a series of interdependent API calls:

```javascript
firstApiCall()
  .then((response) => secondApiCall(response), console.error)
  .then((response) => setState(response), console.error)
```

If `secondApiCall()` in the example above is rejected, our `console.error` function will not run, and the error will throw and not be caught.

Additionally, we would have to repeat our error handler for each Promise along the chain, which may be repetitive if the error handler is generic.


Adding a `.catch()` function to the above example will both simplify the code, and allow the rejected Promise to be caught.

```javascript
firstApiCall()
  .then((response) => secondApiCall(response))
  .then((response) => setState(response))
  .catch(console.error)
```


## Conclusion

To make things easy, simply use `.catch()` to catch errors in Promises. This will work exactly the same as the second function passed to `.then()` in most cases, and will allow you to catch errors from rejected Promises in a Promise chain.


