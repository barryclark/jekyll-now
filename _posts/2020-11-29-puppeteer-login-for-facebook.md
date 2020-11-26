---
layout: post
title: Logging into Facebook in a Repeatable Manner using Puppeteer
---
I wanted to automate the process of getting some information out of a Facebook group. Unfortunately the Facebook Graph API only allows administrators of a group to access that groups posts via the API. So I went down the route of scraping the information instead.

## The Problems I Seen
I thought this would be as simple as instructing Puppeteer to enter my username and password and click login. I was mistaken. 

The first road block I ran into was the MFA I had enabled on my account. I had to disable this on my account when I wanted to scrape. The next thing that impeded me was a cookie banner that appears when loading Facebook for the first time from a browser, it blocked me from clicking the login button. 

Finally Facebook will become aware that something suspicious is going on with your account pretty quickly if you try to repeatedly login with a username and password. I found this happened super fast (usually on the first attempt at login) when I ran this on the cloud. When this happens they redirect you to an authenticion flow where you have to do something like confirm a code sent to your email or enter some personal information about yourself. To avoid hitting these security barriers I found reusing our Facebook session was a decent solution.

## The Solution
See all of <a href="https://github.com/jackohara/puppeteer-login-for-facebook" target="_blank">the code here</a>. 


### Setup
We are going to use the ```puppeteer``` package which will allow us to control a chrome browser. The ```fs``` package is going to be used for saving and loading our Facebook session cookies.

```
const puppeteer = require('puppeteer');
const fs = require('fs').promises;

const FACEBOOK_URL = 'https://www.facebook.com';

const getDefaultBrowser = async (headless) => {
  const browser = await puppeteer.launch({
    headless,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const context = browser.defaultBrowserContext();
  context.overridePermissions(FACEBOOK_URL, []);
  return browser;
};

const getDefaultPage = async (browser) => {
  const page = await browser.newPage();
  await page.setViewport({
    width: 800,
    height: 800,
    deviceScaleFactor: 1,
  });
  await page.setDefaultNavigationTimeout(Number.MAX_SAFE_INTEGER);
  return page;
};
```

A few notable things here. Check out this line.
```
  context.overridePermissions(FACEBOOK_URL, []);
```
It prevents the chrome pop up that asks permission for Facebook to send us notifications. The popup seems to prevent Puppeteer from navigating Facebook when we run in non headless mode. This doesn't seem to be an issue if you are running in headless mode. 

```
  await page.setViewport({
    width: 800,
    height: 800,
    deviceScaleFactor: 1,
  });
```
And this line forces the chrome window to always be the same size. This is fairly important for scraping as some websites will return different results for different sized devices. 

### The Login Flow
We are going to check if Facebook cookies exist (they won't yet) and if so use those to log in. If they don't exist or they don't work for logging in then we are going to use username and password to login. After we are logged in we are going to save our cookies for reuse later if we want to login again. 

```
(async () => {
  const browser = await getDefaultBrowser(true);
  const page = await getDefaultPage(browser);
  const username = 'mark.zuck@gmail.com';
  const password = 'HelloWorld';

  // Load cookies from previous session
  const cookies = await fs.readFile('cookies.js')
    .then((facebookCookies) => JSON.parse(facebookCookies))
    .catch((error) => {
      console.error(`Unable to load Facebook cookies: ${error}`);
      return {};
    });
  
  // Use our cookies to login. If it fails fallback to username and password login.
  if (cookies && Object.keys(cookies).length) {
    await loginWithSession(cookies, page).catch(async (error) => {
      console.error(`Unable to login using session: ${error}`);
      await loginWithCredentials(username, password, page);
    });
  } else {
    await loginWithCredentials(username, password, page);
  }

  // Save our freshest cookies that contain our Facebook session
  await page.cookies().then(async (freshCookies) => {
    await fs.writeFile('cookies.js', JSON.stringify(freshCookies, null, 2));
  });

  await scrape(page);
})();
```

So let's see how the ```loginWithSession``` and ```loginWithCredentials``` methods work. 

```loginWithSession``` is straightforward. We replace our chromiums cookies with the cookies we loaded containing the Facebook session cookies. If the Facebook session cookies are valid then Facebook will be logged in already when we load the Facebook home page.   

```
  loginWithSession: async (cookies, page) => {
    console.log('Logging into Facebook using cookies');
    await page.setCookie(...cookies);
    await page.goto(FACEBOOK_URL, { waitUntil: 'networkidle2' });
    await isLoggedIn(page).catch((error) => {
      console.error('App is not logged into Facebook');
      throw error;
    });
  },
```

The ```isLoggedIn``` method here loads facebook and waits for the element ```<div role="feed">``` to appear on the page. This element seems to appear on many pages when logged in to Facebook. 

```
const isLoggedIn = async (page) => {
  await page.goto(FACEBOOK_URL, {
    waitUntil: 'networkidle2',
  });
  await page.waitForSelector('div[role=feed]');
};
```

The ```loginWithCredentials``` method enters our username and password and submits. But there is one step before submitting which is deleting the Facebook cookie banner if it appears. If we don't remove it then we are left unable to click the login button. 


![_config.yml]({{ site.baseurl }}/images/facebook-cookie-banner.jpg)
*The Facebook cookie banner*



```
  loginWithCredentials: async (username, password, page) => {
    console.log('Logging into Facebook using credentials for', username);
    await page.goto(FACEBOOK_URL, {
      waitUntil: 'networkidle2',
    });
    await page.waitForSelector('#email');
    await page.type('#email', username);
    await page.type('#pass', password);

    const cookieBanner = 'div[data-testid="cookie-policy-banner"]';
    if (await page.$(cookieBanner) !== null) {
      console.log('Facebook cookie banner found');
      await page.evaluate((selector) => {
        const elements = document.querySelectorAll(selector);
        for (let i = 0; i < elements.length; i += 1) {
          elements[i].parentNode.removeChild(elements[i]);
        }
      }, cookieBanner);
    }

    await page.click('button[name=login]');
    await page.waitForNavigation();
    await isLoggedIn(page).catch((error) => {
      console.error('App is not logged into Facebook');
      throw error;
    });
  },
```


### Scraping Facebook
Hopefully you have been able to login successfully using this method. You are now free to scrape Facebook. This part is much more difficult than logging in. Facebook purposely jumbles of some of their front end code to prevent people from doing things like this. Fair enough. Data is their commodity and they need to protect it. 

My use case required collecting links that were posted into Facebook groups. So I was able to load the group and scrape all of the links on the page without requiring an awareness of how their HTML/CSS is structured. Check this example out for scraping music related links. 
```
    const hrefsOnPage = await feed.evaluate(() => Array.from(document.getElementsByTagName('a'), (a) => a.href)
    .filter((link) => {
        if (link.includes('youtube') || link.includes('youtu.be') || link.includes('soundcloud') || link.includes('spotify') || link.includes('bandcamp')) {
        return true;
        }
        return false;
    }));
```

A problem I've ran into and I'd like to try solve is how to scroll endlessly in Facebook. Yes it's fairly easy to jump to the bottom of the page and wait for Facebook to load more content. But unfortunately Puppeteer is memory hungry. After some time of scrolling endlessly your memory usage will shoot up. I think a good solution would be to delete news feed posts from the DOM after you have scraped them. <a href="https://stackoverflow.com/a/50869650" target="_blank"> This StackoverFlow answer would be a good start</a>. 

And with many scraping solutions, what works today may not work tomorrow as websites evolve and update.

P.S be careful saving your Facebook session cookie to a local file, if someone gets access to it then that's your Facebook comprimised. I've used AWS Systems Manager Parameter Store to securely store mine.