### Exercise - Create a Serverless Java function with its custom JRE.

JPMS introduced in Java 9 adds modularity to the platform. With `jlink` 's JPMS, it is possible to create a Java Runtime that only carries the modules that are required by your application.

When invoking a function, the Fn infrastructure will get the request via a trigger (ex. HTTP) and will start the container for that function using the appropriate function container (assuming the container isn't ready running).

Having the ability to create custom JRE is extremely important in the Serverless context as the size of the Serverless container image will impact the startup time of this function. The smaller the function image is, the less time will be spent in loading the container image from the registry.

In addition, it is a good practice to avoid carrying, in a container, any unused pieces. This will not only reduce the potential surface attack but also simplify the overall maintenance over time.


To create a function that uses jlink we will use the Fn `init-image` feature.

`fn init --init-image delabassee/jlink-init modularfunc`

The parameter passed ("delabassee/jlink-init") to `init-image` is, in fact, a Docker image that will produce all the artifact required by the function.

If you look at the content of the newly created "modularfunc" directory, you will see familiar content (pom.xml, func.yaml, HelloFunction.java...); the only noticeable difference being a new Dockerfile.

You can deploy and run the function, as usual, using the Fn CLI.

```
fn create someapp
fn deploy --app someapp modularfunc
fn invoke someapp modularfunc
```


Now let's look at the Dockerfile

We can see that it's a multistage build as it uses multiple images (fn-cache:latest as cache-stage, maven:3.6.0-jdk-12-alpine as build-stage and alpine:latest).

There's nothing special in the first part as it is basically about building the function using Maven. 

The interresting part is the following line
`RUN /opt/openjdk-12/bin/jlink --compress=2 --no-header-files --no-man-pages --strip-debug --output /function/fnjre --add-modules $(/opt/openjdk-12/bin/jdeps --print-module-deps /function/target/function.jar)`

To understand it, we need to look at the 2nd part first. 

`/opt/openjdk-12/bin/jdeps --print-module-deps /function/target/function.jar)` is using jdeps to produce a list of modules required by our function (function.jar), modules list that is passed to jlink via its `--add-modules` parameter.
Using those modules, `jlink` will produce a custom JRE that will be placed in the `/function/fnjre` directory.
To even reduce the size of the JRE, we instruct `jlink`to remove headers file, man pages, debugging information and finally, we compress the result.


The rest of the Dockerfile is about building the Serverless container image itself using the files from the previous stage (ex. COPY --from=build-stage /function/fnjre/ /function/fnjre/) and from an other image (COPY --from=cache-stage /libfnunixsocket.so /lib)

You can measure the size of the produced image using the name of the container image, `fn inspect someapp modular func` will give it this name if didn't write it down earlier.

```
docker images modularfunc:0.0.2
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
david               0.0.2               e7a57e4c755b        1 minute ago        40MB
```

You can see that our function container image only weight 40MB and includes everything (and just that) to run our Serverless function, i.e. Alpine/Linux, our custom JRE and our (Java 12) function with its dependencies!
