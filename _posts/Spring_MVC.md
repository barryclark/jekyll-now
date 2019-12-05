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

Think of ***Spring MVC Servlet*** as a host kind of like a server. It does not do as much as a server such as processing data, but it saves the context (like singleton objecs/beans) and host the section of Http requests. Examples of servlet tools include ***tomcat and thymeleaf***.
        
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
***The messages in Exceptional Handlers should only be seen when exceptions happen. They should not be inserted into views.***

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

4. REST vs SOAP are not really comparable. REST is an architectural style. SOAP is a message exchange format.

5. The differences among making HTTP requests:

	* REST is built over simple HTTP protocol. SOAP services are more complex to implement and more complex to consume.
	* REST has better performance and scalability. REST reads can be cached, SOAP based reads cannot be cached.
	* REST permits many different data formats (JSON is the most popular choice) where as SOAP only permits XML.
	*SOAP services have well defined structure and interface (WSDL) and has a set of well defined standards (WS-Security, WS-  	 AtomicTransaction and WS-ReliableMessaging). Documentation standards with REST are evolving(We will use Swagger in this course).

***Example to compare REST & SOAP API : https://raygun.com/blog/soap-vs-rest-vs-json/***

#### SOAP ####
SOAP was earlier an abbreviation for Simple Object Access Protocol. In SOAP, the request and response are in XML format. However, not all types of XML are valid SOAP Requests.

Example:
```
<?xml version = "1.0" encoding = "ISO-8859-1" ?>

<!DOCTYPE taglib
        PUBLIC "-//Sun Microsystems, Inc.//DTD JSP Tag Library 1.2//EN" "http://java.sun.com/dtd/web-jsptaglibrary_1_2.dtd">

<taglib>
    <tlib-version>1.0</tlib-version>
    <jsp-version>1.2</jsp-version>
    <short-name>homework</short-name>
    <uri>http://tomcat.apache.org/homework-taglib</uri>
    <description>Say hello</description>

    <tag>
        <name>homework</name>
        <tag-class>com.improving.bootcamp.HomeworkTag</tag-class>
        <body-content>empty</body-content>
        <attribute>
            <name>name</name>
            <required>true</required>
            <rtexprvalue>true</rtexprvalue>
        </attribute>
```
***this is not a SOAP example. The <tag> </tag> part looks like a WSDL.But it is not a SOAP***

#### RESTFUL ####
First of all, REST does not define a standard message exchange format. You can build REST services with both XML and JSON. However, JSON is a more popular format with REST. Key abstraction in REST is a Resource. There is no restriction on what can be a resource. 

* Restful Service Constraints
	* Client - Server : There should be a service producer and a service consumer.
	* The interface (URL) is uniform and exposing resources. Interface uses nouns (not actions)
	* The service is stateless. Even if the service is called 10 times, the result must be the same.
	* The service result should be Cacheable. HTTP cache, for example.
	* Service should assume a Layered architecture. Client should not assume direct connection to server - it might be getting info 
	from a middle layer - cache.


***Using "getting books" as an example***
![Books api](https://github.com/EmilyStacy-droid/EmilyStacy-droid.github.io/blob/master/images/IMG-5296.JPG)

Example:
```
package com.improving.bootcamp.api;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import com.improving.bootcamp.Book;
import com.improving.bootcamp.BookRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class SimpleAPIController {

    private final BookRepository bookRepository;

    public SimpleAPIController(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @JsonView(JsonViews.SummaryView.class)
    @GetMapping("/books")
    public List<Book> books(){
        return bookRepository.getBooks();

    }

    @JsonView(JsonViews.DetailsView.class)
    @GetMapping("/book/{id}")

    public Book book (@PathVariable int id){
        return bookRepository.getBook(id);
    }

    @PutMapping("/book")
    @ResponseStatus(HttpStatus.CREATED)
    public Book addBook(@RequestBody Book book) {
        bookRepository.add(book);
        return book;
    }


    @ExceptionHandler(MethodArgumentNotValidException.class)

    public ResponseEntity<?> errorHandler(MethodArgumentNotValidException e) {
        Map<String, String> errors = new HashMap<>();

        e.getBindingResult().getFieldErrors().forEach(fieldError->
                errors.put(fieldError.getField(), fieldError.getDefaultMessage())
                );

        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

}


```

* The maturity model:
Richardson Maturity Model

Richardson Maturity Model defines the maturity level of a Restful Web Service. Following are the different levels and their characteristics.
1. Level 0 : Expose SOAP web services in REST style. Expose action based services (http://server/getPosts, http://server/deletePosts, http://server/doThis, http://server/doThat etc) using REST.
2. Level 1 : Expose Resources with proper URI’s (using nouns). Ex: http://server/accounts, http://server/accounts/10. However, HTTP Methods are not used.
3. Level 2 : Resources use proper URI’s + HTTP Methods. For example, to update an account, you do a PUT to . The create an account, you do a POST to . Uri’s look like posts/1/comments/5 and accounts/1/friends/1.
4. Level 3 : HATEOAS (Hypermedia as the engine of application state). You will tell not only about the information being requested but also about the next possible actions that the service consumer can do. When requesting information about a facebook user, a REST service can return user details along with information about how to get his recent posts, how to get his recent comments and how to retrieve his friend’s list.

#### Change environment port on Spring MVC ####
https://www.baeldung.com/spring-boot-change-port

#### OAuth ####
#### Servlet ####
#### JSP and Tags in JSP ####
Legacy 
####  Authentication (knowing who you are) v.s. Authorization (what people can do) ####

#### Blocking v.s. Unblocking ####

The term, “reactive,” refers to programming models that are built around reacting to change — network components reacting to I/O events, UI controllers reacting to mouse events, and others. In that sense, non-blocking is reactive, because, instead of being blocked, we are now in the mode of reacting to notifications as operations complete or data becomes available.
There is also another important mechanism that we on the Spring team associate with “reactive” and that is non-blocking back pressure. In synchronous, imperative code, blocking calls serve as a natural form of back pressure that forces the caller to wait. In non-blocking code, it becomes important to control the rate of events so that a fast producer does not overwhelm its destination.




