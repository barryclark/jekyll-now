During my tenure as a developer I have run across a few instances where creating UI tests against a web app was imperative to the project.

One such instance was a proprietary legacy application that I was working with. This application was highly coupled, making it difficult if not impossible to write unit tests. This meant that a change to the application had the potential to cause cascading negative side effects on other features. The best way to regression test these changes was to come up with a set of UI tests that could test the app and ensure that all the features were still functional.

Another case was where I had a colleague that was working in SharePoint Online and creating custom modules. In their situation they were bound by the client to deploy to production at certians times and then be responsible testing anything that had been deployed to ensure it was working properly. The deployment times specified by the client were not very opportune (friday nights) and so I wanted to reduce the amount of time they would need to spend testing all of the features.

In both cases I used Selenium, and found that interacting with Selenium is not exactly the most straightforward. For example in order to make the browser full screen something like this code needs to be written ```WebDriver.Manage().Window.FullScreen();```. For me that was a little verbose and so I created an extension method so that my code could look like ```WebDriver.MakeFullScreen();```.

The intention here was to create a set of shortcuts that could be used to allow a developer to generate tests faster and not have to worry so much about the inner workings of Selenium. In doing this I found a few areas where improvement could be made, such as, making sure to wait a small amount of time for the element to be available when I was asking the browser to find it. I also found that following the Page Object Design Pattern was helpful in abstracting away low level details about a page or a particular component on the page and allowed the developer to simply perform actions on the page and query its current state.

After a while of going after the "Make it easy for a developer to write a new test" goal I found myself with a set of helpers and base classes toward that effort and have put them on GitHub https://github.com/evannielsen/SeleniumCompounds. Take a look and let me know what you think.

Here are some key areas that I have addressed in the repo:
* Extension methods for operations to the WebDriver.
* The page model pattern and abstracting common tasks.
* Authentication.
* SharePoint Modern controls.
* Testing and configurtion with the NUnit framework.