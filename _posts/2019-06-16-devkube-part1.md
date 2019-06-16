---
layout: post_with_photo
title: A writable kubernetes cluster for software development
photo: P1150032.jpg
caption: Looking south from Stanwell Tops
photo-meta: Pana GX7, Pana 12-32mm, 2019 Stanwell Tops, NSW Australia
---

Create a kubernetes cluster that includes a writable, persistent NFS service so that you can 
develop applications inside kubernetes. 

See https://github.com/drpump/devkube-yaml/ for source. 

## Overview

Most of my software nowadays is being deployed 
in containers on a cloud platform, increasingly using kubernetes. I feel uncomfortable 
when my dev environment really doesn't look much like
production, so I want to set up my dev environment in the cloud using kubernetes. 

There is a key barrier here: I don't want to build a new container image every
time I change my code. I want to modify the code, reload a web page or re-run 
a service call and "hey presto" my new code runs (or fails, hopefully spectacularly).
My code changes also need to persist so I can check them into github or bitbucket once
I reach a point where something useful is completed, unit tests run etc. 

Using host storage directly from a containers is not a solution: kubernetes typically runs on a cluster 
across multiple nodes, so host storage cannot be shared reliably across containers. 

[Skaffold](https://skaffold.dev) can provide real-time sync from your local machine to kubernetes pods, and this is fine if
you have a fully-fledged *nix commandline at your disposal and can satisfy the laundry list
of dependencies. But I want something simple and portable that could conceivably work on an iPad. 

This is my starting point. 

## The components

To build a dev environment using containers, we need at least three components:

1. *An application runtime container*. For simplicity I'm using [nginx](http://nginx.org). 
   Later on, once I've got other things sorted, I'll tackle something a bit more substantial, 
   maybe rails or django.
2. *An editing/coding container*. For now, I'm using an 
   [Alpine Linux](https://alpinelinux.org) container and editing with vim. We can build from there.
3. *Shared, writable, persistent storage*. Persistent storage is a bit of a pain with containers
   in the cloud. Especially if you need to share it between containers that might or
   might not be co-located. Enter _NFS_.

The idea is that the application runtime will dynamically load code (html/css/js) from the shared
storage and I can modify that code in my coding container. Even though we're
using nginx as the app server, the same principle applies to nodejs, rails, django, php etc. 

We can add database and other dependencies in a future iteration: they're actually somewhat easier to
set up and there are lots of kubernetes examples around. 

The remainder of the article discusses working `yaml` configurations for setting up the 
kubernetes cluster. I'm going to assume that you know how to create a cluster, connect to it,
and load `yaml` configurations with `kubectl apply -f <yaml_file>`. 

## Storage with NFS

My solution to the storage problem is to run an NFS server, allowing all of the components
to read/write shared storage. I want the NFS server in my kubernetes cluster, 
partly because I can run it as a cluster internal service (private and somewhat secure), 
and partly because I can automate the provisioning of the service. 

Kubernetes has a nice abstraction for storage called a _Persistent Volume Claim_, and most
cloud providers have a way to encapsulate their persistent storage using this abstraction.
The [Digital Ocean](https://www.digitalocean.com/products/kubernetes/) variation looks like this ([nfs-volume.yml](http://github.com/drpump/devkube-yaml/blob/master/nfs-volume.yml)):

```
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: nfs-pvc
spec:
  accessModes:
  - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
  storageClassName: do-block-storage
```

This creates a 1GB volume that I can attach to my NFS server by claiming `nfs-pvc`. A similar 
configuration should be possible in other kubernetes environments, including MiniKube. Wrapping
it in a _Persistent Volume Claim_ isolates our dependency on Digital Ocean so the remainder of the configuration 
should work in any kubernetes environment. 

The NFS server deployment looks like this ([nfs.yml](http://github.com/drpump/devkube-yaml/blob/master/nfs.yml)):

```
apiVersion: extensions/v1beta1
kind: Deployment
metadata:s
  name: nfs
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: nfs
        role: nfs-server
    spec:
      containers:
      - name: nfs
        image: "janeczku/nfs-ganesha:latest"
        ports:
          - name: nfs
            containerPort: 2049
          - name: mountd
            containerPort: 20048
          - name: rpcbind
            containerPort: 111
        volumeMounts:
          - name: nfs-volume
            mountPath: /data/nfs
        securityContext:
          privileged: true
      volumes:
        - name: nfs-volume
          persistentVolumeClaim:
            claimName: nfs-pvc
```

The `nfs-ganesha` image runs a user-space NFS server (i.e. not root) and shares files in `/data/nfs`, 
so we mount our persistent volume on that path. Once applied, we have an NFS server running in our 
cluster, sharing persistent storage that can be used (read/write) from any pod. Be aware that there
is no security on this nfs server, hence my desire to run it within the cluster. 

In this case we are referencing a docker image on http://dockerhub.io. Check your kubernetes provider
documentation to ensure that this will work in your case (mostly it will).  

It's perhaps worth noting that we use a `Deployment` template here. The result of 
deploying will be a single pod. We could alternatively configure a `Pod` directly if we know there is only going 
to be one instance, but general advice from the 'net is to use `Deployment`.

## The tricky part: nfs kubernetes services

To make this NFS share available to other pods in the cluster, we also need to create a kubernetes service 
using the following configuration ([nfs-service.yml](http://github.com/drpump/devkube-yaml/blob/master/nfs-service.yml)):

```
apiVersion: v1
kind: Service
metadata:
  name: nfs-server
  namespace: default
spec:
  type: ClusterIP
  ports:
    - name: nfs
      port: 2049
    - name: mountd
      port: 20048
    - name: rpcbind
      port: 111
  selector:
    role: nfs-server
  clusterIP: None
```

While the above looks simple, I spent a stack of time googling to resolve a number of issues that 
arose. The details are worth remembering:

* Kubernetes expects services to have multiple instances (containers) and a load balancer
  fronting them. Our NFS server only needs to serve a single client, 
  and only one node can attach the volume (Digital Ocean limitation) so the value in 
  running multiple instances and a load balancer is limited. The `clusterIP: None` tells 
  kubernetes that this is a _headless_ service that does not require a load balancer and can
  be accessed directly.
* The `selector` defines the label that kubernetes will use to find service instances, in this 
  case `role: nfs-server`. Our nfs service instance has this label in its metadata. Without it, 
  the service won't be able to find the instance. You might see other configurations use an `app:` label 
  rather than `role:`. Either will work, but I prefer `role:`.
* The ports defined in the service are the ports used to expose the service within the cluster. 
  By default, kubernetes maps these ports to the same-numbered port on containers offering the service.
  An additional `targetPort: <portnumber>` specification can be used to map to a different port on the 
  container if required. In our case the port numbers are the same and this is not required.
* If DNS is enabled in your cluster (enabled by default in Digital Ocean), 
  a DNS record for `nfs-server.default.svc.cluster.local` will be added (i.e. using `name` and `namepace` 
  from the service metadata). If no namespace is defined, `default` is used. But here's the rub: the  
  kubernetes `kubelet` component creates pods and the enclosed containers in a deployment, and the cluster
  DNS is not available to `kubelet` and it can't resolve the name. So to mount the NFS share in a pod,
  we need to inject (edit) the NFS server IP address into configuration before deploying our dependent 
  pods. If you use the DNS name, the deployment of those pods will repeatedly fail trying to mount the 
  NFS volume. 
  
## Deploying the application server

So we have our NFS server deployed and associated service configured. To find out the nfs-server IP, use 
```
$ kubectl describe services
...
Endpoints:  10.244.1.24:2049
...
```

Look for one of the `Endpoints: ` lines in the service description and add the IP address to the
nginx configuration then deploy ([web-pod.yml](http://github.com/drpump/devkube-yaml/blob/master/web-pod.yml)):

```
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: nginx
spec:
  template:
    metadata:
      labels:
        role: web-server
        app: nginx
    spec:
      containers:
        - name: nginx
          image: "nginx:latest"
          volumeMounts:
              # name must match the volume name below
              - name: nfs-mount
                mountPath: "/usr/share/nginx/html"
          ports:
            - name: web
              containerPort: 80
      volumes:
        - name: nfs-mount
          nfs:
            server: 10.244.1.24
            path: "/"
```

Note that we're mounting `/` from the NFS service on the nginx `html` directory, so anything we add to our 
NFS share will become accessible through the web service. A subordinate directory could be used if desired 
to limit the scope (e.g. `/html/`).

Our nginx server should be running so now we need to define a service so that it is accessible ([web-service.yml](http://github.com/drpump/devkube-yaml/blob/master/web-service.yml)):
```
apiVersion: v1
kind: Service
metadata:
  name: web-server
  namespace: default
spec:
  type: NodePort
  ports:
    - name: http
      port: 80
      nodePort: 30080
  selector:
    role: web-server
```

Once again, our `selector` matches a label on the nginx instance so that the service can find it. 
We actually want to make the service visible outside the cluster, which is done as follows:

* Using `type: NodePort` tells kubernetes to make this service accessible outside the cluster via _any_ 
  node in the cluster. 
* The `nodePort: 30080` tells kubernetes to make the service accessible on port `30080`. Kubernetes will
  only allocate port numbers from a range defined in the platform configuration. This is typically `30000-32768`. 
  If you don't specify a nodePort, kubernetes will allocate one automatically and you can use `kubectl get services` 
  to find it. 

To find the node IP addresses, run 
```
$ kubectl describe nodes | grep ExternalIP
```
Say we have a node with the IP address `245.122.10.11`, we can navigate to `http://245.122.10.11:30080/` and 
see the default nginx home page.

You can use more usual port numbers (i.e. 80, 443) through configuration of a kubernetes _ingress_ controller. 
Depending on the controller chosen, it can automate the deployment of certificates etc. Services can alternatively
be made accessible via a cloud-provided load balancer using `type: LoadBalancer`. For now, we've just kept things simple
but remember that it's not private.

## Adding content 

So we now have an application server serving content from a writable NFS share. We need a way to get content onto the share. 
It's also kinda handy to have an accessible container in the cluster with a few tools you can use for debugging and testing. 
For this purpose, I've deployed a minimalist Alpine Linux container as follows ([alpine.yml](http://github.com/drpump/devkube-yaml/blob/master/alpine.yml)):
```
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: alpine
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: alpine
    spec:
      containers:
        - name: alpine
          image: "markeijsermans/debug:alpine"
          command:
            - sleep
            - "9999999"
          volumeMounts:
              # name must match the volume name below
              - name: nfs-mount
                mountPath: "/mnt/nfs"
      volumes:
        - name: nfs-mount
          nfs:
            server: 10.244.1.24
            path: "/"
```

Note again the hard coded NFS server IP address. We've mounted the root directory of the share at `/mnt/nfs`. We've
also asked the instance to sleep for a long while to keep it operating while we add content (otherwise the 
container would exit immediately).

To add content, we need to connect to this instance. In future I'll likely use an sshd/rsync container so we 
can use more sophisticated tools from a remote machine and sync content with `lsyncd` or similar, 
but for now, we'll use the container `exec` command to run a shell in the container and create some 
content. Something like:
```
$ kubectl get pods
...
alpine-7f4c9b4b7f-cd2xf
...
$ kubectl exec alpine-7f4c9b4b7f-cd2xf -it ash

alpine # cat > /mnt/nfs/index.html
Hello from the NFS share
^D
alpine #
```

Now if you refresh your exposed app server address, hey presto, this content appears in your browser in 
place of the default nginx page. 

## Wrapping up

We've created a simple, writable development environment using kubernetes in the cloud. Our code is stored 
safely on a persistent volume hosted by the cloud provider. We can start and stop our cluster at any time.

What's good about this:
* I can develop from anywhere provided I'm able to bootstrap the cluster (at present using kubectl) and
  upload or edit the content.  
* My development environment is now somewhat closer to what we actually use in production. And with a bit
  more work, I can make it even closer.
* Following from the above, I can easily deploy other services/microservices that my component depends
  upon, in a similar manner to production environments.
* I can optimise costs by only running the cluster when I need it.
* I can allocate resources to the cluster to match my performance needs at the time.
* I no longer need a $5K laptop to get the grunt required for software development.
* It's quick and easy to fire up a development environment for a newly hired developer.

What's missing or wrong:
* _(rant)_ I detest writing boatloads of boilerplate YAML code. _Programming the infrastructure_ (sic)
  is really a bit of a farce at present and an anathema to good coding and DRY principles (*D*on't 
  *R*epeat *Y*ourself). My next version of this will be in Ruby or Python, which have fairly elegant 
  structuring and abstractions (classes, modules, error-handling etc). 
* Scripting the configuration will allow me to collect the NFS service IP address and inject automatically
  into the other component deployments instead of ugly, manual editing of YAML mid-deployment.
* Editing application content directly in the cluster via ssh or similar is likely to be tedious. 
  A mechanism to edit locally and sync/copy is required. `lsyncd` is a likely candidate here.
* We're exposing our http service and all of its content directly on the web with no encryption for
  privacy. We should disable this and use https via an ingress controller, or create a tunnel into the
  cluster using ssh or the `kubect proxy` command. I prefer https since this is more easily shared
  with co-workers. 
  
And for the future:
* We need to add databases, cache servers etc to provide a realistic environment. For development,
  I lean towards running these in containers within the cluster. This ensures portability 
  across cloud platforms, although might look less like production if you're using cloud database
  services like RDS, snowflake etc in production. The containers can also use the NFS share if desired,
  keeping all of your persistent data in one place.
* I want to be able to develop on my iPad. With this setup I'm getting close, but lsyncd is 
  not yet available and the editors available are still a bit rudimentary for my taste, particularly
  when it comes to searching across files (e.g. find me the definition of that class/function in my project).
* Scripting the configuration in Python would also allow me to bootstrap from an iPad via 
  Pythonista, iSH or BlinkSH. Ruby is unfortunately not yet available on an iPad, which suggests
  python is the best target. I'm trying to avoid a heavy dependency on kubectl for this reason.
* Package management is likely to require some thought when using ruby/python/nodejs app servers. As a 
  developer, I'm updating packages regularly enough that I'd prefer they were maintained in my writable
  NFS share rather than read-only in a container image. The default locations used by pip, rvm, rbenv 
  etc would need to be modified. 
  
Comments, suggestions etc are welcome!

