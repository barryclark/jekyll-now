---
layout: post
title: 50 Shades Of Serverless In Java! (Part 1)
---

__TL;DR__; This post is the introl to a serie that will explore multicloud serverless development in coding in Java.

## What is serverless?

By far, it's the new buzz word of the moment, hence this blog post! If we want to be more descriptive we would say that a common definitions could be: an infrastructure that lets you build your application without managing any server and that is billed on a usage basis. This last part is important, it can be translated as: if you don't use it, then you don't pay for it.

This provides several advantages. First you do not manage the servers: you don't have to deal with provisioning, backups, restores etc... Secondly, it scales automatically: you usually deploy functions that are executed because they react to events... the infrastructure automatically support the scaling to hundreds and thousands of function instances.


## 50 shades?

The problem whith Serverless is that it comes in several flavors. Each vendor has its own ecosystem and its own way to build things. To be fair, let's say that Google was the first to create something that we could call serverless wiht AppEngine. At the beginning, you had to code in Java and cope with serious limitations like a very limited filesystem access. AWS then arrived in 2014 with the Lambda framework and their own constraints: you had to code in javascript or python and each lambda instance had a 5 minutes limited lifetime. Azure then introduced their Function framework. When coding an application, you may not want being limited to only one vendor. The idea behind this serie of blog post is to have a multicloud application that can run it those three environments (and more..... but not 50!)

## Why Java?

As the author of this post, I choose the programing language in which I'm the more productive. Ok, it's probably not the funkiest language on earth, it doesn't have monads natively or the generic typing system is not the best in the world but: it's strongly typed, has now a more than 20 years history, has an enormous ecosystem and..... it's fast! If you look at the latest framework like Quarcus that you can compile nativey, it totally compare to the new kids in town !

The real truth is that I'm working in a Java company, and the problem came to me: how can we build a complete serverless application in Java that we can run on various cloud vendors.

## The Application

As the challenge is not to build the best application we can, we will restrain the scope of the application to a basic CRUD (Create, Retrieve, Update, Delete). The application that we will code will just be an API that allows to manage Movies.


###  OpenAPI As Our Pivot

The strategy will be to start with the contract of the API. [OpenAPI](https://github.com/OAI/OpenAPI-Specification) specifies how to describe a REST API: it takes the form of a YAML document that defines every method and parameters of our API


```yaml
paths:
  /movie/:
    get:
      summary: "Get the list of movies"
      operationId: searchMovie
      description: |
        By passing in the appropriate options, you can search for
        available movies in the system
      parameters:
        - in: query
          name: searchString
          description: pass an optional search string for looking up movies
          required: false
          schema:
            type: string
      responses:
        '200':
          description: search results matching criteria
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Movie'
        '400':
          description: bad input parameter
```
The interest is that we can generate client library based on this specification but also server stubs and nice web playground. Our movie API can be found on [SwaggerHub](https://app.swaggerhub.com/apis/dmetzler/serverless-java/1.0.0.).


### Server stub generation

By using a [Maven plugin](https://github.com/swagger-api/swagger-core/tree/master/modules/swagger-maven-plugin), we can easily generate the server part.

```xml
<plugin>
  <groupId>io.swagger.codegen.v3</groupId>
  <artifactId>swagger-codegen-maven-plugin</artifactId>
  <version>3.0.0</version>
  <executions>
    <execution>
      <goals>
        <goal>generate</goal>
      </goals>
      <configuration>
        <!-- specify the swagger yaml -->
        <inputSpec>${project.basedir}/src/main/resources/swagger.yaml</inputSpec>
        <output>${project.basedir}</output>

        <!-- The same than jaxrs-jersey but uses Injection to find delegate-->
        <language>jaxrs-di</language>

        <modelPackage>org.dmetzler.serverless.model</modelPackage>
        <apiPackage>org.dmetzler.serverless.jaxrs</apiPackage>
        <generateApiTests>false</generateApiTests>
        <interfaceOnly>true</interfaceOnly>
        <configOptions>
          <dateLibrary>java8</dateLibrary>
          <java8>true</java8>
          <library>jersey2</library>
        </configOptions>
      </configuration>
    </execution>
  </executions>
</plugin>
```
[Original source code](https://github.com/dmetzler/50-shades-serverless-java/blob/master/serverless-movie-service/pom.xml#L35-L68)

When launching Maven, the Swagger Codegen plugin will then generate all the needed source code in `src/gen/java` and include it in the compile scope. Swagger just generates all our JAX-RS resource and _delegates_ all the calls to a delegatee. We are in charge of coding that delegatee. To link this API to the actual implementation, the Swagger template that we use (jaxrs-di), makes use of dependency injection.

```java
   @javax.inject.Inject
   public MovieApi(MovieApiService delegate) {
      this.delegate = delegate;
   }
```


### A Simple Web Application

When Bootstraping our JAX-RS application, we will have to configure the dependency injection mechanism so that it can resolve the `MovieApiService` implementation that we want.

```java
public class MovieApiServiceImpl implements MovieApiService {

    @Inject
    protected MovieDao dao;

    @Override
    public Response addMovie(Movie body, SecurityContext securityContext)  {
        Movie movie = dao.saveMovie(body);
        return Response.ok().entity(movie).build();
    }

...
```

Based on the the Cloud provider possibilities: DynamobDB for AWS, FireStore for Google Cloud, we will also bind the DI mechanism to the correct implementation of the `MovieDAO`. For the sake of local testing, the project also provides a `MemoryDao` that stores movies in memory. It will allow to test the service in a simple Webapp. For that we will create a simple WAR maven project that will configure a the JAX-RS application thru a `MovieServiceApplication` class.

```java
@ApplicationPath("/")
public class MovieServiceApplication extends ResourceConfig {

    public static class MovieServiceBinder extends AbstractBinder {

        @Override
        protected void configure() {
            bind(MovieApiServiceImpl.class).to(MovieApiService.class).in(Singleton.class);
            bind(MemoryMovieDao.class).to(MovieDao.class).in(Singleton.class);
        }

    }

    public MovieServiceApplication() {
        register(MovieServiceBinder.class, CustomJacksonFeature.class);
        packages("org.dmetzler.serverless.jaxrs");
    }
}
```

We use here the Jersey `ResourceConfig` class to configure the application. The `MovieServiceBinder` class configure the dependency injection mecanism using the integrated HK2 library of Jersey. We simply bind the requires API to their implementation. Then we tell Jersey to scan the `org.dmetzler.serverless.jaxrs` package to find all our JAX-RS resources.

After that we can simply start our web application using the Maven Jetty plugin or deploying the WAR in a Servlet container.

```
# mvn clean install
# cd serverless-movie-service-webapp
# mvn jetty:run
```
and in another terminal window:

```
# curl http://localhost:8080/movie/ -v
*   Trying ::1...
* TCP_NODELAY set
* Connected to localhost (::1) port 8080 (#0)
> GET /movie/ HTTP/1.1
> Host: localhost:8080
> User-Agent: curl/7.54.0
> Accept: */*
>
< HTTP/1.1 200 OK
< Date: Wed, 26 Jun 2019 16:17:12 GMT
< Content-Type: application/json
< Content-Length: 3
< Server: Jetty(9.4.19.v20190610)
<
* Connection #0 to host localhost left intact
[]%
```

## What Have We Done So Far?

In this simple post, we have done two things. The first one was to define the API contract of our application and a very simple business logic. This was done in Java, with no constraint on the running environment and no dependency on any Cloud provider. The second one was using this first project to create a single webapp that we can run in every servlet container that support JAX-RS2.

This settles the basis of our study. We will now use that base code to deploy our API in several cloud providers like AWS, Google Cloud, Azure and even more.

All the code exposed here is accessible on Github: [https://github.com/dmetzler/50-shades-serverless-java]()

## References:

 - Sample code: [https://github.com/dmetzler/50-shades-serverless-java]()
 - OpenAPI: [https://github.com/OAI/OpenAPI-Specification]()
 - SwaggerHub: [https://app.swaggerhub.com]()
 - Java EE 7 and JAX-RS 2.0 by Adam Bien: [https://www.oracle.com/technetwork/articles/java/jaxrs20-1929352.html]()

