---
layout: post
title: Building A Nuxeo Component (an opinionated way)
excerpt: |
  Nuxeo embraced SOA since its inception. Component are the base of Nuxeo and we often need to build some when wanting to introduce new features. This post exposes my way of building Nuxeo component in 2019.
img_url: /images/2019-09-16-building-component.png
img_credits: Photo by <a href="https://unsplash.com/@randyfath">Randy Fath on Unsplash</a>
---

The Nuxeo Platform was designed from the beginning to be a Service Oriented Platform. We embraced [SOA](https://en.wikipedia.org/wiki/Service-oriented_architecture) from the beginning and that's one of the reasons why it's so easy to do calls like `Framework.getService(MyService.class)` from every part of the code in Nuxeo.

We definitely love doing pluggable services, and when we want to introduce a new feature, our DNA asks us: what extension point and what service can we provide? Throughout the years, even the runtime part of the platform has evolved and it's now even easier to implement a new component.

In this article, I will expose how I now build Nuxeo components and what pattern I like to use and why. This is my own way to do it in September 2019. It is always evolving, so perhaps in two years I will call it crap. You've been warned!

Someone Needs Access Tokens
===========================

To illustrate how we can create a component, we will take the example of a service providing OAuth2 Tokens for the client credentials flow. It's quite simple and just requires the IDP url, a `clientId`, a `clientSecret` and a scope. We want to be able to call our service like this in the platform:

```java
AccessTokenProvider provider = Framework.getService(AccessTokenProvider.class);
byte[] accessToken = provider.getToken(myIPD);
```

Let's first create our Nuxeo project using the [Nuxeo CLI](https://doc.nuxeo.com/nxdoc/nuxeo-cli/).

```
# mkdir nuxeo-oauth-client-credentials
# nuxeo bootstrap single-module
...
  create Generating Single module
     info   Parameters: Parent group, Parent artifact, Parent version, Nuxeo version, Project group, Project artifact, Project version, Project description
? Parent Group id (use white space to cancel default value.): org.nuxeo.ecm.distribution
? Parent Artifact id: nuxeo-distribution
? Parent Version: 10.10
? Project Group id: org.nuxeo.oauth2
? Project Artifact id: nuxeo-oauth-client-credentials
? Project version: 1.0-SNAPSHOT
? Project description:
   create pom.xml
   create src/main/resources/META-INF/MANIFEST.MF
   create src/main/java/org/nuxeo/oauth2/package-info.java
   create src/test/resources/jndi.properties
   create src/test/resources/log4j.xml
     info You can start editing code or you can continue with calling another generator (nuxeo bootstrap [<generator>..])
```

and our first test:

```
# nuxeo bootstrap test-empty
...
? Unit-Test package: org.nuxeo.oauth2
? Unit-Test class name: AccessTokenProviderTest
? Using Feature: None
     info Maven dependency: org.nuxeo.runtime:nuxeo-runtime-test:::test
     info Maven dependency: org.nuxeo.ecm.platform:nuxeo-platform-test:::test
     info Maven dependency: org.nuxeo.ecm.platform:nuxeo-platform-audit-core::test-jar:test
     info Maven dependency: org.nuxeo.ecm.automation:nuxeo-automation-test:::test
    force pom.xml
   create src/test/java/org/nuxeo/oauth2/AccessTokenProviderTest.java
     info You can start editing code or you can continue with calling another generator (nuxeo bootstrap [<generator>..])
```

The Nuxeo CLI bootstraps a test for us and is already using the Nuxeo Test Framework. We will just remove the line where it injects the `CoreSession` because we don't need it (hence the `None` answered to the *Using Feature* question).

For the moment the content of the test will be super simple, and will just verify the assertion that we exposed:

```java
@RunWith(FeaturesRunner.class)
@Features(RuntimeFeature.class)
@Deploy("org.nuxeo.oauth2.nuxeo-oauth-client-credentials")
public class AccessTokenProviderTest {

    @Test
    public void can_generate_access_token() {
        AccessTokenProvider provider = Framework.getService(AccessTokenProvider.class);

        assertNotNull(provider);
        byte[] accessToken = provider.getToken("myIdp");
        assertTrue(accessToken.length > 0);
    }
}

```

Now that we have a test, we can start working on making it pass.

A Component Can Give Tokens!
============================

For the moment, our test doesn't even compile! To fix that, we can create the corresponding interface and veryfy that our test is failing. That's a first step: low code is trendy, but low code is not no code and Nuxeo is not magic, we'll have to code more!

This will be the start of our bundle. The test expresses exactly what we want from a consumer standpoint. Now, for the `Framework.getService()` call to work, Nuxeo asks us to define a component whose responsibility will be to *provide* this *service*. A component in Nuxeo is at first nothing but a simple XML file that defines the component name, its implementation (optional) and its capabilities:

```xml
<component name="org.nuxeo.oauth2.OAuth2Component"
  version="1.0">

  <implementation
    class="org.nuxeo.oauth2.OAuth2Component" />.                   (1)

  <service>
    <provide interface="org.nuxeo.oauth2.AccessTokenProvider" />   (2)
  </service>

</component>
```

  1. The implementation class of our component. It is optional as our component may just be a generic component that contribute to others. That's the case of all single contributions in Nuxeo.
  2. The service that this component provides.

If we want that component to be deployed, we have to append it to the list of components that are deployed in our bundle. We can do that by editing the `MANIFEST.MF` file of our bundle, located in `src/main/resources/META-INF`:

```
Bundle-ActivationPolicy: lazy
Bundle-ClassPath: .
Manifest-Version: 1.0
Bundle-Vendor: org.nuxeo.oauth2
Bundle-Version: 1.0.0
Bundle-Name: nuxeo-oauth-client-credentials
Bundle-ManifestVersion: 2
Bundle-SymbolicName: org.nuxeo.oauth2.nuxeo-oauth-client-credentials;singleton=true
Nuxeo-Component: OSGI-INF/oauth-token-component.xml

```

If we try to execute our test again, it will fail with an error that says that our component cannot be cast to `AccessTokenProvider`. One way to quickly fix this is to actually make our component implement the interface. The component could then implement the needed method and we would be done.

However the SRP principle tells us to ask ourselves: "What is the responsibility of the component?" To provide a service, not to implement it! That's a big difference and that's why we can override the `getAdapter()` method to provide an alternate implementation than `return this;`. Our component becomes this:

```java
public class OAuth2Component extends DefaultComponent {

    private AccessTokenProvider instance;

    @Override
    public <T> T getAdapter(Class<T> adapter) {
        if (AccessTokenProvider.class.equals(adapter)) {
            return (T) getAccessTokenProvider();
        } else {
            return super.getAdapter(adapter);
        }
    }

    private AccessTokenProvider getAccessTokenProvider() {
        if (instance == null) {
            instance = new ClientCredentialsAccessTokenProvider();
        }
        return instance;
    }

}

```

with a very naive and lazy implementation of `ClientCredentialsAccessTokenProvider`, our test can become green. We've implemented our first component! Now we have to make it pluggable so that our token may be configurable.


The OAuth2 Component Becomes Configurable
=========================================

As we said earlier, our `AccessTokenProvider` has to be configurable, with an Url, some client credentials and a scope. The configuration for that component could look like a contribution like this:

```xml
<component name="org.nuxeo.oauth2.contrib-test" version="1.0">

	<extension target="org.nuxeo.oauth2.OAuth2Component"
		point="idp">
		<oauth2 id="myIdp">
			<tokenUrl>https://my-idp.com/oauth2/token</tokenUrl>
			<clientId>clientId</clientId>
			<clientSecret>myClientSecret</clientSecret>
			<scope>test</scope>
		</oauth2>
	</extension>
</component>
```

We will add this contribution in the `src/test/resources` folder of our project and update the test to deploy that contribution component to our test by adding `@Deploy("org.nuxeo.oauth2.nuxeo-oauth-client-credentials:oauth2-contrib.xml")` to our test deployment list. We also have to write a test to verify the configuration. As our current implementation returns a dumb token for every request, we will write a test that ensure that I get an `Exception` when I point to a non-existent IDP configuration:

```java
@Test(expected = OAuth2Exception.class)
public void can_not_have_token_for_unexisting_idp_configuration() throws Exception {
    atp.getToken("otherIdp");

}
```

Nothing will change from the previous outcome except that now we have a message in the logs yelling at us that we tried to deploy a component on a missing extension point:

```
======================================================================
= Component Loading Status: Pending: 0 / Missing: 1 / Unstarted: 0 / Total: 12
  * service:org.nuxeo.oauth2.contrib-test references missing [target=org.nuxeo.oauth2.OAuth2Component;point=idp]
======================================================================
```

It means that our `OAuth2Component` doesn't have the `idp` extension point. To fix this, we have to update the component definition and tell the Nuxeo runtime how to interpret the configuration. We will add a small snippet of XML to the component definition:

```xml
<extension-point name="idp">
    <object class="org.nuxeo.oauth2.IdpDescriptor" />
</extension-point>
```

It tells the framework that the component accepts some `IdpDescriptor` on its `idp` extension point. The `IdpDescriptor` has still to be created to fulfill the definition. The `XMap` library allows to map an XML document onto a Java Object.

Since Nuxeo 10.3, implementing the `Descriptor` interface for descriptor allows them to be automatically registered into the `DefaultComponent` registry and refer to it, without having to implements the usual `registerContribution` method. The list of descriptors registered for one component and an extension point name can be fetched using the `DefaultComponent#getDescriptors()` method.

Given the fact that descriptors are automatically registered, the component's code becomes:

```java
private AccessTokenProvider instance;

@Override
public <T> T getAdapter(Class<T> adapter) {
    if (AccessTokenProvider.class.equals(adapter)) {
        return (T) getAccessTokenProvider();
    } else {
        return super.getAdapter(adapter);
    }
}

private AccessTokenProvider getAccessTokenProvider() {
    if (instance == null) {
        instance = new ClientCredentialsAccessTokenProvider(getDescriptors("idp"));
    }
    return instance;
}
```

This allows to change the implementation of our service by using the list of descriptors:

```java
private Map<String, IdpDescriptor> descriptors;

public ClientCredentialsAccessTokenProvider(List<IdpDescriptor> descriptors) {
    this.descriptors = descriptors.stream().collect(Collectors.toMap(IdpDescriptor::getId, Function.identity()));
}

@Override
public byte[] getToken(String idpId) throws OAuth2Exception {
    if (descriptors.containsKey(idpId)) {
        return "token".getBytes();
    } else {
        throw new OAuth2Exception();
    }
}
```

With this implementation, our test then turns green. The `AccessTokenProvider` now has a dependency on the list of `IdpDescriptor` that is managed by the `OAuth2Component`. For the sake of the experience we will launch an `Event` with the `EventService` in order to add a dependency on another service. This is indeed a very  common pattern in Nuxeo, to call a service from another service, and will help us in the next section to demonstrate some refactoring.

```java
@Override
public byte[] getToken(String idpId) throws OAuth2Exception {
    if (descriptors.containsKey(idpId)) {
        Framework.getService(EventService.class).sendEvent(new Event("accessTokenTopic", idpId, this, null));
        return "token".getBytes();
    } else {
        throw new OAuth2Exception();
    }
}
```



Let's Refactor!
===============


Extract the dependencies
------------------------

The first problem that we can see is that the `ClientCredentialsAccessTokenProvider` doesn't clearly express the dependencies to the other services. The reason is that various calls to `Framework.getService(EventService.class)` make the dependencies difficult to identify and also more difficult to test. We will move the `EventService` as a field of our object and intialize it with the help of the `Builder` pattern: it will allow to initalize our service more easily in a test. The initialization to the default value can be conditioned to a call at `Framework.isInitialized()`:

```java
public static class Builder {
    ClientCredentialsAccessTokenProvider provider;

    public Builder() {
        provider = new ClientCredentialsAccessTokenProvider();
        if (Framework.isInitialized()) {
            provider.eventService = Framework.getService(EventService.class);
        }
    }

    public Builder descriptors(List<IdpDescriptor> descriptors) {
        provider.descriptors = descriptors.stream()
                                          .collect(Collectors.toMap(IdpDescriptor::getId, Function.identity()));
        return this;
    }

    public Builder eventService(EventService eventService) {
        provider.eventService = eventService;
        return this;
    }

    ClientCredentialsAccessTokenProvider build() {
        return provider;
    }
}
```

The `ClientCredentialsAccessTokenProvider` is then not responsible for its initialization which allows us to build out a complete object in a unit test mocking the dependencies that we are not interested in. Our object becomes simpler and doesn't call `Framework.getService()` directly anymore:

```java
public class ClientCredentialsAccessTokenProvider implements AccessTokenProvider {

	// Service dependencies
	private Map<String, IdpDescriptor> descriptors;

	private EventService eventService;

	@Override
	public byte[] getToken(String idpId) throws OAuth2Exception {
	    if (descriptors.containsKey(idpId)) {
	        eventService.sendEvent(new Event("accessTokenTopic", idpId, this, null));
	        return "token".getBytes();
	    } else {
	        throw new OAuth2Exception();
	    }
	}
	...
```

The difference may be very subtle, but it makes a whole difference. Now we are able to inject a mock in place of the `eventService` and verify the interaction of our service with its dependency. When the dependency is hard and/or long to setup in an integration test, you usually do not test it thoroughly enough. Here is how we can do it:

```java
@RunWith(MockitoJUnitRunner.class)
public class ClientCredentialsAccessTokenProviderTest {

    @Mock
    EventService eventService;

    @Test
    public void event_service_is_called_when_access_token() throws Exception {
        // Given our token provider
        IdpDescriptor descriptor = getDummyIdpDescriptor("myIdp");
        ClientCredentialsAccessTokenProvider ccatp = builder().descriptors(Collections.singletonList(descriptor))
                                                              .eventService(eventService)
                                                              .build();

        // When I call the getToken API
        ccatp.getToken("myIdp");

        // Then it generate an event;
        ArgumentCaptor<Event> eventCaptor = ArgumentCaptor.forClass(Event.class);
        verify(eventService).sendEvent(eventCaptor.capture());
        assertThat(eventCaptor.getValue().getSource()).isSameAs(ccatp);
    }

    ...
}
```

If everything had been packed in one single class (the component/service all in one object), it would have been a bit harder to test and less obvious because of the difficulties to identify dependencies.

Simplify Our Component
----------------------

Looking back at our component object, there is a pattern that we often see in Nuxeo: a lazy instantiation of an object:

```java
if(instance == null) {
   instance = buildMyInstance();
}
return instance;
```
That pattern is used here only once, but as soon as our component will has several services to provide, we may have more than one and we will have to repeat that pattern. Instead of repeating the pattern by copy pasting, we can extract it with the [flightweight pattern](https://en.wikipedia.org/wiki/Flyweight_pattern). To explain it, let's look at the test we can write for it:

```java
LazyProvider<Dummy> lp = new LazyProvider<>(callable);          (1)

// When I call it twice
verify(callable, never()).call();
Dummy dummy1 = lp.get();
Dummy dummy2 = lp.get();

// Then the underlying construction happened only once
verify(callable, times(1)).call();                             (2)

```

It's basically a wrapper around a callable that keeps the instance in its internal state:

  1. The `LazyProvider` is supposed to provide a `Dummy` interface using a `callable` to build it.
  2. We can verify that calling our `LazyProvider` twice only instanciate one of our `Dummy` Object.

Let's apply this to our component and look at the difference:

```java
public class OAuth2Component extends DefaultComponent {

    private LazyProvider<AccessTokenProvider> atp = new LazyProvider<>(this::buildAccessTokenProvider);

    @Override
    public <T> T getAdapter(Class<T> adapter) {
        if (AccessTokenProvider.class.equals(adapter)) {
            return (T) atp.get();
        }
        return super.getAdapter(adapter);
    }

    private AccessTokenProvider buildAccessTokenProvider() {
        return builder().descriptors(getDescriptors("idp")).build();
    }

}
```

Our component is now only 17 lines long! It still supports the registration of extension points and accepts contribution to build our `AccessTokenProvider` service. I like defining the responsibilities of a given object: here the responsibility of our component is only to know how to instantiate the implementation of the service it provides. Everything else was extracted:

  * to the Nuxeo Runtime by using the default registry mechanism (new feature of Nuxeo LTS 2019)
  * to some utility classes
  * to the real implementation of the service

Conclusion
==========

Through this how-to, we've seen how to create a Nuxeo component and also that the new Nuxeo LTS 2019 allows to create more concise Nuxeo Runtime Components. Having to write less code allows you to write less bugs too!

The pattern of extracting the implementation of the interface from the component allows us to test it in a more efficient manner. In our example, we relied only on one service, but if our component talks to dozens of different Nuxeo services, setting them up takes time and effort. By mocking those service, we can test the interactions more easily without having to test the implementation.

The code of the example is available on Github. It features a real implementation of the OAuth2 client credentials flow that allows to see how to thoroughly test its implementation with an external web service.

References
==========

 * Code of the component: [https://github.com/dmetzler/nuxeo-oauth-client-credentials](https://github.com/dmetzler/nuxeo-oauth-client-credentials)
 * Nuxeo: [https://github.com/nuxeo/nuxeo](https://github.com/nuxeo/nuxeo)
