## Exercise - Using GraalVM to create native Serverless Java function


As mentionned in the previous exercice, reducing the size of the function container image is key.

In adidtion to JPMS, we can also use [GraalVM](https://www.graalvm.org), an open-source high performance virtual machine developed by Oracle Labs, to further reduce the size of function container image.

GraalVM is offers many features, in this exercice we will solely focus on GraalVM `native-image`feature. 
`native-image` is an AOT 

`native-image` is an AOT (Ahead-of-Time) compiler that will [compile Java code into a native binary executable](https://www.graalvm.org/docs/reference-manual/aot-compilation/) that will run on a given target host.


fn init --init-image fnproject/fn-java-native-init graalfunc`


### Boostrap the function

To create a function that uses GraalVM `native-init` we will use the Fn `init-image` feature.

`fn init --init-image fnproject/fn-java-native-init graalfunc`

The parameter passed (_"fnproject/fn-java-native-init"_) to `init-image` is a Docker image that will produce all the artifact required by the function, including GraalVM AOT compiler.

If you look at the content of the newly created _"modularfunc"_ directory, you will see familiar content (`pom.xml`, `func.yaml`, `HelloFunction.java`, etc.) but also a `Dockerfile` that Fn will use to build the actual container image of the function.

### Build and Deploy the Function

You can build, deploy and run the function, as usual, using the Fn CLI.

```
fn create someapp
fn deploy --app someapp graalfunc
fn invoke someapp graalfunc
```

### ...

If we look at the `Dockerfile`, we can see that it's a [multi-stage build](https://docs.docker.com/develop/develop-images/multistage-build/) as it uses multiple images (`fn-cache:latest`, `maven:3.6.0-jdk-12-alpine` and `alpine:latest`).

There's nothing special in the first part as it is basically about building the Java function using Maven. 

The interresting part is the following line
`RUN /opt/openjdk-12/bin/jlink --compress=2 --no-header-files --no-man-pages --strip-debug --output /function/fnjre --add-modules $(/opt/openjdk-12/bin/jdeps --print-module-deps /function/target/function.jar)`. 

To understand it, we need to first look at the 2nd part of this command.
`/opt/openjdk-12/bin/jdeps --print-module-deps /function/target/function.jar` is using [`jdeps`](https://docs.oracle.com/javase/8/docs/technotes/tools/unix/jdeps.html) to produce a list of modules required by our function (`function.jar`), modules list that is passed to [`jlink`](https://docs.oracle.com/en/java/javase/11/tools/jlink.html) via its `--add-modules` parameter. Using those modules (abd only those!), `jlink` will produce a custom JRE that will be saved in the `/function/fnjre` directory.

To even reduce the size of this JRE, we instruct `jlink`to remove headers file, man pages, debugging information and finally, we compress the result JRE.

The rest of the `Dockerfile` is about building the container image itself using the files generated in the the previous stage (ex. `COPY --from=build-stage /function/fnjre/ /function/fnjre/`) and a shared object from a cache image (`COPY --from=cache-stage /libfnunixsocket.so /lib`).

### Conlusion

You can see that creating and using a native imave is trivial as everything is handled by Fn via its `init-image` feature. To undestand the benefits of such custom JRE, you should  measure the size of the produced image. You can do that using `docker images` and the name of the function container image. If you you didn't write the container image name earlier, `fn inspect someapp modularfunc` will give you all the details of the function, including its container image name. 

```
docker images graalfunc:0.0.2
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
david               0.0.2               e7a57e4c755b        1 minute ago        20MB
```

:mega: You might want to check [`dive`]((https://medium.com/fnproject/dive-into-serverless-functions-5d1ba3572906)), a convinient tool to explore container image and its layers.

You can see that our function container image only weight **20MB** and it includes everything (and just that!) to run our Serverless function, i.e. the operating system and our Java function that has been compiled and linked into a Linux  executable. It should be mentionned that this executable doesn't require any external Java runtime as it embebds SubstrateVM. As said earlier, the smaller the container image is, the faster it will be loaded from the registry when it is invoked. 
