## Exercise - A Serverless Java function with a custom JRE.

JPMS introduced in Java 9 adds [modularity to the Java platform](https://blogs.oracle.com/java/modular-development). With `jlink` 's JPMS, it is now possible to create a Java Runtime that only carries the modules that are required by your application.

When invoking a serverless function, the Fn infrastructure will get the request via a trigger (ex. HTTP) and will transparently start the container for that function using the appropriate container image (assuming it isn't alerady running).

Having the ability to create custom JRE is extremely important in a serverless context as the size of the function container image will directly impact the startup time of this function. The smaller the function image is, the less time will be spent in loading the container image from the registry.

In addition, it is a good practice to avoid carrying, in a container, any unused pieces. This will not only reduce the potential surface attack but also simplify the overall maintenance over time.

### Boostrap the function

To create a function that uses `jlink` we will use the Fn `init-image` feature.

`fn init --init-image delabassee/jlink-init modularfunc`

The parameter passed (_"delabassee/jlink-init"_) to `init-image` is, in fact, a Docker image that will produce all the artifact required by the function.

If you look at the content of the newly created _"modularfunc"_ directory, you will see familiar content (`pom.xml`, `func.yaml`, `HelloFunction.java`, etc.); the only noticeable difference being a new `Dockerfile`.

### Build and Deploy the Function

You can build, deploy and run the function, as usual, using the Fn CLI.

```
fn create someapp
fn deploy --app someapp modularfunc
fn invoke someapp modularfunc
```

### Using jlink to create a custom JRE

If we look at the `Dockerfile`, we can see that it's a [multi-stage build](https://docs.docker.com/develop/develop-images/multistage-build/) as it uses multiple images (`fn-cache:latest`, `maven:3.6.0-jdk-12-alpine` and `alpine:latest`).

There's nothing special in the first part as it is basically about building the Java function using Maven. 

The interresting part is the following line
`RUN /opt/openjdk-12/bin/jlink --compress=2 --no-header-files --no-man-pages --strip-debug --output /function/fnjre --add-modules $(/opt/openjdk-12/bin/jdeps --print-module-deps /function/target/function.jar)`. 

To understand it, we need to first look at the 2nd part of this command.
`/opt/openjdk-12/bin/jdeps --print-module-deps /function/target/function.jar` is using [`jdeps`](https://docs.oracle.com/javase/8/docs/technotes/tools/unix/jdeps.html) to produce a list of modules required by our function (`function.jar`), modules list that is passed to [`jlink`](https://docs.oracle.com/en/java/javase/11/tools/jlink.html) via its `--add-modules` parameter. Using those modules (abd only those!), `jlink` will produce a custom JRE that will be saved in the `/function/fnjre` directory.

To even reduce the size of this JRE, we instruct `jlink`to remove headers file, man pages, debugging information and finally, we compress the result JRE.

The rest of the `Dockerfile` is about building the container image itself using the files generated in the the previous stage (ex. `COPY --from=build-stage /function/fnjre/ /function/fnjre/`) and a shared object from a cache image (`COPY --from=cache-stage /libfnunixsocket.so /lib`).

### Conlusion

You can see that creating and using a custom JRE is simple as everything is handled by Fn via its `init-image` feature. To undestand the benefits of such custom JRE, you should  measure the size of the produced image. You can do that using `docker images` and the name of the function container image. If you you didn't write the container image name earlier, `fn inspect someapp modularfunc` will give you all the details of the function, including its container image name. 

```
docker images modularfunc:0.0.2
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
david               0.0.2               e7a57e4c755b        1 minute ago        40MB
```

:mega: You might want to check [`dive`]((https://medium.com/fnproject/dive-into-serverless-functions-5d1ba3572906)), a convinient tool to explore container image and its layers.

You can see that our function container image only weight **40MB** and it includes everything (and just that!) to run our Serverless function, i.e. the operating system, our custom JRE and our Java 12 function with its dependencies! As said earlier, the smaller the container image is, the faster it will be loaded from the registry when it is invoked. And to better appreciate the benefits of JPMS, compare that number with the size of Java function created using the trditional, i.e. non modular approach (see [earlier exercice](https://fnproject.io/tutorials/JavaFDKIntroduction/)).

