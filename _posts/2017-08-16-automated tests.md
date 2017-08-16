---
layout: post
title: Automated tests
category: dev
tags: [automation]
author: Bianca Carabas
author_email: bianca-cristina.carabas@haufe-lexware.com
header-img: "images/new/Exportiert_2.jpg"
---



## 1. WHAT IS AN AUTOMATED SOFTWARE TESTING?

Software Test automation uses specialized tools for the execution of tests and comparison of the actual results against the expected result.

Testing tools are used to perform regression tests and to automate data set up generation, product installation, GUI interactions, defect logging.

#### 1.1	- Some Misconceptions about Automation Testing

There are some misconceptions about test automation:

**_Misconception #1._** Automation is here to replace manual testers.
Test automation is for helping the testers to make testing faster and in a more reliable manner. It can’t replace humans.
Automation testing is used to quickly test most of the repeated, long and boring tests and save time and energy to focus and test new and important functionality.

**_Misconception #2._** Everything under the sun can be automated
If you try to automate 100% of your test cases, maybe you will be able to do so, but if that you could do, then our first point becomes false. Actually the point is, you cannot automate 100% of your test cases. There will always be some scenarios which we will miss. There will always be bugs that come only when the application will be used by clients. Also, there are always scenarios which are difficult to automate and are easier to do manually.
So, we should automate those scenarios which are important and take a lot of time to do manually.

**_Misconception #3._** Automation only involves recording and playback. 
This misconception is actually created by false advertisements from different automation tool vendors. They say you just record and playback your steps and your test cases will be automated, which is a big lie!
Automation is everything but recording and playback. Pure automation engineers normally don’t use recording and playback feature at all. Recording and playback are generally used to get an idea how the tool is generating script for our steps. Once you get to know the scripting language, you’ll always use it to create automated tests

#### 1.2 - Why Automated Testing?

Manual testing should not be replaced by automation, but it is complemented by it. Like manual, automation also needs a strategy with proper planning, monitoring & control. If implemented correctly, automation can become an asset to the team, project and ultimately to the organization.

There are many advantages of automation and here are few important to mention:
+ Useful to execute the routine tasks like smoke tests and regression tests.
+ Useful in preparing the test data.
+ Helps to execute the test cases which involve complex business logic.
+ Good to execute the cross platform test cases (like different OS, browsers etc.)
+ Great to execute the test cases which are a bit difficult to execute manually.
+ Used when the number of iterations of the test case executions are not known.

There is only one way to increase the effectiveness, efficiency and coverage of testing – using automation. It will take less time and improves accuracy as repetitive tasks via manual approach can be prone to human errors and can be time consuming.

#### 1.3 – Manual to automated testing – what are the process challenges?

Below, you can find the points which are a challenge, when trying to automate a test suite. 
+	Management Support: Every test team is unique and has an exclusive need for automation. We cannot develop a fix standard, but we can tailor a standard which will suite our need.  But for this, automation needs to have a strong support from management and development team.
+	Which tests to automate: Automating 100% application is almost impossible. It requires proper planning and monitoring and of course; time. There should be available a strategy to automate, taking into consideration all the possible test scenarios. The strategy can be based on multiple factors like complex business logics, areas which are of more interest to clients, risk prone areas etc.
+	Deciding on the framework: Designing the framework is the most important facet of automation. We should invest more time to develop the framework than to script. Whenever we develop the automation plan, framework designing should be the main focus. If the framework is rock solid, scripting and maintaining becomes easy.
+	Knowledge of the team: When starting with automation, we intend to learn the programming language or scripting language. Learning the language will definitely help but more emphasis should be on building and developing logic. The entire team should be responsible for automation. This will help not only to enhance the skills of the team members, but also to keep them motivated.
+	Reporting: Every tool has a standard to report the test results. Reporting the test results also requires coordination and maintenance which adds to the cost.

## 2. TYPES OF AUTOMATED TESTS

When speaking of automation, we can refer to 5 types of automated tests

#### 2.1 - Unit Tests

**What is Unit Testing?**
+	is the process of validating the correctness of a small section of code. The code may be a method within a class, or entire group of components that are isolated from all or most of their dependencies. 
+	is usually performed by programmers
+	the code – is usually held in a separate project that contains a suite of tests for the target software.
 
**The goal of unit testing** 
+	to demonstrate that each individual part of a larger software development project works as intended.

**Benefits of using Unit tests**
+	unit tests find problems early in the development cycle. 
+	unit testing increases confidence that your code is behaving correctly. 
+	an automated unit test suite watches over your code in two dimensions - time and space: **in the time dimension** – unit test guaranties that the code you wrote works now and in the future: **in space dimension** - unit tests written for other features guarantee that your new code doesn’t break them; likewise it guarantees that code written for other features does not adversely affect the code you wrote for this feature. 
+	developers will be less afraid to change existing code.  Unit tests may ease the developers’ work when refactoring old code. In this way, they can add new features to software and retain the internal quality and clean design over time.
+	development process becomes more flexible. Running the unit tests containing some quick fixes for on the code is a good solution in revealing undesirable side-effects when being necessary to fix a problem and to deploy the fix quickly. 
+	an automated unit test suite reduces the need for manual testing. By running the unit tests automatically, QA team can concentrate discovering the hard-to-find bugs while the unit tests do most of the mundane testing.
+	it assists greatly with regression testing, as each time a change to the software is made, all previous unit tests can be executed, ensuring that no new bugs have been introduced.
+	Usually, unit tests are fast.

**Limitations**
+	There are some things that are difficult or time-consuming to unit test. One example is the user interface of your software. There are design patterns that minimize the amount of functionality in the user interface (UI) layer, allowing the code to exist separately from the graphical elements and making that code testable. This leaves a very thin layer of UI components that require an alternative testing approach.

#### 2.2 - Web Service / API Tests

**What is an API?**
+	an Application Programming Interface (API) makes it possible for software to talk to other software applications.
+	An API needs to be tested like all the other software applications. Usually we test the functionality, compliance and security issues. In web applications, we can test the Request and Response of our application that whether they are secure and encrypted or not.
+	is one of the areas highly recommended for automation testing, in DevOps world, agile development and continuous delivery cycles.

**Common kinds of API testing**
+	Functionality testing — the API technically works.
+	Usability testing — the API is easy to work with.
+	Reliability testing — the API can be consistently connected to and lead to consistent results.
+	Load testing — the API can handle a large amount of calls.
+	Creativity testing — the API can handle being used in different ways.
+	Security testing — the API has defined security requirements including authentication, permissions and access controls. 
+	Proficiency testing — the API increases what developers are able to do.
+	API documentation testing — also called discovery testing, the API documentation easily guides the user.

**Benefits of API testing**
+	Access to application without user interface – in this way testers will detect and recognize the errors early, instead of them becoming larger issues during GUI testing.
+	Protection from malicious code and breakage - API test requires specific conditions and inputs, which protects the application from malicious code and breakage. 
+	Time Efficiency vs. functional and validation testing - API testing is far way faster than functional GUI testing.. 
+	Cost Effective / Reduces Testing Cost - API test automation requires less code than GUI automated tests. They provide faster test results and better test coverage. 
+	Technology Independent - In an API test, the data is interchanged using XML or JSON and compromised of HTTP requests and responses. These all are technology independent and used for development. 

**Limitations**
+	No Encryption
+	Increasing Tooling needs
+	Straightforward reason for failing API is not known like it is for GUI 

#### 2.3 - Integration tests

**What is Integration testing?**
+	is a software development process which program units are combined and tested as groups in multiple ways. In this context, a unit is defined as the smallest testable part of an application. 
+	can expose problems with the interfaces among program components before trouble occurs in real-world program execution. 
+	takes smaller units of unit testing and tests their behavior as the whole.

There are two major ways of carrying out an integration test:
+	bottom-up method - begins with unit testing, followed by tests of progressively higher-level combinations of units called modules or builds.
+	top-down method - the highest-level modules are tested first and progressively lower-level modules are tested after that.

In a comprehensive software development environment, bottom-up testing is usually done first, followed by top-down testing.

Automated integration testing offers development teams the time to continue working on a product's development while being tested. Also, it is possible to run tests repeatedly and quickly, assuring that even small defects will be identified early enough for an effective fix.

**Benefits of the Integration Testing**
+	testing starts at the very early stages of development and bugs are caught earlier rather than late in the cycle.
+	confidence in the development cycle is high.
+	easy to integrate with daily builds and easy to test in development environment
+	tests run faster compared to end to end tests.
+	code coverage is higher and easy to track.
+	tests are more reliable and easy to isolate the failures.
+	integration tests catch system-level issues, such as a broken database schema, mistaken cache integration, and so on.
+	the application is tested in order to verify that it meets the standards set by the client as well as reassuring the development team that assumptions which were made during unit testing are correct.
+	integration testing doesn’t need to wait for all modules of a system being implemented. It can begin as soon as the relevant modules are available.
+	integration testing checks if the software modules work in unity.

**Limitations**
+	fault localization is difficult.
+	since all modules are tested at once, high risk critical modules are not isolated and tested on priority. Peripheral modules which deal with user interfaces are also not isolated and tested on priority.

#### 2.4 - GUI Tests

GUI’s are always highly affected by changes, and the testing subject is the user interface of an application. Thus they are also considered the toughest form of automated testing type. GUI testing is closest to what users will do with the application. So, these tests are benefic in finding bugs early and it can be used in many scenarios such as regression testing.

The most popular GUI testing tools are QTP (Now called UFT), Selenium WebDriver, Test Complete and Microsoft Coded UI (which is a part of Visual Studio ultimate and premium editions).

GUI testing assures that an application is implemented according to the specifications and it has the proper functionality of the user interface. 

In addition to functionality, GUI testing evaluates design elements such as layout, colors, fonts, font sizes, labels, text boxes, text formatting, captions, buttons, lists, icons, links and content. GUI testing processes can be either manual or automatic.

**Benefits of automated GUI testing**
+	Finding regression errors.
+	Test suite can be scheduled to run at any time
+	Detecting differences in behavior between platforms, i.e., Mac/Java versions, different web browsers, different operating systems.
+	Simulation of User Environment - GUI testing is one of the most time consuming and redundant procedures as the tester has to deploy the same methods in mock user environments and check for issues in the responsiveness of the GUI. With automated testing, this process becomes easy and time-saving

#### 2.5 - Security Tests

From an automation point of view, security tests can be categorized as follows:
+	**Functional Security Tests** - tests are focusing on security features such as authentication and logout, and testing that they work as expected.
+	**Specific non-functional tests against known weaknesses** - includes testing known weaknesses and miss-configurations such as lack of the HttpOnly flag on session cookies, or use of known weak SSL suites and ciphers.
+	**Security scanning of the application and infrastructure** -even manually driven penetration tests usually kick off with an automated scan using vulnerability scanning tools like Nessus, Burp and OWASP ZAP. Nessus tests an IP address and all exposed ports for known weaknesses. It also includes a “web” scanning component that will test HTTP services for similar known weaknesses, but the scanning at the web tier is extremely superficial. 
Burp Intruder (Commercial) and OWASP ZAP (Open Source) are focused on the web tier and are true application scanners in that they inspect and test at the HTTP layer by injecting attack data into parameters and evaluating the application’s response. They can provide in-depth security scanning if they’re used correctly. 
+	**Security testing application logic**
Automated tools can only go so far in detecting security flaws. To identify flaws in the logic of the application requires an  IT professional 
It requires ingenuity and experience to find, but once the attack is defined they too can be recorded as automated tests and become a part of the security regression tests.
When to run the tests
Since they’re automated, the cost of running the tests is very low, so naturally we’d want to fail fast and run them as early as possible. But security issues are typically found at the component level and are difficult to test at the unit/class level. So testing at the application tier should be done on a running application. In other words, at the same time as automated acceptance tests.

#### 2.6 - Performance Tests

**What is Performance testing?**
+	It is a type of non-functional testing.
+	Performance testing should determine how fast some aspect of a system performs under a particular workload or if the system really meets the corresponding performance criteria.
+	Is used for comparison between two systems to find which performs better. Or it can measure what part of the system or workload causes the system to underperform.
+	This process can involve quantitative tests done in a lab, such as measuring the response time or the number of MIPS (millions of instructions per second) at which a system functions.

**Benefits of performance testing**
+	Improve user experience on sites and web apps
+	Gather metrics useful for tuning the system
+	Identify bottlenecks such as database configuration
+	Determine if a new release is ready for production
+	Provide reporting to business stakeholders regarding performance against expectations

Performance testing tools are used on the system level testing, and they check how the system is impacted when reaching high limits. Load testing checks how the system reacts on its expected number of transactions. A volume testing checks how the system can reacts to a large amount of data, (many fields in a record, many records in a file, etc). A stress testing exceeds the normal expected the normal usage of the system (to see what would happen outside its design expectations), with respect to load or volume.

The purpose of the performance testing is to measure characteristics, such as response times, throughput or the mean time between failures (for reliability testing). This can be done in different ways depending on the tool, such as different user profiles, different types of activity, timing delays and other parameters. Adequately replicating the end-user environments or user profiles is usually key to realistic results.

If the performance is not up to the expected standard, then some analysis needs to be performed to see where the problem is and to know what can be done to improve the performance.

For a clear overview of all from above, you can find below a comparison table between the pointed automate tests:

| Unit Tests                  | API Tests                             | Integration Tests                       | 
| --------------------------- | ------------------------------------- | --------------------------------------- |      
| owned by development        | owned by test                         | owned by test, development              | 
| limited in scope            | broader in scope                      | tests the whole system working together | 
| fine grained                | fine grained                          | coarse grained                          |             
| mocked dependencies         | mocked and real dependencies          | real dependencies                       |
| stable                      | stable                                | can be brittle                          |
| "Does it work by itself'    | "does it play well with others"       | "does the system work"                  |
| usually run before check-in | pre-check-in suites                   | usually run after check-in to CI branch |
| run fast                    | run fast                              | can run slow                            |
| white box testing           | white box testing                     | black box testing                       |
|non-functional testing       | functional testing                    | functional testing                      |
| TESTNG, XUNIT               | REST ASSURED, SOAPUI, POSTMAN, FRISBY | JUNIT, SELENIUM                         |

| GUI egression tests)                        | Performance Tests                           | Security tests                   | 
| ------------------------------------------- | ------------------------------------------- | -------------------------------- |      
| owned by test                               | owned by development, test, customer        | owned by a separate team         | | maximum scope-catch many problems           | limited in scope                            | limited in scope                 | 
| complex business workflows                  | large system load                           | security indicators              |             
| real deies, real database                   | real dependencies, real database            | real dependencies, real database | | brittle (require more rework)               | stable                                      | can be brittle                   |
| "are the system's functionalities affected" | "does the system perform as expected"       | "is the system secure"           |
| run after check-in to CI/release branch     | run on release build and relevant hardware  | run against real environment     | 
| run slow                                    | run speed affected by load and resources    | run fast                         |
| black box testing                           | white box testing                           | black box testing                |
| functional testing                          | non-functional testing                      | non-functional testing           |
| SELENIUM                                    | JMETER, LOADRUNNER                          | BURP INTRUDER, OWASP ZAP         |               

**References**
-	http://www.blackwasp.co.uk/
-	https://www.codeproject.com/Articles/5404/The-benefits-of-automated-unit-testing
-	http://istqbexamcertification.com/
-	http://searchsoftwarequality.techtarget.com/definition/performance-testing
-	http://www.softwaretestinghelp.com/automation-testing-tutorial-2/ 
-	http://www.softwaretestinghelp.com/manual-to-automation-testing-process-challenges/ 
-	https://smartbear.com/learn/api-testing/what-is-api-testing/ 
-	http://www.tcognition.com/blog/exploring-benefits-api-testing/
-	https://alvinalexander.com/testing/automated-gui-testing-benefits-tools
-	https://devops.com/automated-security-testing-continuous-delivery-pipeline/
