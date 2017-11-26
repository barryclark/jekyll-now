---
layout: post
categories: [programming, extension, methods, unit, test, generics, reflection]
title: Generic Extension Methods and usage for Entity metadata information.
author: emir_osmanoski
comments: true
---

While working on this new project I implemented a convenient (for now at
least) way to work with the metadata information we store for our domain
entities especially during the test data seeding process. For some time now,
I’ve worked on a data seeding structure to more easily add seeder modules for
different domain sections for example core app entities, domain categories,
products and so on and have all these modules be separated and loaded
dynamically. All of the actual seeding is controlled by a seeder context that
wraps the database (EF code first) context.

So an issue came up with setting the repetitive metadata information for the
seeded entities which I attempted to fix using the method/approach described
here.

## Data Seeding Context and API

First a short explanation about what is meant by Seeding. When EF code first
migrations are run there is a finalizing step where we can initially seed data
in the database. The out of the box approach is rudimentary and does not
handle some issues like duplicated data when running the Update-Database
command multiple times. So the topic discussed here is related to a Seeding
API developed to fix some of the issues.

Currently the Seeding API is still a work in progress, but from start it was
meant to be as fluid as possible. Adding an entity to the database as test
data currently looks something like:

``` csharp
seedContext.Add(seedContext.BuildWrappedObject<User>(SeedingStrings.SystemUser).ExtendWith(new User()
{
    Username = "admin",
    Password = "admin"
}).TimeStampNew().SetSystemFlag().SetClientFlag().TimeStampTenant(seedContext.Tenant()));
```

Though it might look like a handful, I find it, using the excellent
intellisense and autocomplete features in visual studio, easy and fast to
write.

The main object used to seed data is the SeedContext wrapper around the
DbContext. It’s not the topic of this post, but in general it provides methods
like Add and BuildWrappedObject that ease the seeding process.

The context also makes sure we do not get duplicated data by forcing the usage
of alias values for the entities built and then added. Before adding an entity
to the database we check the presence of the alias value, thus fixing the
duplicate data issue. I would be glad and open to hear any tips or approaches
on how to better handle this, but for now it works as it is.

BuildWrappedObject returns a base starting point, an instance of
*SeededEntityWrapper*, for a domain class instance (the domain class instance is
composed by the wrapper) by internally setting some of the properties that are
common for all entities. It then provide a fluent way (the same wrapper is
returned allowing more operations) to extend via *ExtendWith()* which in turn
relies on reflection to copy over properties from the new *User()* to the one
currently composed in the wrapper, not touching the common preset properties.

The seed context Add method is overloaded to take either a pure Entity or
*SeededEntityWrapper* as an input to be added to the actual DbContext (the out
of the box seed approach). In the case of *SeededEntityWrapper* “unwrapping”
occurs before adding to the DbContext. That is we get the composed Entity and
then add it to the DbContext.

Now with that out of the way, we can focus on the point of this post, which
are the extension methods *TimeStampNew()*, *SetSystemFlag()*, *SetClientFlag()* and
*TimeStampTenant()* as well some that are not actually shown there.

In the code snippet they are actually used as extension methods on the
*SeededEntityWrapper* class but they were first developed to work with classes
implementing Entity. Pure entities with no wrapper. We will look at how all of
this is actually done, starting with the generic f method
implementations for Entity based classes.

## Entity Meta Data Management and Extension Method Implementation

Our base Entity class in the current solution has some metadata information
about the state of the entity in the domain. For the purposes of discussion we
will reduce this set of metadata to only four properties and we will look at
the extension methods used for those properties. So let us say the base Entity
class from which all our domain entities inherit contains the following
metadata properties:

``` csharp
public abstract class Entity
{
	public DateTime? DateCreated { get; set; }

	public string CreatedBy { get; set; }

	public DateTime? DateModified { get; set; }

	public string ModifiedBy { get; set; }
}
```

Now, we might have multiple classes that will inherit from Entity: Users,
Products, Categories and so on which will require us setting this metadata
information when working with them. There are, of course multiple ways to do
this but for the above example with the seeding process I found it convenient
to use extension methods that return the instance again, initially for the
timestamp requirements, and then for all of the metadata information (not
presented here).

These extension methods are supposed to work on all domain entities that
inherit from Entity so the natural approach would be to use generic extension
methods, with an Entity constraint on the generic type parameter. This
implementation of generic extension methods is something I’ve never tried
before or thought possible so it was an interesting learning experience.

So these are the following two methods that manage the Time Stamped
information:

``` csharp
public static T TimeStampNew<T>(this T entity, string createdBy = null) where T : Entity
{
    entity.DateCreated = DateTime.Now;

    if (createdBy != null)
    {
        entity.CreatedBy = createdBy;
    }

    return entity;
}

public static T TimeStampUpdate<T>(this T entity, string updatedBy = null) where T : Entity
{
    entity.DateModified = DateTime.Now;

    if (updatedBy != null)
    {
        entity.ModifiedBy = updatedBy;
    }

    return entity;
}	
```

By using the [base class generic type parameter constraint](http://msdn.microsoft.com/en-us/library/d5x73970.aspx) and setting it to
Entity for T we have access to the metadata information on the T entity
object. We can also go and use the C# language (this on first parameter which
is the extended type) format for specifying an extension method using the
generic type parameter instead of specific entity types like User or Product.

This allows this generic extension method to be visible on every entity class
that inherits from Entity. This is interesting to me because it’s the first
time I had this need and never implemented extension methods like these
before, even though maybe the usage is discussible.

Overall I think it’s a nice feature of the language allowing even more code
reuse, cleaner entity classes as this code can be implemented in other files.
It also allows easy extension for all the concrete entities with different
functionalities, by combining additional interface based generic type
parameter constraints. Just for example we can also set a Tenant reference
like this:

``` csharp
public static T TimeStampTenant<T>(this T entity, Tenant tenant = null) where T : Entity, ITenantEntity
{
    if (tenant == null)
    {
        throw new NullReferenceException("Timestamp Null Tenant is not allowed");
    }

    entity.Tenant = tenant;

    return entity;
}
```

As not all entities in the system have Tenant we use an additional interface
based generic type parameter constraint to have access to the Tenant property.

The interface looks like:

``` csharp
public interface ITenantEntity
{
    Tenant Tenant { get; set; }
}
```

And its then implemented on the User entity:

``` csharp
public class User : Entity, ITenantEntity
```

This way, User, and any other entity implementing ITenantEntity is extended
with the *TimeStampTenant* method. And it just now occurs to me that it would be
a great idea to fix the naming on this extension method to probably *SetTenant*
:)

## Note on return types

All extension methods defined and seen here always return the same object that
the method runs on. We do this so we can chain the extension methods as it can
be seen in the following trivial code snippet:

``` csharp
var user = new User().TimeStampNew().TimeStampUpdate();
```

## SeededEntityWrapper Extensions Implementation

The generic extensions with the Entity constraint are very useful when working
with the Entity class implementations directly. But during the seeding process
I tend to use the *SeededEntityWrapper* with the SeedContext.

When working with the *SeededEntityWrapper* as seen in the initial code snippet
we do not have access to the generic extension methods seen above because they
are defined for T which is wrapped. So the approach I came up with was to
“wrap”/adapt the extension methods themselves and define new ones for the
*SeededEntityWrapper* class which it in itself is generic. Let’s look at the two
extension methods for Time Stamping but now for the *SeededEntityWrapper*:


``` csharp
public static SeededEntityWrapper<T> TimeStampNew<T>(this SeededEntityWrapper<T> wrappedEntity,
    string createdBy = null) where T : Entity, new()
{
    wrappedEntity.Data.TimeStampNew(createdBy);
    return wrappedEntity;
}

public static SeededEntityWrapper<T> TimeStampUpdate<T>(this SeededEntityWrapper<T> wrappedEntity,
    string updatedBy = null) where T : Entity, new()
{
    wrappedEntity.Data.TimeStampUpdate(updatedBy);
    return wrappedEntity;
}
```

We can see that the signatures and names of the extension methods for entities
and wrapped entities (via *SeededEntityWrapper*) are almost the same with the
exception of the return type and the extended type. Instead of having just the
generic type parameter T being extended and returned we have
*SeededEntityWrapper<<T>>*. This allows the same usage as with just an Entity and
more importantly allows the Time Stamping during the seeding process seen in
the first snippet.

The inner implementation is nothing more than getting the wrapped entity and
calling the already implemented extension method.

Now, one issue with this would be the code syncing, which is when we implement
an extension for Entity we must also by definition implement it in the wrapped
extensions. I tried to achieve this by using Interfaces or Abstract classes
but because extension methods should be static this proved to be very
difficult.

I came up with a very different approach that sort of solves the code sync
problem, though I am still looking for a better “language/framework” supported
solution. For now, because I am still in the Unit Testing phase/mood I wrote a
Unit Test based on .NET Type Reflection capabilities that makes sure the
wrapped extension methods match the entity extension methods.

I will not go into details regarding the test, but will just present it here.
Basically it “reflects on” the two static classes that contain the extension
methods and does a bunch of checks and comparisons about method names, return
types and input parameters.

One thing that deserves special mention here is the check if a given method
has the ExtensionAttribute custom attribute that gets attached to the method
by the framework if the method is declared as an extension method.

The test is quite large and I have to say a work in progress but for now it
accomplishes what I set out to do. If anyone has a better solution to this
problem feel free to mention it in the comments bellow as I am not sure it is
the best approach for doing something like this. Then again maybe the entire
seeding approach/framework I’ve worked is discussible but for now it’s fast
and easy to work with.

The test (**There are some issues here with wrapping and the Jekyll highlight engine so it would be best to copy/paste in your favorite editor**):

``` csharp
[Test]
public void SeededEntityWrapper_MetaMethods_ShouldMatch_EntityMetaManagerMethods()
{
    // ARRANGE
    var metaManagerType = typeof(EntityMetaManager);
    var metaManagerWrapperType = typeof(EntityWrapperMetaManagerExtensions);

    // get all static methods only as only they can be extension methods
    var metaManagerMethods = metaManagerType.GetMethods().Where(m => m.IsStatic);
    var metaManagerWrappedMethods = metaManagerWrapperType.GetMethods().Where(m => m.IsStatic);

    var extensionAttributeType = typeof(ExtensionAttribute);

    var extendedType = typeof(SeededEntityWrapper<>);

    // ACT

    foreach (var metaManagerMethod in metaManagerMethods)
    {
        // ASSERT
        // there should be the method with the same name in the wrapped extensions
        // and it should be static
        var wrappedMethod = metaManagerWrappedMethods.FirstOrDefault(wm => wm.Name == metaManagerMethod.Name);

        // exist assertion
        Assert.IsNotNull(wrappedMethod, string.Format("Method {0} is not present in the {1} method set", metaManagerMethod.Name, metaManagerWrapperType.Name));

        // return type assertions
        Assert.IsTrue(wrappedMethod.ReturnType.Name == extendedType.Name,
            string.Format("Meta Manager Wrapped Method {0} in {1} method set does not have the correct return type {2}", metaManagerMethod.Name, metaManagerWrapperType.Name, extendedType.Name));

        // parameter assertions
        Assert.IsTrue(wrappedMethod.GetParameters().Any(), string.Format("Meta Manager Wrapped Method {0}  in the {1} method set has no input parameters", metaManagerMethod.Name, metaManagerWrapperType.Name));
        Assert.IsTrue(wrappedMethod.GetParameters().FirstOrDefault().ParameterType.Name == extendedType.Name,
            string.Format("Meta Manager Method {0} in the {1} method set first parameter is not {2}", metaManagerMethod.Name, metaManagerWrapperType.Name, extendedType.Name));

        // the other parameters must be defined as in the original method.
        if (metaManagerMethod.GetParameters().Count() > 1)
        {
            var orgMethodParams =
                metaManagerMethod.GetParameters();

            var wrappedMethodParams =
                wrappedMethod.GetParameters();

            Assert.IsTrue(orgMethodParams.Count() == wrappedMethodParams.Count(),
                string.Format("Wrapped method {0} does not have the same number of parameters {1} as the original method", wrappedMethod.Name, orgMethodParams.Count()));

            for (int i = 1; i < wrappedMethodParams.Count(); i++)
            {
                var wrappedMethodParam = wrappedMethodParams[i];
                var orgMethodParam = orgMethodParams[i];

                Assert.AreEqual(wrappedMethodParam.Name, orgMethodParam.Name,
                    string.Format("Wrapped Method Param {0} on method {1} name value is {2}, different then for method param {3} where name is {4}"
                    , wrappedMethodParam.Name, wrappedMethod.Name, wrappedMethodParam.Name, orgMethodParam.Name, orgMethodParam.Name));

                Assert.IsTrue(wrappedMethodParam.ParameterType.Name == orgMethodParam.ParameterType.Name,
                    string.Format("Wrapped Method {0} has parameter {1} ({2}) which does not match in order the parameter on orginal method {3} which is {4} ({5})",
                    wrappedMethod.Name, wrappedMethodParam.Name, wrappedMethodParam.ParameterType.Name, metaManagerMethod.Name, orgMethodParam.Name, orgMethodParam.ParameterType.Name));

                Assert.AreEqual(wrappedMethodParam.IsOptional, orgMethodParam.IsOptional,
                    string.Format("Wrapped Method Param {0} on method {1} optional is {2}, different then for method param {3} where optional is {4}"
                    , wrappedMethodParam.Name, wrappedMethod.Name, wrappedMethodParam.IsOptional, orgMethodParam.Name, orgMethodParam.IsOptional));

                Assert.AreEqual(wrappedMethodParam.DefaultValue, orgMethodParam.DefaultValue,
                    string.Format("Wrapped Method Param {0} on method {1} default value is {2}, different then for method param {3} where default value is {4}"
                    , wrappedMethodParam.Name, wrappedMethod.Name, wrappedMethodParam.DefaultValue, orgMethodParam.Name, orgMethodParam.DefaultValue));
            }
        }

        // we need to verify if the method has extension attribute
        var extAttribute = wrappedMethod.CustomAttributes.FirstOrDefault(attr => attr.AttributeType.Name == extensionAttributeType.Name);
        Assert.IsNotNull(extAttribute, string.Format("Meta Manager Wrapped Method {0} in the {1} method set does not contain {2} attribute", wrappedMethod.Name, metaManagerWrapperType.Name, extensionAttributeType.Name));
    }
}
```

If the test fails it means the wrapped extensions are not matching the Entity
metadata extensions and the message will pinpoint where the issue is. Good
enough for now.

## Conclusion

Extension methods are a great feature. Generic extension methods for the
purposes of what I need to do, and based on the way I like to write code are
even better. Though It’s also not debatable that extension methods also
provide a set of other benefits.

They are now in the current codebase heavily used to replace a property
assignment in initialization code to a simple chainable method call. Just to
clarify, I personally find it easier to write:

``` csharp
var user = new User().TimeStampNew("sys_admin");
```

instead of 

``` csharp
var user = new User()
{
    DateCreated = DateTime.Now,
    CreatedBy = "sys_admin"
};
```

I find the first approach much cleaner. The generic Extension methods allow
for the code to be separate from the actual entity code, the User class
written in the User.cs file, which does not have any methods defined. One
thing I am now wondering is how these methods are compiled/baked into the
implementations. I remember reading something about this and the difference
with templates in C++, but for now I’ll leave that up for another time or
another post.

Finally, I also feel the code is easier to read and is more domain centric.
Each entity has the Date and User Created metadata and TimeStampNew feels like
it’s addressing exactly that information for the domain.

I will continue to work and explore this approach while working on the current
“secret” project. As some sort of general progress, the project is still in an
early phase and I am still working on having a solid data seeding structure
before moving on to data access implementations, as I feel having good test
data is sort of important for what we are trying to build.

Hope the post was useful and might come in handy in your own coding endeavors!

P.S. Happy New Year and Happy Holidays!
