---
layout: post
category: programming
title: Unit Testing EF Code First Database Contexts
author: emir_osmanoski
comments: true
---

![Unit Testing]({{ site.baseurl }}/images/2014-12-18-UnitTestDbContext/UnitTestSession.png)

I’ve recently started work on a new side project. We started with designing
some mockup screens for most of the functionality and from there on moved on
to defining the database structure. After initial diagrams, the decision was
made to use Entity Framework code first.

Now, the domain entities were defined, and I used clean classes (no attribute
decorations) and an EntityTypeConfiguration approach to do some additional
configuration, mostly related to many to many relations without double
association. That, I think would make another interesting post, as it was
something I did/discover specifically on this project.

Anyway, I had an interesting trivial issue while developing and making changes
to the collection of entities and the initially defined DbContext used during
development testing. And it’s a problem that is expected to possibly occur
again as we make additional changes to the domain. Namely an entity was added
to the class pool, but not to the DbContext. Running the migrations this was
will not register the new entity and the resulting database structure is,
naturally, not as expected.

So, this is a trivial non critical thing, but we had an interesting discussion
with a coworker about how can we somehow prevent this from happening and have
the framework tell us what is actually wrong. The plan was to use unit testing
anyway during development as we would be building this from the ground up and
wanted to test, for example data access functionality, ASAP. So the idea was
born from there and the code that is to follow is one part of the solution.
I’ll get back to the “other” part after the code is presented.

The way we currently have things setup, each of our domain entities inherit a
common Entity type that contains the key and some metadata properties. All of
these are located in their own assembly with nothing else in there. Another
project contains the DbContext, which defines the DbSets, and migrations to
build the database.

``` csharp
public class Product:Entity
{
    public string Name {get; set;}
}

public class Entity
{
	/// <summary>
	/// Is the pk by CodeFirst convention
	/// </summary>
	public int Id { get; set; }

	public DateTime? DateCreated { get; set; }

	public string CreatedBy { get; set; }

	public string ModifiedBy { get; set; }

	public DateTime? DateModified { get; set; }
}

```

And the bare DbContext:

``` csharp
public class ProjectContext : DbContext
{
        public DbSet<Product> Products { get;set }
}
```

So the test in mind, should check if ProjectContext contains a DbSet<Product>
property. In a bigger project we would also have more entities that inherit
from Entity. So what we basically want is to get all the Entities and check
for each one if it is defined as a DbSet in the context. We want to do this
dynamically and this is where .NET Reflection comes into play. It’s going to
allow us to examine the assemblies, types and properties and make sure we get
to an end decision if the DbContext is defined correctly. So let us examine
how that was achieved.

###Getting the Entity Types

``` csharp
// ARRANGE
var entityType = typeof(Entity);

// get the assembly containing the entities
// based on the base Entity Type
var domainAssembly = Assembly.GetAssembly(entityType);

// get all the entities defined in the domain
// that inherit from Entity (meaning they should be defined as dbSets) but not Entity itself
var allEntities = domainAssembly
    .GetTypes()
    .Where(type => entityType.IsAssignableFrom(type) && type.Name != entityType.Name).ToList();
```

From the domain assembly we get all the types where the type inherits from the
Entity type but in the same time we don’t want to get the Entity class.

###Getting the Context and all the generic type parameters for all its DbSets

``` csharp
// Now we want to get all the generic type parameters defined for the
// DbSets in the 
var contextType = typeof(ProjectContext);

var allContextGenericParameterTypes = contextType.GetProperties()
    // get db set only properties
    .Where(t => t.PropertyType.IsGenericType && t.PropertyType.GetGenericTypeDefinition() == typeof(DbSet<>))
    // get the all the names of the generic type parameters on db sets
    .Select(prop => prop.PropertyType.GenericTypeArguments.First()).ToList();
```

Basically we go over each property of the context type and get only the
generic type properties based on DbSet. In the same query we map the
collection to the first generic type argument, which in the case of DbSets is
the actual wrapped entity. What remains is to assert that each entity is
contained in the list of the generic parameter types, meaning it’s included as
a DbSet.

###Assertion

The assertion is based on iterating the list of entities and making sure the type name is present in the type names for the generic parameters in the DbSets. This is an approach that allows for writing out which entity is not included in the DbSets

``` csharp
foreach (var entity in allEntities)
{
    Assert.IsTrue(allContextGenericParameterTypes.Any(gp => gp.Name == entity.Name), 
    			  string.Format("Entity [{0}] not found in DbContext", entity.Name));
}
```

###Conclusion

If everything is defined correctly the test and assertions will pass. If an Entity is defined but not included in the DbSet properties in the context the test fails with the following message:

![Unit Testing]({{ site.baseurl }}/images/2014-12-18-UnitTestDbContext/resultfailed.png)

I mentioned at the start this is just part of a “solution” and mostly meant as
an exercise in .NET Reflection. Usually when there is something wrong with the
generated database you would figure that maybe a DbSet is missing, and this
sort of test would be the last option. What would make this perfect though,
would be running the test and a bunch of other similar core tests on each
build of the entire solution or maybe on projects builds, but again that would
is something I have to look into.

So that would be mostly it for this attempt. I don’t know how useful people
will find it, but I thought the topic was interesting enough for a first post
and I hope I’ll get to write many more. It might even lead to a discussion 
on better, smarter aproaches to setting up projects and testing the data layer this early on. 
That would actually be great.

And to wrap things up the entire nUnit test method:

``` csharp
[Test]
public void ContextShouldContainAllDomainEntities()
{
    // ARRANGE
    var entityType = typeof(Entity);

    // get the assembly containing the entities
    // based on the base Entity Type
    var domainAssembly = Assembly.GetAssembly(entityType);

    // get all the entities defined in the domain
    // that inherit from Entity (meaning they should be defined as dbSets) but not Entity itself
    var allEntities = domainAssembly
        .GetTypes()
        .Where(type => entityType.IsAssignableFrom(type) && type.Name != entityType.Name).ToList();

    // Now we want to get all the generic type parameters defined for the
    // DbSets in the 
    var contextType = typeof(WsContext);

    var allContextGenericParameterTypes = contextType.GetProperties()
        // get db set only properties
        .Where(t => t.PropertyType.IsGenericType && t.PropertyType.GetGenericTypeDefinition() == typeof(DbSet<>))
        // get the all the names of the generic type parameters on db sets
        .Select(prop => prop.PropertyType.GenericTypeArguments.First()).ToList();

    // ASSERT

    foreach (var entity in allEntities)
    {
        Assert.IsTrue(allContextGenericParameterTypes.Any(gp => gp.Name == entity.Name), string.Format("Entity [{0}] not found in DbContext", entity.Name));
    }
}
```