---
layout: post
title: Cookies
---

##### What are cookies?
* They are small bits of data stored as text files in the browser.
* Used to track user activity and enable user specific features
* Max cookie size is 4K
* Contents
    * Unique user identification
    * Information about the user
    * Cookie name and value
    * Expiry URL ( incase persistent)
    * Attributes: secure ( for https) , HttpOnly flag, SameSite flag

##### Different type of cookies?
* Session cookie
    * Temp cookie that is stored in browser memory just until the browser is closed.
* Persistent cookies
    * Long term cookies with an expiration date. This cookies is used not only to track the activity in the site that issued the cookie but also in any other site that includes a resource issued but the same site.
    * Its the remember me checkbox you use when loging in
* First party cookie
    * Issued by the site you are visiting
* Third party cookie
    * Is used to track users who click on advertisements and associate them with the referring domain. Generally these cookies are added by the advertiser domain.

##### Cookie Fraud:
* Cross site scripting (XSS)
* Session fixation
* Cross site request forgery attack (CSRF)
* Cookie tossing attack

##### How are they created ?
* Webserver tells the browser to create the cookie and the instructions are sent via http header.
* Eg: Set-Cookie: <cookie_name>=<cookie_value> / document.cookie (js)

[More Reference](https://www.whoishostingthis.com/resources/cookies-guide/)
