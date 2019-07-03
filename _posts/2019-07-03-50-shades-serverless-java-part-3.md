---
layout: post
title: 50 Shades Of Serverless In Java! (Part 3)
excerpt: |
  In this third part, we will deploy our JAX-RS application in Google Appengine and use Google Datastore for storage.
img_url: /images/2019-07-03-Google.png
img_credits: Photo by <a href="https://unsplash.com/@pawel_czerwinski">Paweł Czerwiński on Unsplash</a>
---


In [part1]({% post_url 2019-06-25-50-shades-serverless-java-part-1 %}) and [part2]({% post_url 2019-06-30-50-shades-serverless-java-part-2 %}) of this series, we created a small web application and deployed it in AWS lambda.

In this third part, we will take the same JAX-RS application and deploy it in Google Cloud. For that purpose, we will use Google AppEngine and use Google Datastore as a storage mechanism for our Movie objects.


## Google App Engine

Google App Engine appeared in April 2008, and as a result, is by far the first Serverless application infrastructure. It existed even before the Serverless word appeared for the first time.

As with most Serverless environments, GAE imposes some constraints on the application. Those restrictions totally make sense in a Serverless environment, but back in 2008 they were seen as very strong limitation like:

 * read-only access to filesystem
 * no background work or Cron
 * request execution limited to 60 seconds

More than ten years later, GAE is still there and is a very strong and resilient platform when you want to build a serverless application.

## Wiring Up Components

GAE is able to deploy Java web applications from the beginning. As we chose to use JAX-RS, it is then super simple to deploy it as a simple War. As for the Web application e will use HK2 for the injection mechanism and bind the storage mechanism:

```java
@ApplicationPath("/")
public class MovieServiceApplication extends ResourceConfig {

    public static class MovieServiceBinder extends AbstractBinder {

        @Override
        protected void configure() {
            bind(MovieApiServiceImpl.class).to(MovieApiService.class);
            bind(DataStoreMovieDao.class).to(MovieDao.class).in(Singleton.class);
        }
    }

    public MovieServiceApplication() {
        register(new MovieServiceBinder());
        packages("org.dmetzler.serverless.jaxrs");
    }
}
```

Nothing really changes, and we just changed the `MovieDao` implementation to `DataStoreMovieDao` instead of the in-memory instance.

## Testing Our Application

In order to test the `DataStoreMovieDao` implementation, we can use some [utility classes](https://cloud.google.com/appengine/docs/standard/java/tools/localunittesting) available to locally test Google Datastore.

```java
public class DataStoreMovieDaoTest extends AbstractMovieDaoTest {
    private final LocalServiceTestHelper helper = new LocalServiceTestHelper(new LocalDatastoreServiceTestConfig());

    @Before
    public void doBefore() {
        super.doBefore();
        helper.setUp();
    }

    @After
    public void tearDown() {
        helper.tearDown();
    }

    @Override
    protected MovieDao getMovieDao() {
        return new DataStoreMovieDao();
    }
}

```

As we can see, it's really easy to set this up and reuse our `AbstractMovieDaoTest`. If you take a look at the code of [`DataStoreMovieDao`](https://github.com/dmetzler/50-shades-serverless-java/blob/master/serverless-movie-service-appengine/src/main/java/org/dmetzler/serverless/service/impl/DataStoreMovieDao.java), the code is really stupid and not optimized, so do not copy it. The intent of this series is not to explore Google Datastore, but more to see how to port an application to various cloud vendors hence the very inefficient implementation.

If we want to test the endpoint of our API, we could use tools like [Arquilian](http://arquillian.org/) as it is a standard Java web application. GAE provides also a Maven plugin that allows running the application as if it was in GAE. For instance:

```console
# maven appengine:run
...
# curl http://localhost:8080/movie/
[]
# curl -X POST "http://localhost:8080/movie/"  \
     -H "accept: application/json" -H "Content-Type: application/json" \
     -d '{"id":"d290f1ee-6c54-4b01-90e6-d701748f0851","title":"The Big Lebowski", "releaseDate":"1998-03-06", "director":{"firstname":"Ethan","lastname":"Cohen"}, "actors": [{"firstname":"Jeff", "lastname":"Bridges"}, {"firstname":"John", "lastname":"Goodman"}]}'
{
  "id" : "d290f1ee-6c54-4b01-90e6-d701748f0851",
  "title" : "The Big Lebowski",
  "releaseDate" : "1998-03-06",
  "director" : {
    "firstname" : "Ethan & Joel",
    "lastname" : "Cohen"
  },
  "actors" : [ {
    "firstname" : "Jeff",
    "lastname" : "Bridges"
  }, {
    "firstname" : "John",
    "lastname" : "Goodman"
  } ]
}
# curl http://localhost:8080/movie/
[ {
  "id" : "d290f1ee-6c54-4b01-90e6-d701748f0851",
  "title" : "The Big Lebowski",
  "releaseDate" : "1998-03-06",
  "director" : {
    "firstname" : "Ethan & Joel",
    "lastname" : "Cohen"
  },
  "actors" : [ {
    "firstname" : "Jeff",
    "lastname" : "Bridges"
  }, {
    "firstname" : "John",
    "lastname" : "Goodman"
  } ]
} ]
```

## Deploy Our Application

Once your project is set up in the Google Cloud console, it's super easy to deploy the application in the Cloud:

```console
# mvn appengine:deploy -Dapp.deploy.projectId=myproject -Dapp.deploy.version=5
```

The Maven AppEngine plugin takes care of the deployment from A to Z. There is no particular setup to do on Google Datastore and the `Movie` table is created the first time it is used. The application will then be ready at the target URL specified in the deploy logs, something like `https://mygooglecloudproject.appspot.com`.

```console
# curl https://mygooglecloudproject.appspot.com/movie/
[]
# curl -X POST "https://mygooglecloudproject.appspot.com/movie/"  \
     -H "accept: application/json" -H "Content-Type: application/json" \
     -d '{"id":"d290f1ee-6c54-4b01-90e6-d701748f0851","title":"The Big Lebowski", "releaseDate":"1998-03-06", "director":{"firstname":"Ethan","lastname":"Cohen"}, "actors": [{"firstname":"Jeff", "lastname":"Bridges"}, {"firstname":"John", "lastname":"Goodman"}]}'

...
```
We can see the Movie entity being added to Google Datastore.

![Google Datastore](/images/2019-07-03-google-datastore.png)

That's it, we've been able to start our web app in Google Cloud without having to manage any server or DB by ourselves.

## Conclusion

As GAE was built from the beginning as a platform allowing to deploy Java web applications, it was relatively easy to deploy our own, just by binding the abstractions to the right implementations. The platform is mature, and provides several integration to cloud tools like storage, messaging, streaming etc...

Again, having coded abstraction and their expected behavior as tests in the first web application project, allowed us to rapidly implement and test the `DataStoreMovieDao`. If you want to build multi-implementation application, that is something that you should not avoid.

Even if Google has the equivalent of Lambda with Cloud Functions, GAE is the choice to make when one wants to build a full web API: it acts like a real webapp and can take several request in parallel for instance. The more than 10 years of experience is also really strong advocate when you want a resilient platform.

## References

 * Code of this part: [https://github.com/dmetzler/50-shades-serverless-java/tree/master/serverless-movie-service-appengine]()
 * Google App Engine: [https://cloud.google.com/appengine/]()
 * Unit testing GAE: [https://cloud.google.com/appengine/docs/standard/java/tools/localunittesting]()
 *