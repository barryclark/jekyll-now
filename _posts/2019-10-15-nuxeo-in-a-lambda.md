---
layout: post
title: An Experiment - Would Nuxeo Fit In A Lambda
excerpt: |
  A silly exploratory experience that leads to being able to run a Nuxeo repository in a Lambda
img_url: /images/2019-10-15-nuxeo-in-lambda.png
img_credits: Photo by <a href="https://unsplash.com/@lightninghorse">AJ Yorio on Unsplash</a>
---

Inception
=========

While playing recently with serverless technologies and Java, it came to my mind a very stupid idea: could we run Nuxeo in a Lambda? Why would I want that?

There are numerous situations when you may need light access to the document repository, just to get a document and do something quickly with it. Imagine for instance an external workflow engine that just needs to pull and push some metadata when the process is evolving. Or let's be even more creative, validating at the edge of Cloudfront that a user has valid access to a document's binary, another one could be to attach a binary to a document (or create it) once the binary has been directly uploaded to an S3 bucket.

So being able to access the repository directly from a lambda (and not by the REST API) could make sense in those scenarios.

To give a rough idea of the challenge, a genuine Nuxeo distribution takes approximatively 25s to start on a server. Loaded with plugins, it's more around 50-60s. But at the same time, our test framework can start a Nuxeo `CoreSession` in less than one second which gives us some room for improvement.

So I decided that this idea was not so crazy and thought about the acceptance criteria of that challenge. And of course it all start with a test:

```java
DocumentModel doc = session.createDocumentModel("/", "test", "Folder");
doc.setPropertyValue("dublincore:title", "Test");
doc = session.createDocument(doc);
session.save();

DocumentModel doc = session.getDocument(new PathRef("/test"));
assertThat(doc).isNotNull();
assertThat(doc.getPropertyValue("dublincore:title")).isEqualTo("Test");
```

The idea is to make that test pass with a `session` object that is brought by the environment. We want the whole test to happen in an order of a few milliseconds, including the `CoreSession` instantiation.


Static Vs Dynamic configuration
===============================

My initial thoughts were to use the same idea as the test framework, i.e. mounting a `CoreSession` by reusing the same kind of mechanism and launching only a given set of OSGi bundles. This has the advantage to be quite fast to implement and compatible with everything we have at Nuxeo.

The problem is that as soon as you add more and more components, then the runtime takes longer to start. And I want a quasi constant startup time. Moreover, all extensions are written in XML, so at startup, Nuxeo does a lot of I/O and XML parsing to get its configuration. This slows down the startup a lot, we should try to get rid of that.

So, Nuxeo Runtime is an awesome solution when you have a long-running process and that you don't care a lot about the startup time. However, if we want to start faster, we have to envision getting rid of it. Nuxeo Runtime brings two things to the table: the service model and the extensions mechanism. If we want to be able to get rid of it, we'll also have to cope with their absence.

As we lose the extension model that provides dynamic configuration, we'll have to cope with the static configuration at the beginning (choosing a static set of schemas and doctypes). We also lose the usage of `Framework#getService()` which means that we'll have to find more traditional solutions to build our services.

The strategy then becomes: copy the Nuxeo core modules into one new Java Maven project and do not put any dependency on Nuxeo Runtime! Simple!

Ready, Set Go!... And Step By Step
==================================
To get rid of Nuxeo Runtime, I can simply copy paste the Nuxeo Core module and remove all dependencies to `nuxeo-runtime` Maven artifact. That ends up by having a beautiful Maven project.... that does not compile.

The first thing to build is a `Repository`. As extensibility is not on my feature list, I decided to choose MongoDB as my first implementation and started from there. If you look at the [original version of the MongoDBRepository](https://github.com/nuxeo/nuxeo/blob/master/nuxeo-core/nuxeo-core-storage-mongodb/src/main/java/org/nuxeo/ecm/core/storage/mongodb/MongoDBRepository.java#L175), there are some call to `Framework.getService()`. As we don't have `Framework` anymore, I simply added the needed dependency to the constructor and stored the dependency as a transient field.

After looping a few times on that process, I needed an instance of the `SchemaManager`. As it was expected I have to programmatically build it with a few determined, static schema and document types. After a few iterations, I eventually managed to get an instance of a MongoDB repository:

```java
RepositoryFactory repositoryFactory = new MongoDBRepositoryFactory(repoName,
                mongoComponent.getDatabase("default"), schemaManager, mock(DocumentBlobManager.class));

org.nuxeo.ecm.core.api.repository.Repository repo = new org.nuxeo.ecm.core.api.repository.Repository("default",
        "default", true, repositoryFactory);

RepositoryManager rm = new RepositoryManagerImpl();
rm.addRepository(repo);

RepositoryService rs = new RepositoryService(rm);
rs.doCreateRepositories();
Repository repository = rs.getRepository("default");

```

As a side effect, I also had to remove the inheritance of the `SchemaManager` from `DefaultComponent`. The class then becomes more a *schema configuration holder* than a manager of schemas. The descriptors that it holds are the state of the schema configuration. Keep that in mind for later as it will be very interesting.

When connecting to Mongo I was able to check that the `Root` document had been created:

```console
> db.default.find()
{ "_id" : ObjectId("5da164dbd607bc19d9c2206d"), "ecm:name" : "", "ecm:acp" : [ { "name" : "local", "acl" : [ { "perm" : "Everything", "grant" : true, "user" : "administrators" }, { "perm" : "Everything", "grant" : true, "user" : "Administrator" }, { "perm" : "Read", "grant" : true, "user" : "members" } ] } ], "ecm:racl" : [ ], "ecm:primaryType" : "Root", "ecm:id" : "00000000-0000-0000-0000-000000000000", "ecm:changeToken" : NumberLong(0) }
```


You're Halfway Thru: Continue!
==============================

Initializing the repository created the `Root` document, but in order to create more, I need a `CoreSession`! Basically, the code that I need to make work is the following:

```java
Repository repository = getRepository("default", getSchemaManager());
CoreSessionService css = new CoreSessionServiceImpl()
try (CloseableCoreSession session = css.createCoreSession(repository, principal)) {

  ...
}
```

The `CoreSessionService`  is responsible for creating a `LocalSession` that requires lots of dependencies: the `SecurityService`, the `VersioningService` or the `LifecycleService` etc... We can see some of the dependencies in the [original `AbstractSession`](https://github.com/nuxeo/nuxeo/blob/master/nuxeo-core/nuxeo-core/src/main/java/org/nuxeo/ecm/core/api/AbstractSession.java#L168-L178), but there are more than that.

So, like the `MongoDBRepository`, I removed all the call to `Framework.getService()` and replaced them as needed parameters in the constructor of the class. Instead of adding numerous parameters to the constructor, I heavily used the `Builder` pattern for most of them.

In the end, we can create a `CoreSessionService` with the following code:

```java
CoreSessionService css = CoreSessionServiceImpl.builder()
  .eventService(mock(EventService.class))
  .securityService(new SecurityService())
  .versioningService(mock(VersioningService.class))
  .documentValidationService(mock(DocumentValidationService.class))
  .charFilteringService(mock(CharacterFilteringService.class))
  .trashService(mock(TrashService.class))
  .lifeCycleService(mock(LifeCycleService.class))
  .coreService(new CoreService())
  .build();
```


A lot of services are mocked but, after iterating again on removing the calls to `Framework.getService()`, I managed to instantiate a `CoreSession` and guess what? I was able to create my first document!

What Is Not Working?
====================
I did a lot of shortcuts in this project. So there are entire feature of Nuxeo that are not working yet.

First of all, the project does not compile! To make some experiment, you have to load it into an IDE and run the test, as the IDE allows to run some parts of the code even if the whole repo is not compiled.

I also took the liberty to comment on some parts of the code that I did not find super important for that exercise. So some features may, of course, be missing.

As explained before, a lot of services have been mocked, meaning that they don't' do anything! The most important is the `EventService` which is responsible for lots of things in Nuxeo: like setting the dublincore properties automatically or launching the ElasticSearch indexation.

Oh, by the way, we lost every possibility to extend our repository as we do not have extension points. I did not mention that some parts of the code do not even compile! I'm currently not able to package my code... so it doesn't run in a Lambda yet.

What Is Interesting?
====================

One of the things I learned is that in the end, there are not a lot of needed dependencies to instantiate a `CoreSession` and the ones that are listed above just totally make sense. Implementing them with the same method should not be too difficult except for the `EventService` that we may want to separate... Except that most of the time listeners need to be synchronous.

Do you remember that I said that the `SchemaManager` was now just holding schema configuration? It could even become serializable! And if it is serializable that means that we can store its state somewhere... like in a database, a KV store or a Studio service. It would then be super easy to link a schema configuration to a repository at runtime, and even change the schema without having to restart our repository runtime!

I even think that if it's true for the `SchemaManager`, there is a lot of chance that the dependent services are just holding configuration which could also be serialized. That would solve our static configuration problem! We could even have a Nuxeo Runtime starting just once to read the configuration that is in a bundle and serialize it in a DB to be readable by our lambda.

Allowing our `RepositoryService` to load several configurations would open the door to a truly multitenant repository service.

Is It Fast?
===========

It is difficult to run some benches whit this code. However, instead of creating only one document, I looped and created 1000 of them. It took 3s on my laptop to run the test which makes an average of 333 doc/s. This does not mean anything though as we do not have any listener enabled.
However, it runs in one single thread, meaning that we can probably parallelize the process to increase the throughput. At some point, MongoDB will become the bottleneck.

Conclusion
==========

This experience was interesting. Of course it looks like a really dangerous stunt, as removing Nuxeo Runtime was probably not the easiest approach. Going down this path also means that you get rid of all future evolutions of the Nuxeo platform, so it's not to be considered for future production use!

However, it opens the door to a lot of new possibilities: for instance, I'm persuaded that it helped to build the dependency tree and separate the different concerns in the code. This allowed me to see that the configuration can be serialized and then be loaded faster.

It still doesn't run in Lambda as there are parts that are still not compiling, but the test is enough to me in order to prove the feasability of it.

Loading faster, executing faster, then the bottleneck becomes the DB. On Amazon there is an alternate DB that scales to billions of documents, it's DynamoDB. That would be a nice experience being able to implement a simple DynamoDB backend for this micro-repo.

In the future, I think I will continue playing with this. The various work area could be:

 * Making it compile to be able to really run in a lambda
 * Finding a pattern for the EventService so that we can implement synchronous listener in an external micro service (gRPC and protobuf could help)
 * Plugging a Binary Manager
 * Replug Metrics :-)
 * Use my [nuxeo-dsl](https://github.com/dmetzler/nuxeo-dsl/) project to configure the schema manager
 * Use the GraphQL API in the same project
 * Do the same exercise with Nuxeo Runtime.

Stay tuned!

References
==========

 * The project on Github: [https://github.com/dmetzler/micro-repo](https://github.com/dmetzler/micro-repo)
 * [The working test](https://github.com/dmetzler/micro-repo/blob/master/micro-nuxeo-core/src/test/java/org/nuxeo/micro/RepositoryManagerTest.java#L96-L134)
