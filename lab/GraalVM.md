## Exercise - Using GraalVM to create native Serverless Java function


As mentioned in the previously, reducing the size of a unction container image is key.

In addition to [JPMS and `jlink`](https://github.com/delabassee/delabassee.github.io/blob/master/lab/jlink.md), we can also use [GraalVM](https://www.graalvm.org), an open-source high-performance virtual machine developed by Oracle Labs, to further reduce the size of a function container image.

GraalVM offers many features but in this exercise, we will solely focus on GraalVM `native-image` feature. 
`native-image` is an AOT (Ahead-of-Time) compiler that will [compile Java code into a native binary executable](https://www.graalvm.org/docs/reference-manual/aot-compilation/).


### Boostrap the function

To create a function that uses GraalVM `native-init` we will use the Fn `init-image` feature.

:bulb: This is not a typo! There's `native-init`, a GraalVM feature and `init-image`, an Fn feature!

`fn init --init-image fnproject/fn-java-native-init graalfunc`

The parameter passed (_"fnproject/fn-java-native-init"_) to `init-image` is a Docker image that will produce all the artifacts required by the function, including GraalVM AOT compiler support.

If you look at the content of the newly created _"modularfunc"_ directory, you will see familiar content (`pom.xml`, `func.yaml`, `HelloFunction.java`, etc.) but also a `Dockerfile` that Fn will use to build the actual container image of the function.

### Build and Deploy the Function

You can build, deploy and run the function, as usual, using the Fn CLI.

```
fn create someapp
fn deploy --app someapp graalfunc
fn invoke someapp graalfunc
```

### Using GraalVM `native-image'

If we look at the `Dockerfile`, we can see that it's a [multi-stage build](https://docs.docker.com/develop/develop-images/multistage-build/) as it uses multiple images (`fnproject/fn-java-fdk-build`, `fnproject/fn-java-native`, etc.).

The key part of the `Dockefile` is the following commands wehre a GraalVM container image (`fnproject/fn-java-native`) is used to invoke the `native-image` utility to compile our Java Serverless function into a native executbale. The benefit of this approach, i.e. buidling into containers, is that nothing is required on the developer machine, no GraalVM setup nor any Java installation!

```
FROM fnproject/fn-java-native:latest as build-native-image
WORKDIR /function
COPY --from=build /function/target/*.jar target/
COPY --from=build /function/src/main/conf/reflection.json reflection.json
COPY --from=build /function/src/main/conf/jni.json jni.json
RUN /usr/local/graalvm/bin/native-image \
    --static \
    --delay-class-initialization-to-runtime=com.fnproject.fn.runtime.ntv.UnixSocketNative \
    -H:Name=func \
    -H:+ReportUnsupportedElementsAtRuntime \
    -H:ReflectionConfigurationFiles=reflection.json \
    -H:JNIConfigurationFiles=jni.json \
    -classpath "target/*"\
    com.fnproject.fn.runtime.EntryPoint
```

The rest of the `Dockerfile` is pretty straight forward. 

### Conlusion

You can see that creating and using a GraalVM `native-image` is trivial as everything is handled by Fn via its `init-image` feature. To appreciate the underlying benefits, you should measure the size of the produced image. You can do that using `docker images` and the name of the function container image. If you didn't write the container image name earlier, `fn inspect someapp modularfunc` will give you all the details of the function, including its container image name. Another benefit is that the startup time of the "Java" function is improved as it is now invoked as a native executable.

```
docker images graalfunc:0.0.2
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
david               0.0.2               e7a57e4c755b        1 minute ago        20MB
```

:mega: You might want to check [`dive`]((https://medium.com/fnproject/dive-into-serverless-functions-5d1ba3572906)), a convenient tool to explore container image and its layers.

You can see that our function container image only weight **20MB** and it includes everything (and just that!) to run our Serverless function, i.e. the operating system and our `Java` function that has been compiled and linked into a native Linux executable. It should be mentioned that this executable doesn't require any external Java runtime as it also embeds SubstrateVM. As said earlier, the smaller the container image is, the faster it will be loaded from the registry when it is invoked. 

For more details on GraalVM integration in Fn, you can check this [article](https://medium.com/fnproject/serverless-functions-some-like-it-aot-ea8b46951335).
