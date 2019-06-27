---
layout: post
title: Dealing With Concurrency At The Cluster Level
---

Concurrency has always been a problem in software development. As soon as you have several path of execution, some part of your program may access the same resource at the same time... and problem happen at that particular moment.

In Java, we have several synchronization mechanisms that allow to prevent problems to occur. When it comes to distributed workload, we are not working inside the same JVM and we may be confronted to the same dangers.

Imagine for instance that you have a cluster of server that have to access a common resource. Let's say for instance some files on a share file system like NFS. If you don't pay attention, you're data will likely get corrupted very fast!

## A Stupid Counter

To illustrate the problem, let's write a very stupid counter, that will store its state on the filesystem.

```java
public class FsIntegerIncrement {

  private Path path;

  public FsIntegerIncrement(Path path) {
    this.path = path;
  }

  public int incrementAndGet() throws IOException, InterruptedException {
    int counter = 0;
    if (Files.exists(path)) {
      counter = Integer.parseInt(Files.lines(path, StandardCharsets.UTF_8).findFirst().get()) + 1;
      Thread.sleep(100);
      Files.delete(path);
    }

    Files.write(path, String.format("%s\n", counter).getBytes());
    return counter;
  }
}

```

We the expose that counter with a REST so that we can query its value:

```java
@Path("/")
@Produces(MediaType.APPLICATION_JSON)
public class IncrementAndGetAPI {

  @Context
  FsIntegerIncrement fs;

  @GET
  public Response doGet(@QueryParam("delay") String delayStr) throws Exception {
    return Response.ok().entity(String.format("%s", fs.incrementAndGet())).build();
  }
}
```

I can call my web application with `cURL` and see that the system behaves correctly if I test it unitary:

```shell
# curl http://localhost:8080/
0
# curl http://localhost:8080/
1
# curl http://localhost:8080/
2
# cat /tmp/counter
2
```

Manually, I'm not able to introduce any concurrency here, so I cannot see the problem of that code. Let's use another tool: [Apache Bench](https://httpd.apache.org/docs/2.4/programs/ab.html) that will allow to query our endpoint with multiple concurrent thread.


```shell
# ab -l -n 100 -c 1 http://localhost:8080/
This is ApacheBench, Version 2.3 <$Revision: 1826891 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking localhost (be patient).....done


Server Software:        Jetty(9.4.19.v20190610)
Server Hostname:        localhost
Server Port:            8080

Document Path:          /
Document Length:        Variable

Concurrency Level:      1
Time taken for tests:   10.957 seconds
Complete requests:      100
Failed requests:        0
Total transferred:      14300 bytes
HTML transferred:       300 bytes
Requests per second:    9.13 [#/sec] (mean)
Time per request:       109.568 [ms] (mean)
Time per request:       109.568 [ms] (mean, across all concurrent requests)
Transfer rate:          1.27 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.0      0       0
Processing:   103  109  11.0    108     216
Waiting:      103  109  10.9    108     215
Total:        103  110  11.0    108     217

Percentage of the requests served within a certain time (ms)
  50%    108
  66%    109
  75%    110
  80%    111
  90%    112
  95%    112
  98%    113
  99%    217
 100%    217 (longest request)
# cat /tmp/counter
99
```

The `-c` parameter allows to specify the concurrency. We start here with no concurrency, i.e. launching 100 `cUrl` one after another. We do not notice any failed request, and the result is what we expect: our counter has been incremented up to 99. Now let's add some concurrency and give 4 threads to `ab`.

```shell
# ab -l -n 100 -c 4 http://localhost:8080/

...

Time taken for tests:   2.528 seconds
Complete requests:      100
Failed requests:        0
Non-2xx responses:      6
Total transferred:      16557 bytes
HTML transferred:       2095 bytes

...
# cat /tmp/counter
16
```

The result is that we have some Non-2xx responses. These are linked to some errors that we can find in Jetty logs:
```
[WARNING] / java.nio.file.NoSuchFileException: /tmp/counter
```
But the most interesting thing is that our counter is totally wrong. It should be `99` and not `16`. This is because some thread may have tried to access the file when the file was deleted, and the resetted the counter. The big problem is that there were no error raised by our application for those, so it's very difficult to be alerted of the problem by just looking at the logs.


## Fixing Our Counter

A first approach to fix our counter, will be to use internal Java mechanism. We will `synchronize` the call to `incrementAndGet()` by adding the `synchronized` keyword to the method signature:

```java
  public synchronized int incrementAndGet() throws IOException, InterruptedException {
    int counter = 0;
    if (Files.exists(path)) {
      counter = Integer.parseInt(Files.lines(path, StandardCharsets.UTF_8).findFirst().get()) + 1;
      Thread.sleep(100);
      Files.delete(path);
    }

    Files.write(path, String.format("%s\n", counter).getBytes());
    return counter;
  }
```

```shell
# ab -l -n 100 -c 4 http://localhost:8080/

...

Time taken for tests:   10.906 seconds
Complete requests:      100
Failed requests:        0

...
# cat /tmp/counter
99
```

This time, our counter works. It takes the same time to serve 100 requests that if we use a concurrency of 1 which is totally normal.

## Evolving To A Cluster

Now, let's say that our counter has a lot of success, and that after some social buzz we have to scale our application. We want to launch more nodes of that application. To simulate this, we will launch our applications in a `docker-compose` behind a NGinx load balancer:

```yaml
version: '3'
services:
  lb:
    build: nginx
    ports:
      - 8080:8080
  node1:
    build: .
    ports:
      - "8081:8080"
    volumes:
      - ./tmp:/tmp
  node2:
    build: .
    ports:
      - "8082:8080"
    volumes:
      - ./tmp:/tmp
```

Let's test this infrastructure whith the same level of concurrency:

```shell
# ab -l -n 100 -c 4 http://localhost:8080/

...

Concurrency Level:      4
Time taken for tests:   4.152 seconds
Complete requests:      100
Failed requests:        0
Non-2xx responses:      22

...
# cat /tmp/counter
1
```

We have more errors, and the counter is.... totally wrong. It's even worse than when we had not put any synchronization on our single webapp. The problem here is that the two applications are totally independent and access the common file without knowing that the other may access it. The result is definitely disastrous. We now have to find a mechanism that will help the two application to communicate.

## Fixing our cluster

We now have to find a way for our cluster members to be aware of their peers. It's a complex problem, which involves the election of a master in the cluster, have to take into account network partitions and deal with plenty of problems of that nature. It's called a consensus algorithm, and you can look at the explanation of the [Raft Protocol](https://raft.github.io/) to understand it better: it's the protocal that is used by `etcd` for instance.

We will not code a Raft implementation for this simple exercise. Hopefully there is an opensource library that can do it for us that is called [Hazelcast](https://hazelcast.org/). It provides the Consensus algorithm, but more importantly a list of object that super useful when you want to deal with a cluster. One important thing to understand is that it's a library: there is no middleware to install, therefore it's super easy to use it in a Java application.

For our sample, we will expose a Hazelcast instance as an injectable bean in our application and use a Hazelcast `Lock` in our counter implementation.

```java
@ApplicationPath("/")
public class Application extends ResourceConfig {

    public class BindConfiguration extends AbstractBinder {

        @Override
        protected void configure() {
            bind(Paths.get("/tmp/counter")).named("counterPath").to(Path.class);
            bind(FsIntegerIncrement.class).to(FsIntegerIncrement.class).in(Singleton.class);
            bind(Hazelcast.newHazelcastInstance()).to(HazelcastInstance.class).in(Singleton.class);
            bind(LockService.class).to(LockService.class).in(Singleton.class);
        }

    }

    public Application() {
        register(new BindConfiguration());
        packages("com.dmetzler.hazelcast.jaxrs");
    }

}
```

The `LockService` is just a wrapper around Hazelcast `Lock` object. To _start_ our cluster library, we just have to call `Hazelcast.newHazelcastInstance()`, that's it! By default, it will use TCP multicast to discover other peers, but the mechanism is completely configurable and can use k8s services, AWS meta API etc... Here is how we modify our counter object:

```java
public class FsIntegerIncrement {

    private Path path;

    private LockService lock;

    @Inject
    public FsIntegerIncrement(@Named("counterPath") Path path, LockService lock) {
        this.path = path;
        this.lock = lock;
    }

    public synchronized int incrementAndGet() throws IOException, InterruptedException {

        lock.lock();
        try {
            int counter = 0;
            if (Files.exists(path)) {
                counter = Integer.parseInt(Files.lines(path, StandardCharsets.UTF_8).findFirst().get()) + 1;
                Thread.sleep(100);
                Files.delete(path);
            }

            Files.write(path, String.format("%s\n", counter).getBytes());
            return counter;
        } finally {
            lock.unlock();
        }
    }
}
```

Now let's try to launch that in our cluster and test it:

```shell
# ab -l -n 100 -c 4 http://localhost:8080/

...

Concurrency Level:      4
Time taken for tests:   11.679 seconds
Complete requests:      100
Failed requests:        0

...
# cat /tmp/counter
99
```

Our cluster is fixed! It taked a bit more time to achieve our 100 request, but that's the price of concurrency management. At least our data are not corrupted. If we look at the logs of the first node we can see the start of the Hazelcast cluster:


```
INFO [localhost-startStop-1] com.hazelcast.config.AbstractConfigLocator.null Loading 'hazelcast.xml' from the classpath.
WARNING [localhost-startStop-1] com.hazelcast.config.AbstractXmlConfigHelper.null Name of the hazelcast schema location is incorrect, using default
INFO [localhost-startStop-1] com.hazelcast.instance.AddressPicker.null [LOCAL] [dev] [3.12.1] Prefer IPv4 stack is true, prefer IPv6 addresses is false
INFO [localhost-startStop-1] com.hazelcast.instance.AddressPicker.null [LOCAL] [dev] [3.12.1] Picked [172.19.0.5]:5701, using socket ServerSocket[addr=/0.0.0.0,localport=5701], bind any local is true
INFO [localhost-startStop-1] com.hazelcast.system.null [172.19.0.5]:5701 [dev] [3.12.1] Hazelcast 3.12.1 (20190611 - 0a0ee66) starting at [172.19.0.5]:5701
INFO [localhost-startStop-1] com.hazelcast.system.null [172.19.0.5]:5701 [dev] [3.12.1] Copyright (c) 2008-2019, Hazelcast, Inc. All Rights Reserved.
INFO [localhost-startStop-1] com.hazelcast.spi.impl.operationservice.impl.BackpressureRegulator.null [172.19.0.5]:5701 [dev] [3.12.1] Backpressure is disabled
INFO [localhost-startStop-1] com.hazelcast.instance.Node.null [172.19.0.5]:5701 [dev] [3.12.1] Creating MulticastJoiner
INFO [localhost-startStop-1] com.hazelcast.spi.impl.operationexecutor.impl.OperationExecutorImpl.null [172.19.0.5]:5701 [dev] [3.12.1] Starting 4 partition threads and 3 generic threads (1 dedicated for priority tasks)
INFO [localhost-startStop-1] com.hazelcast.internal.diagnostics.Diagnostics.null [172.19.0.5]:5701 [dev] [3.12.1] Diagnostics disabled. To enable add -Dhazelcast.diagnostics.enabled=true to the JVM arguments.
INFO [localhost-startStop-1] com.hazelcast.core.LifecycleService.null [172.19.0.5]:5701 [dev] [3.12.1] [172.19.0.5]:5701 is STARTING
INFO [localhost-startStop-1] com.hazelcast.internal.cluster.ClusterService.null [172.19.0.5]:5701 [dev] [3.12.1]
node1_1       |
node1_1       | Members {size:1, ver:1} [
node1_1       |   Member [172.19.0.5]:5701 - b320441d-69cd-4164-90ce-50208022bf2d this
node1_1       | ]
node1_1       |
INFO [localhost-startStop-1] com.hazelcast.internal.management.ManagementCenterService.null [172.19.0.5]:5701 [dev] [3.12.1] Hazelcast will connect to Hazelcast Management Center on address:
node1_1       | http://management:8080/hazelcast-mancenter
INFO [hz._hzInstance_1_dev.MC.Task.Poller] com.hazelcast.internal.management.ManagementCenterService.null [172.19.0.5]:5701 [dev] [3.12.1] Failed to pull tasks from Management Center
INFO [hz._hzInstance_1_dev.MC.State.Sender] com.hazelcast.internal.management.ManagementCenterService.null [172.19.0.5]:5701 [dev] [3.12.1] Failed to connect to: http://management:8080/hazelcast-mancenter/collector.do
INFO [hz._hzInstance_1_dev.MC.State.Sender] com.hazelcast.client.impl.ClientEngine.null [172.19.0.5]:5701 [dev] [3.12.1] Applying a new client selector :ClientSelector{any}
INFO [localhost-startStop-1] com.hazelcast.core.LifecycleService.null [172.19.0.5]:5701 [dev] [3.12.1] [172.19.0.5]:5701 is STARTED
INFO [hz._hzInstance_1_dev.IO.thread-in-0] com.hazelcast.nio.tcp.TcpIpConnection.null [172.19.0.5]:5701 [dev] [3.12.1] Initialized new cluster connection between /172.19.0.5:5701 and /172.19.0.2:48119
INFO [main] org.apache.coyote.AbstractProtocol.start Starting ProtocolHandler ["http-nio-8080"]
INFO [main] org.apache.coyote.AbstractProtocol.start Starting ProtocolHandler ["ajp-nio-8009"]
INFO [main] org.apache.catalina.startup.Catalina.start Server startup in 11603 ms
INFO [hz._hzInstance_1_dev.priority-generic-operation.thread-0] com.hazelcast.internal.cluster.ClusterService.null [172.19.0.5]:5701 [dev] [3.12.1]
node1_1       |
node1_1       | Members {size:2, ver:2} [
node1_1       |   Member [172.19.0.5]:5701 - b320441d-69cd-4164-90ce-50208022bf2d this
node1_1       |   Member [172.19.0.2]:5701 - bdbfc37b-b3fa-4e63-918f-3f12a7f002ff
node1_1       | ]
INFO [hz._hzInstance_1_dev.MC.State.Sender] com.hazelcast.internal.management.ManagementCenterService.null [172.19.0.5]:5701 [dev] [3.12.1] Connection to Management Center restored.
INFO [hz._hzInstance_1_dev.MC.State.Sender] com.hazelcast.client.impl.ClientEngine.null [172.19.0.5]:5701 [dev] [3.12.1] Applying a new client selector :ClientSelector{any}
INFO [http-nio-8080-exec-1] com.hazelcast.internal.partition.impl.PartitionStateManager.null [172.19.0.5]:5701 [dev] [3.12.1] Initializing cluster partition table arrangement...
```

and specifically the time we the second member is recognized. We can play at stopping and starting a node to see that the cluster reacts to such node failure.


## Conclusion

We've seen that concurrency can be a vicious problem: even without throwing comprehensive errors, your data may be corrupted. Here it was just a counter, but it can be even more trickier with complex data. Whereas the JVM has internal mechanisms to handle concurrency, there is nothing in the JDK to handle it at the cluster level. Hopefully, the Hazelcast library allowed to use its lock mechanism to secure our counter.

Hazelcast has a lot of other structures that can be super useful in a clustered environment:

 * Maps an replicated maps: it allows to share data between your cluster's nodes
 * AtomicLong: which would have been a better implementation of our counter
 * Queues
 * Topics
 * Executors

However, we should also remind that Hazelcast stores everything in memory, so it's not suitable for storage persistence. The docker-compose used in that project also start the Hazelcast management console that can be accessed on port 8083. Feel free to explore it: you have a complete view of your cluster and can event launch commands and get statuses for all of the nodes.


## References
 - Code of this demo: [https://github.com/dmetzler/hazelcast-playground]()
 - Raft Consensus Algorithm: [https://raft.github.io/]()
 - Hazelcast IMDG: [https://hazelcast.org/]()
 - Apache Bench: [https://httpd.apache.org/docs/2.4/programs/ab.html]()
