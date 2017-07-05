--- 
layout: post
title: Generating Swagger from your API
subtitle: How to quickly generate the swagger documentation from your existing API.
category: dev
tags: [howto, api, development]
author: Tora Onaca
author_email: teodora.onaca@haufe-lexware.com
header-img: "images/new/Exportiert_53.jpg"
--- 

If you already have an existing API and you just want to generate the swagger documentation from it, there are a couple easy steps to make it work. First off, you should be familiar with Swagger and, in particular, with [swagger-core](https://github.com/swagger-api/swagger-core). Assuming that you coded your REST API using JAX-RS, based on which was your library of choice (Jersey or RESTEasy), there are several [guides](https://github.com/swagger-api/swagger-core/wiki/Swagger-Core-JAX-RS-Project-Setup-1.5.X) available to get you set up very fast.

In our case, working with RESTEasy, it was a matter of adding the maven dependencies:

	
	<dependency>
		<groupId>io.swagger</groupId>
		<artifactId>swagger-jaxrs</artifactId>
		<version>1.5.8</version>
	</dependency>

	<dependency>
		<groupId>io.swagger</groupId>
		<artifactId>swagger-jaxrs</artifactId>
		<version>1.5.8</version>
	</dependency>


Note: please make sure to set the jar version to the latest one available, so that the latest bug fixes are included.

In order to hook up swagger-core in the application, there are multiple solutions, the easiest of which is to just use a custom `Application` subclass.


``` java
	public class SwaggerTestApplication extends Application {

		public SwaggerTestApplication() {
			BeanConfig beanConfig = new BeanConfig();
			beanConfig.setVersion("1.0");
			beanConfig.setSchemes(new String[] { "http" });
			beanConfig.setTitle("My API");
			beanConfig.setBasePath("/TestSwagger");
			beanConfig.setResourcePackage("com.haufe.demo.resources");
			beanConfig.setScan(true);
		}
		
		@Override
	    public Set<Class<?>> getClasses() {
	        HashSet<Class<?>> set = new HashSet<Class<?>>();
	
	        set.add(Resource.class);
	
	        set.add(io.swagger.jaxrs.listing.ApiListingResource.class);
	        set.add(io.swagger.jaxrs.listing.SwaggerSerializers.class);
	
	        return set;
	    }
	}

```
Once this is done, you can access the generated `swagger.json` or `swagger.yaml` at the location: `http(s)://server:port/contextRoot/swagger.json` or `http(s)://server:port/contextRoot/swagger.yaml`.

Note that the `title` element for the API is mandatory, so a missing one will generate an invalid swagger file. Also, any misuse of the annotations will generate an invalid swagger file. Any existing bugs of swagger-core will have the same effect. 

In order for a resource to be documented, other than including it in the list of classes that need to be parsed, it has to be annotated with @Api. You can check the [documentation](https://github.com/swagger-api/swagger-core/wiki/Annotations-1.5.X) for the existing annotations and use any of the described fields. 

A special case, that might give you some head aches, is the use of subresources. The REST resource code usually goes something like this:

``` java
	@Api
	@Path("resource")
	public class Resource {
	
		@Context
		ResourceContext resourceContext;
		
		@GET
		@Produces("application/json")
		@ApiOperation(value = "Returns something")
		public String getResource() {
			return "GET";
		}
		
		@POST
		@Produces("application/json")
		public String postResource(String something) {
			return "POST" + something;
		}
		
		@Path("/{subresource}")
		@ApiOperation(value = "Returns a subresource")
		public SubResource getSubResource() {
			return resourceContext.getResource(SubResource.class);
		}
	
	}


	@Api
	public class SubResource {
		
		@PathParam("subresource")
		private String subresourceName;
	
		@GET
		@Produces("application/json")
		@ApiOperation(value = "Returns subresource something")
		public String getSubresource() {
			return "GET " + subresourceName;
		}
		
		
		@POST
		@Produces("application/json")
		@ApiOperation(value = "Posts subresource something")
		public String postSubresource(String something) {
			return "POST " + subresourceName + something;
		}
	}
```

The swagger parser works like a charm if it finds the @Path and @GET and @POST annotations where it thinks they should be. In the case depicted above, the subresource is returned from the parent resource and does not have a @Path annotation at the class level. A lower version of swagger-core will generate an invalid swagger file, so please use the latest version for a correct code generation. If you want to make you life a bit harder and you have a path that goes deeper, something like /resource/{subresource}/{subsubresource}, things might get a bit more complicated. 

In the Subresource class, you might have a @PathParam for holding the value of the {subresource}. The Subsubresource class might want to do the same. In this case, the generated swagger file will contain the same parameter twice, which results in an invalid swagger file. It will look like this:

	parameters:
      - name: "subresource"
        in: "path"
        required: true
        type: "string"
      - name: "subsubresource"
        in: "path"
        required: true
        type: "string"
      - in: "body"
        name: "body"
        required: false
        schema:
          type: "string"
      - name: "subresource"
        in: "path"
        required: true
        type: "string"


In order to fix this, use `@ApiParam(hidden=true)` for the subresource `@PathParam` in the `Subsubresource` class. See below.

``` java
	@Api
	public class SubSubResource {
		
		@ApiParam(hidden=true)
		@PathParam("subresource")
		private String subresourceName;
		
		@PathParam("subsubresource")
		private String subsubresourceName;
	
		@GET
		@Produces("application/json")
		@ApiOperation(value = "Returns subsubresource something")
		public String getSomethingw() {
			return "GET " + subresourceName + "/" + subsubresourceName;
		}
		
		@POST
		@Produces("application/json")
		@ApiOperation(value = "Posts subsubresource something")
		public String postSomethingw(String something) {
			return "POST " + subresourceName + "/" + subsubresourceName + " " +something;
		}
	}
```

There might be more tips and tricks that you will discover once you start using the annotations for your API, but it will not be a slow learning curve and once you are familiar with swagger (both spec and core) you will be able to document your API really fast.
