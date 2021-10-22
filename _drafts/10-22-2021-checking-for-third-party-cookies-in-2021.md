---
layout: post
title: Checking for Third Party Cookies in 2021
author_avatar: https://avatars.githubusercontent.com/u/5316399?v=4
author_name: Sam Messina
author_github_username: regexpressyourself
---

Checking whether third-party cookies are enabled has always been a game of whack-a-mole. The techniques available to us are mostly unreliable. But it is possible to check third-party cookie status with JavaScript in a reliable way across all major browsers, and here's how.

![](/images/posts/10-22-2021-checking-for-third-party-cookies-in-2021/cookies.jpeg)


## Introduction

When working with iframes, one often needs to interact with third-party cookies. In situations where one's app is loading a third-party site into an iframe and requires third-party cookies to function, users will encounter a wholly broken experience.

At first, it seems that the simplest approach is to use JavaScript to check that third-party cookies are enabled. We can then fail gracefully and give the user a chance to reconcile the issue.

Upon further digging, however, we find that checking for third-party cookies is not entirely "easy." But it is doable, and we'll discuss how here.

## Unreliable Techniques

If one searches for ways to check for third-party cookies with JavaScript, they will find a plethora of techniques that are at best unreliable and at worst deprecated.

### What Makes a Technique Unreliable?

So why are the above techniques unreliable, and how can we find a reliable method to check for third-party cookies?

These techniques all use what I would call "browser hacks" to deduce the status of third-party cookies. In some respects, this makes sense. Browsers want to encourage good stewardship from web developers, and checking for third-party cookies can be a common precursor for attempting nefarious action.

As responsible stewards of the web, we still need to find a reliable method for checking third-party cookies that respects our users' privacy choices.


### Unreliable Technique #1:` ``Navigator.cookieEnabled`

The [`Navigator.cookieEnabled`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/cookieEnabled) API seems promising at first glance. Unfortunately, the API is entirely unreliable in practice:

> When the browser is configured to block third-party cookies, and navigator.cookieEnabled is invoked inside a third-party iframe, it returns `true` in Safari, Edge Spartan and IE (while trying to set a cookie in such scenario would fail). It returns `false` in Firefox and Chromium-based browsers.
>
> - [MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/cookieEnabled)

### Unreliable Technique #2:` ``window.localStorage === null`

Checking if `localStorage` is a proper object used to be a way to check for third-party cookies. Unfortunately, recent browser versions will allow third-party clients to access `localStorage`, but will still block third-party cookie access.

## A Mostly-Working Solution

Rather than utilizing browser hacks for checking for third-party cookies, why not go to the source of the problem? If we’re looking to test whether we can set third-party cookies, the obvious solution is to try to set a third-party cookie and see if it can be read.

The basic flow here would be:

1. Load a third-party site in an iframe in our application
2. The third-party site sets a cookie
3. The third-party site attempts to read the cookie
4. The third-party site posts a message to its parent (i.e. our application) indicating whether the cookie could be read
  - Posting messages can be done via [`window.postMessage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)
5. The parent site reads the message, and stores the response for use in the application

### 1. Setting Up The Third Party Site

To accomplish this, we’ll first need to host a static HTML page on a **separate domain** from our application.

The site will need to (1) set a cookie, (2) attempt to read it, and (3) communicate to the parent window whether or not the cookie could be read. This is accomplished with a simple script tag on a static HTML page:


```html
<!-- THIRD PARTY STATIC HTML PAGE -->

<body>
  <script>
    document.cookie = `s=1; secure=true; samesite=none; path=/;`

    ;(function () {
      if (!window.parent) return
      const hasCookie = /s=1/.test(document.cookie)
      const msg = hasCookie ? "supported" : "unsupported"
      window.parent.postMessage(msg, "*")
    })()
  </script>
</body>
```

### 2. Setting Up The Parent Window

Now that we have our third-party site, we need to load it and interact with it.

Loading the site is simple enough: we just need to iframe our site into the application. This is easiest done as a script so that we can target the iframe and listen to messages:

```javascript
// APPLICATION CODE

function loadThirdPartyIframe() {
  return new Promise((resolve) => {
    const frame = document.createElement('iframe')

    // TODO change to where you've hosted the third-party page
    frame.src = 'https://<your_third_party_site_domain>.com'

    frame.id = '3pc'
    frame.style.display = 'none'
    frame.style.position = 'fixed'

    window.addEventListener(
      'message',
      function listen(event) {
        if (event.data === 'supported' || event.data === 'unsupported') {
          supported = event.data === 'supported'
          document.body.removeChild(frame)
          window.removeEventListener('message', listen)
          resolve({ supported, timedOut: false })
        }
      },
      false
    )

    setTimeout(() => {
      if (supported === null) {
        supported = false
        resolve({ supported, timedOut: true })
        document.body.removeChild(frame)
      }
    }, 1e3)

    document.body.appendChild(frame)
  })
}

const checkThirdPartyCookies = async function () {
  const { timedOut, supported } = await loadThirdPartyIframe()
  return timedOut || supported
}

checkThirdPartyCookies().then((thirdPartyCookiesEnabled) => {
  console.log(`thirdPartyCookiesEnabled: ${thirdPartyCookiesEnabled}`)
})
```

### 3. Stitching It Up

So, we have our third-party static HTML page, and we have our script to iframe it into our application and listen for messages. Time to test it out!


Checking this script in the major browsers, all is _mostly_ well. There is an issue with Firefox, however. In Firefox Private browsing, our function indicates third-party cookies can be set. This isn't a complete picture of what's happening though.


## Issues With Our Solution And Firefox Private

The issue here is that Firefox is allowing our third-party cookie to be set, but it is partitioning the cookie to the third-party site exclusively.

In February 2021, Firefox added [state partitioning](https://hacks.mozilla.org/2021/02/introducing-state-partitioning/). State partitioning allows third-party cookies to be set but sandboxes them to the third-party site only.


> Third party cookies before state partitioning:
> ![third-party cookies before state partitioning](/images/posts/10-22-2021-checking-for-third-party-cookies-in-2021/state-partitioning--before.png)
>
>
> Third party cookies after state partitioning:
> ![third-party cookies after state partitioning](/images/posts/10-22-2021-checking-for-third-party-cookies-in-2021/state-partitioning--after.png)
>
> (Images taken from the [Mozilla blog](https://hacks.mozilla.org/2021/02/introducing-state-partitioning/))


## Fixing The Firefox Foible

With the updates to third-party cookies, Firefox has also added new browser API functions.

The function addition of note here is [`document.hasStorageAccess()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/hasStorageAccess). `document.hasStorageAccess()` will return a Promise that resolves to `true` if cookies are not sandboxed, and `false` if cookies are sandboxed.

### "Gotchas" With `document.hasStorageAccess()`

`document.hasStorageAccess()` is still experimental in most browsers, so depending on it entirely will be prone to error.

The easiest way around this issue is to check if `document.hasStorageAccess` (1) exists, and (2) has a type of `function`:

```javascript
if (document.hasStorageAccess && 
    typeof document.hasStorageAccess === 'function') {
  // we can trust document.hasStorageAccess
} else {
  // we cannot trust document.hasStorageAccess
}
```

## Revisiting Our Solution

### Before We Fix Anything

If the implementation in our application can function with partitioned third-party cookies, we don't need to change anything. 

If instead, we need to share some cookie state in our implementation, we'll need to fix the Firefox Private browsing issue.

### Implementing The Firefox Fix

Fortunately, our solution is still half correct. The function we created for our application will still work, but we will need to adjust our third-party static page.


```html
<!-- THIRD PARTY STATIC HTML PAGE -->

<body>
  <script>
    document.cookie = `s=1; secure=true; samesite=none; path=/;`

    ;(function () {
      if (!window.parent) return
      const hasCookie = /s=1/.test(document.cookie)

      let hasStorageAccess = true
      if (document.hasStorageAccess &&
          typeof document.hasStorageAccess === "function") {
        hasStorageAccess = document.hasStorageAccess()
      }

      const msg = hasCookie && hasStorageAccess ? "supported" : "unsupported"
      window.parent.postMessage(msg, "*")
    })()
  </script>
</body>
```


This page will accurately return the third-party cookie status for all major browsers. It will also fail when state partitioning is enabled now.

To check if this is working, we can run our application’s function (above) in Firefox Private browsing. We should see that cookies are _not_ enabled in Firefox Private browsing, but that cookies _are_ enabled in regular Firefox browsing.


-----------


## tl;dr -- Quick Start Instructions

### 1. Create an HTML page with the following contents 
```html
<!-- THIRD PARTY STATIC HTML PAGE -->

<body>
  <script>
    document.cookie = `s=1; secure=true; samesite=none; path=/;`

    ;(function () {
      if (!window.parent) return
      const hasCookie = /s=1/.test(document.cookie)

      let hasStorageAccess = true
      if (document.hasStorageAccess &&
          typeof document.hasStorageAccess === "function") {
        hasStorageAccess = document.hasStorageAccess()
      }

      const msg = hasCookie && hasStorageAccess ? "supported" : "unsupported"
      window.parent.postMessage(msg, "*")
    })()
  </script>
</body>
```

### 2. Host the HTML page on a unique domain 

This should be a different domain than your application.

### 3. Add the async function to your application:

```javascript
// APPLICATION CODE

function loadThirdPartyIframe() {
  return new Promise((resolve) => {
    const frame = document.createElement('iframe')

    // TODO change to where you've hosted the third-party page
    frame.src = 'https://<your_third_party_site_domain>.com'

    frame.id = '3pc'
    frame.style.display = 'none'
    frame.style.position = 'fixed'

    window.addEventListener(
      'message',
      function listen(event) {
        if (event.data === 'supported' || event.data === 'unsupported') {
          supported = event.data === 'supported'
          document.body.removeChild(frame)
          window.removeEventListener('message', listen)
          resolve({ supported, timedOut: false })
        }
      },
      false
    )

    setTimeout(() => {
      if (supported === null) {
        supported = false
        resolve({ supported, timedOut: true })
        document.body.removeChild(frame)
      }
    }, 1e3)

    document.body.appendChild(frame)
  })
}

const checkThirdPartyCookies = async function () {
  const { timedOut, supported } = await loadThirdPartyIframe()
  return timedOut || supported
}
```

### 4. Call your new function in your application:

```javascript
const thirdPartyCookiesEnabled = await checkThirdPartyCookies()

// thirdPartyCookiesEnabled can be used now
```



