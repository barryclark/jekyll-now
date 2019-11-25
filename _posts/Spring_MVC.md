---
Category: post
title: Learning Journal for Spring  MVC keywords
---
## What is MVC?
1.	MVC = Model view controller
2.	The MVC concept has been used in many frameworks
3.	It is used to build on Servlet API

### MVC definition from website resources

Model–View–Controller (usually known as MVC) is a software design pattern commonly used for developing user interfaces which divides the related program logic into three interconnected elements. This is done to separate internal representations of information from the ways information is presented to and accepted from the user. Following the MVC architectural pattern decouples these major components allowing for code reuse and parallel development.

1.Model
The central component of the pattern. It is the application's dynamic data structure, independent of the user interface. It directly manages the data, logic and rules of the application.

2.View
Any representation of information such as a chart, diagram or table. Multiple views of the same information are possible, such as a bar chart for management and a tabular view for accountants.

3.Controller
Accepts input and converts it to ***commands for the model or view***. The view is never directly processed in MVC
 
### What is Servlet API? Definition from the website resources 

* The javax.servlet and javax.servlet.http packages represent interfaces and classes for servlet api.
* The *** javax.servlet *** package contains many interfaces and classes that are used by the servlet or web container. These are not specific to any protocol.
* The *** javax.servlet.http *** package contains interfaces and classes that are responsible for http requests only.

        
### Concepts in Spring MVC ###

#### Exception Handler ####

1.Set a route for exceptions under *Controller*

```
	@GetMapping("/teapot")
public String teapot(){
    throw new TeapotException();
}


```

OR
```
@GetMapping("/bad")
    public String badRequest(){
        throw new RuntimeException("Something went wrong");
    }

```
2.Use Intercepters to handle the exception
```
@ExceptionHandler (TeapotException.class)
@ResponseStatus(HttpStatus.I_AM_A_TEAPOT)
    public String exceptionHandler(Model model, TeapotException t){
    model.addAttribute("errorMessage", t.getMessage());
    return "error";

}


```
And then override the message with a specific class
```
@ResponseStatus(HttpStatus.I_AM_A_TEAPOT)
public class TeapotException extends RuntimeException {
public TeapotException(){
    super("I am a teapot!"); //set up a message
}

```
OR setting a general error message

```
@ExceptionHandler (Exception.class)
@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)

public String exceptionHandler(Model model, Exception e){
    model.addAttribute("errorMessage", e.getMessage());
    return "error";
}

```
***Question: Does this handler need to be inserted into HTML pages? It looks like model is independent from the UI. If so, what are the error messages for?***

#### Intercepter ####
Definition from the website resources:
Interceptors working with the HandlerMapping on the framework must implement the HandlerInterceptor interface.
* In order to use HandlerIntercpetor, dependencies like below is required
   *'org.springframework.boot:spring-boot-starter-web'

* This interface contains three main methods:
  * prehandle() – called before the actual handler is executed, but the view is not generated yet
  * postHandle() – called after the handler is executed
  * afterCompletion() – called after the complete request has finished and view was generated
  
   #### REST v.s. SOAP API ####
*Content from https://www.springboottutorial.com/introduction-to-web-services-with-soap-and-rest*
1.	If a page can only show the end users the information, it is not a web service, but a *web application*
2.	The definition of WEB SERVICE: ***Software system designed to support interoperable machine-to-machine interaction over a network***
3.	How can services/ applications talk to each other?
***They should be standard formats so that they can be used with varied kind of platforms. JSON and XML are quite popular Data Exchange formats.***

####SOAP####
SOAP was earlier an abbreviation for Simple Object Access Protocol. In SOAP, the request and response are in XML format. However, not all types of XML are valid SOAP Requests.


####RESTFUL####
First of all, REST does not define a standard message exchange format. You can build REST services with both XML and JSON. However, JSON is a more popular format with REST. Key abstraction in REST is a Resource. There is no restriction on what can be a resource. 

* Restful Service Constraints
•	Client - Server : There should be a service producer and a service consumer.
•	The interface (URL) is uniform and exposing resources. Interface uses nouns (not actions)
•	The service is stateless. Even if the service is called 10 times, the result must be the same.
•	The service result should be Cacheable. HTTP cache, for example.
•	Service should assume a Layered architecture. Client should not assume direct connection to server - it might be getting info from a middle layer - cache.

* The maturity model:
Richardson Maturity Model
Richardson Maturity Model defines the maturity level of a Restful Web Service. Following are the different levels and their characteristics.
•	Level 0 : Expose SOAP web services in REST style. Expose action based services (http://server/getPosts, http://server/deletePosts, http://server/doThis, http://server/doThat etc) using REST.
•	Level 1 : Expose Resources with proper URI’s (using nouns). Ex: http://server/accounts, http://server/accounts/10. However, HTTP Methods are not used.
•	Level 2 : Resources use proper URI’s + HTTP Methods. For example, to update an account, you do a PUT to . The create an account, you do a POST to . Uri’s look like posts/1/comments/5 and accounts/1/friends/1.
•	Level 3 : HATEOAS (Hypermedia as the engine of application state). You will tell not only about the information being requested but also about the next possible actions that the service consumer can do. When requesting information about a facebook user, a REST service can return user details along with information about how to get his recent posts, how to get his recent comments and how to retrieve his friend’s list.



