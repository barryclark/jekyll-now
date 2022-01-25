---
layout: post
title: Extracting Custom React Hooks The Easy Way
author_avatar: https://avatars.githubusercontent.com/u/5316399?v=4
author_name: Sam Messina
author_github_username: regexpressyourself
---


Creating custom React hooks took me a while to "[grok](https://en.wikipedia.org/wiki/Grok)." However, at their core, hooks are just components that don't render. Here, I'll show you the quickest, easiest way to extract a custom hook from a complex component.

![](/images/posts/2022-01-25-quick-and-easy-custom-hooks/fish-lure.jpeg)

## What makes a React hook?

The folks over at React give us a great definition to start with:

> Hooks are functions that let you “hook into” React state and lifecycle features from function components.
>
> - [React docs](https://reactjs.org/docs/hooks-overview.html)

Essentially, hooks are functions that run on each render of a component. They are semantically differentiated from normal functions by using the `use` keyword at the front of the hook name (e.g. `useState`). Hooks can take parameters and can return values, but neither is required.

## Why use a React hook?

### Manage complexity

We can compose custom hooks by leveraging other hooks like `useEffect` and `useState`. This allows us to write custom hooks that can monitor pieces of application state and send information back to our components to handle the UI when things change.

While all this can be done at the component level, using custom hooks allows us to easier separate the heavy logic from the UI.

### Share logic

Custom hooks are especially useful when multiple components implement the same set of logic. Rather than having all the `useEffect` and `useState` logic in both components, it can be extracted to a custom hook and shared across all components that need it.

### Easier unit tests

Keeping the heavy logic in a custom hook allows us to test the logic and UI separately. Using something like [`react-hooks-testing-library`](https://github.com/testing-library/react-hooks-testing-library), we can test the logic of our hook without needing to deal with user inputs, finding DOM elements, etc. It also allows us to test our UI with a mocked version of our custom hook, making it easier to validate the UI is working as expected.

## Extracting a custom React hook 

Consider an application that leverages URL query parameters to help initialize the application state. 

One approach might involve writing a `useEffect` hook that can decode the URL query parameters for us, and storing the result with `useState`. We can accomplish this all in the component directly:


```javascript
const myComponent = () => {
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const nextUserId = urlParams.get('user_id') || null
    setUserId(nextUserId)
  }, [window.location])

  return userId ? <>Your user ID is: {userId}</> : <>No user ID found</>
}
```

Unfortunately, if we wanted to do this same thing in multiple components, we'd have to copy all of the `useEffect` and `useState` logic to every component that needs it.

## Thinking outside the ~~component~~ box

This is where custom hooks come in. The easiest way to think about custom hooks is "a component without JSX." 

We already have a component with all the logic we need for our custom hook, so now we just need to separate the custom hook from the component.

### Extracting the hook

To extract the component logic into a hook, we can just copy/paste our component, remove the JSX, and return the state. Here's the diff between our component and our new custom hook:


```diff
- const myComponent = () => {
+ const useQueryParam = () => {
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const nextUserId = urlParams.get('user_id') || null
    setUserId(nextUserId)
  }, [window.location])
 
-  return userId ? <>Your user ID is: {userId}</> : <>No user ID found</>
+  return userId
}
```

### Calling the hook

Now that we have extracted the hook, we can call it from our component. This should just be a matter of removing the `useState` and `useEffect` logic, pulling `userId` from our custom hook call instead.

Again, here's the diff from the old component implementation to the new one using our new custom hook:

```diff
const myComponent = () => {
-  const [userId, setUserId] = useState(null)
+  const userId = useQueryParam()
 
-  useEffect(() => {
-    const urlParams = new URLSearchParams(window.location.search)
-    const nextUserId = urlParams.get('user_id') || null
-    setUserId(nextUserId)
-  }, [window.location])
 
  return userId ? <>Your user ID is: {userId}</> : <>No user ID found</>
}
```

### Refactoring our hook for multiple uses

As it stands, we're still just pulling `user_id` from our query parameters. Instead, it would be nice if we could pass in the parameter we're looking for, so that different components can use the same hook.

To do this, we first need to accept a `param` argument for our hook: 


```diff
- const useQueryParam = () => {
+ const useQueryParam = (param) => {
-  const [userId, setUserId] = useState(null)
+  const [paramValue, setParamValue] = useState(null)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
-    const nextUserId = urlParams.get('user_id') || null
+    const nextParamValue = urlParams.get(param) || null
-    setUserId(nextUserId)
+    setParamValue(nextParamValue)
  }, [window.location])
 
-  return userId
+  return paramValue
}
```

Next, we can pass in the parameter from our component:

```diff
const myComponent = () => {
-  const userId = useQueryParam()
+  const userId = useQueryParam('user_id')
  return userId ? <>Your user ID is: {userId}</> : <>No user ID found</>
}
```


### Putting it all together

Altogether, we now have a very simple component and a custom hook with logic that can be reused elsewhere:

```javascript
const useQueryParam = (param) => {
  const [paramValue, setParamValue] = useState(null)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const nextParamValue = urlParams.get(param) || null
    setParamValue(nextParamValue)
  }, [window.location])

  return paramValue
}

const myComponent = () => {
  const userId = useQueryParam('user_id')
  return userId ? <>Your user ID is: {userId}</> : <>No user ID found</>
}
```

Notice very little has changed. This works functionally the same as before, but now we can call `useQueryParam` from multiple different components without needing to repeat code.



## tl;dr

To extract a custom hook from a complex component:
1. Take all the logic above your component's JSX, and move it to a custom hook. 
2. Return any data needed in your component from your custom hook.
3. Call the custom hook from your component, and pull out whatever data is needed.
4. Add parameters to your hook as needed to allow for reusability in multiple components.
5. Done! You have a new custom hook ready to use.

### Before:

```javascript
const myComponent = () => {
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const nextUserId = urlParams.get('user_id') || null
    setUserId(nextUserId)
  }, [window.location])

  return userId ? <>Your user ID is: {userId}</> : <>No user ID found</>
}
```


### After:
```javascript
const useQueryParam = (param) => {
  const [paramValue, setParamValue] = useState(null)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const nextParamValue = urlParams.get(param) || null
    setParamValue(nextParamValue)
  }, [window.location])

  return paramValue
}

const myComponent = () => {
  const userId = useQueryParam('user_id')
  return userId ? <>Your user ID is: {userId}</> : <>No user ID found</>
}
```
