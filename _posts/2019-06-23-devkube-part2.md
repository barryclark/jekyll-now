---
layout: post_with_photo
title: Fire up kubernetes from iOS using python
photo: IMG_1168.jpg
caption: Mum's resident sunbird
photo-meta: Pana GX7, Oly 14-150mm, Bramston Beach Qld Australia, 2015
---

This article shows how to create and use a cloud-hosted Kubernetes cluster using Python scripts on an iPad. The eventual goal is to be able to use an iPad as an end-user device for development of applications running in a cloud-hosted kubernetes cluster.

See https://github.com/drpump/devkube-python/tree/v1.0 for source. The scripts should also work on Linux and OS X.

### For the impatient

Prerequisites:
* [iSH](https://ish.app) or an equivalent linux/OS X command line
* git command line installed
* Python3 (on iSH, `apk add python-dev`)
* Public cert for your ssh key in `~/.ssh/id_rsa.pub`
* The python `requests` module (`pip3 install requests`)
* A Digital Ocean account and API token

```
  $ git clone git@github.com:drpump/devkube-python --branch v1.0
  $ cd devkube-python
  $ export DO_TOKEN=<my_token>
  $ python3 docluster.py   ### takes a while to create the cluster
  ...
  $ source cluster.env     ### load the cert and URL for cluster
  $ python3 -i exec.py
  ...
  >>> pk.deploy_nfs()
  Waiting for nfs startup ...
  Waiting for nfs startup ...
  nfs running in cluster on 10.244.0.218
  >>> pk.deploy_ssh()
  ssh accessible on port 30022 on IPs ['165.22.128.219', '165.22.128.246']
  >>> pk.deploy_web()
  web server accessible at http://165.22.128.219:30080
  >>> ^D
  $ ssh -p 30022 root@<your_node_ip>
  ...
  [root@sshd-012345678-9abcd]# cat > /mnt/nfs/index.html
  Hello from your kubernetes cluster
  ^D
  # 
```

Then navigate to the URL printed by `pk.deploy_web()` above to see the result.

If you are using a Linux or OS X machine, you can also use Visual Studio Code for [remote development](https://code.visualstudio.com/docs/remote/ssh) via ssh in this cluster. 

## Starting point

In my [previous article](https://drpump.github.io/devkube-part1/), I described the process of creating a basic kubernetes development cluster using YAML files. It contained an NFS server, web server (nginx) and editing container. The approach depended on having `kubectl` and a fully-fledged unix command line environment, making it impossible to use on iOS. My desire to deploy NFS into the cluster also presented some name resolution issues and required a manual cut/paste of the NFS server IP address into the YAML source.

This article describes the deployment of a similar kubernetes configuration using Python (v3.6) running on iOS using [iSH](https://ish.app). Extraction and use of the NFS server IP is  automated by the script. Since we can't use `kubectl exec` from an iPad to access the editing container, it has been replaced by an `sshd` container that allows us to ssh into the cluster securely.

If you don't happen to have an iOS device with iSH handy, the scripts here should also work in any Python3 environment with the [`requests`](http://docs.python-requests.org/en/latest/) library installed.

### Code Overview

There are four python scripts in the [git repo](https://github.com/drpump/devkube-python/tree/v1.0 ):

1. `docluster.py` creates a digital ocean kubernetes cluster with two nodes then saves the cluster URL and public/private keys for access.
1. `objects.py` has functions to construct the Python dict objects for each Kubernetes object that we need in our cluster. This is somewhat extensible in a fairly simple fashion.
2. `pykube.py` defines a class to encapsulate a kubernetes API session using `requests` and includes both generic and specific methods for calling the kubernetes api. It is somewhat extensible and suitable for use in an interactive python session.
3. `exec.py` is intended for loading into an interactive python shell, importing the required libraries and creating a pykube instance `pk` that is connected to your kuberetes cluster.

The original intent was to create a simple script to construct the kubernetes cluster. However, I wrote this code on my iPad and couldn't fall back on `kubectl`. Whenever something went wrong I had to build API calls to retrieve kubernetes objects and inspect them, or delete and recreate an object via the API. So `pykube` morphed into a set of functions that provide a subset of what you get from `kubectl`. For someone used to coding and REPL, it actually works really well and I like it much better than using `kubectl`.

Caveat: I've been coding for a long time, but I am a novice at Python. Code improvement suggestions from Python gurus are most welcome (pull requests would be great).

## About iSH

The process described here depends on [iSH](http://ish.app). iSH is a new iOS app that is available via [TestFlight](https://developer.apple.com/testflight/) (i.e. it's a beta app that you can use as a beta tester). iSH emulates an Intel processor and provides a Unix shell command line based on Alpine Linux. It also allows you to install binary packages with `apk`, making it an incredibly useful tool for programmers on iOS, especially if you're used to the Unix command line. I use it frequently, for example, to run git commands and ssh.

The python code discussed in the rest of this article was run in iSH after installing python3 and pip (`apk add python3-dev`). It *should* also be feasible to run these scripts in [Pythonista](http://omz-software.com/pythonista/), but I haven't yet worked out a way to save and load environment variables and I dont want to have passwords and keys in my repository.

## Creating the cluster

As in my previous article, I'm using the DigitalOcean kubernetes service. While I can use the web UI for cluster creation, I want to automate the process as much as possible so I wrote a Python script using `requests` to create the cluster and download the security credentials. The full code is available in `docluster.py`, but the key parts are discussed below. Note that the script needs a DigitalOcean token for authentication: to run the script, define a `DO_TOKEN` environment variable containing your DigitalOcean API token.

First the cluster creation code:

```
  # Define cluster and node pool parameters
  devpool = {
    'name': 'devpool',
    'size': 's-2vcpu-4gb',
    'count': 2
  }

  cluster = {
    'id': 'devkube 15Mar2019',
    'name': 'devkube',
    'region': REGION,
    'version': version,
    'node_pools': [devpool]
  }

  # Create the cluster
  cluster = requests.post(URL + 'clusters',	headers=AUTH, json=cluster).json()
  id = cluster['kubernetes_cluster']['id']
```

This creates the cluster and saves the cluster id, which we will need later.

I also added a wait loop to the script and after creation is completed it downloads the public and private keys required for cluster access:

```
  def cluster_info(id):
    return requests.get(URL + "clusters/" + id, headers=AUTH).json()['kubernetes_cluster']

  def cluster_running(info):
    return info['status']['state'] == 'running'

  while (not cluster_running(cluster_info(id))):
    print('Still waiting ...')
    time.sleep(10)
  print('Cluster running')

  # Get certs and keys for cluster
  conf_yaml = requests.get(URL + 'clusters/' + id + '/kubeconfig', headers=AUTH)
```

The `conf_yaml` returned by the `kubeconfig` request contains three keys:
1. A public key for the certificate authority (saved in `ca.pem`)
2. A client public key (saved in `cert.pem`)
3. A client private key (saved in `key.pem`)

These are subsequently used to create a secure session for accessing the cluster kubernetes API. A `cluster.env` file is also written to define two environment variables `DO_CLUSTER_ID` and `DO_CLUSTER_URL` for use in subsequent scripts.

See the code for all the gory details. Once you run it successfully, you will have a DigitalOcean kubernetes cluster ready for use.

## The kubernetes library

The first point of call for accessing the kubernetes API was to install the [python kubernetes](https://github.com/kubernetes-client/python) library. This was troublesome on an iPad: I got there after lots of trial-and-error, only to find that the generated swagger code was unnecessarily complex and painful to work with. So I switched to vanilla REST/JSON via `requests`. Read on if you're interested in the kubernetes library install into iSH, otherwise skip to the next section.

I started by trying to load the library into [Pythonista](http://pythonista.app), but quickly found that it's handling of library dependencies was lacking and some libraries wouldn't install. So I switched to iSH as discussed above.

Turns out that the Python kubernetes library depends on a number of native code modules that `pip` (python library manager) wants to compile, so no chance it would have worked in Pythonista anyway. Through a chunk of trial-and-error, I finally installed the Python kubernetes library through the following commands in iSH:

```
  $ apk add python3
  $ pip3 install —upgrade pip
  $ apk add gcc
  $ apk add python3-dev
  $ apk add musl-dev
  $ apk add linux-headers
  $ apk add libffi-dev
  $ apk add libressl-dev
  $ pip3 install kubernetes
```

The last step in the installation above takes a while because it's compiling a bunch of code in an emulated environment: go make coffee :).

## Building JSON k8s API requests

A somewhat easier path than the kubernetes python library was to build Python `dict` objects (hashes) and send them as JSON using `requests`. It also means we can avoid C library dependencies, which are never easy to manage on a relatively closed platform like iOS. There were quite a few steps and mis-steps along the way. Here are the higlights:

### Authentication

We use an `https` session to access the Kubernetes REST API. Kubernetes requires mutual authentication (i.e. both the client and the server require public/private keys). Since we've saved the necessary keys when creating the cluster, this is as simple as:

```
  sess = requests.Session()
  sess.cert = ['./cert.pem','./key.pem']
  sess.verify = 'ca.pem'
```

Note that the `verify` is required because Kubernetes uses a self-signed certificate (`ca.pem`) to generate keys. Python complains that it doesn't recognise the certificate authority if you don't identify the CA key. You could alternatively turn off verification but this is poor security practice.

This code has been encapsulated in the class constructor in `pykube`, so you can create a new session as follows:

```
  >>> import pykube
  >>> pk = pykube.PyKube()
```

It's also possible to authenticate to the kubernetes API using a bearer token signed with the client private key, but this is a somewhat more complex process and still needs bootstrapping using the private/public key pair.

### Kubernetes objects definitions

The `objects.py` script contains functions to generate python `dict` objects that match [Kubernetes objects](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.13/). These are converted in to JSON by the `requests` module and sent to the API. Let's look at the service object functions as an example. First the `objects.service()` function:

```
  def service(name, spec, namespace):
    return {
      'api_version': 'v1',
      'kind': 'Service',
      'metadata': {
        'name': name,
        'namespace': namespace
      },
      'spec': spec
    }
```

This requires a `name`, service `spec` dict and a `namespace`. The `spec` is where all the details of the service are defined and there are lots of variations, but a common pattern is to expose a service on a particular external port in the cluster, so we also define an `exposed_service()` function that adds an appropriate `spec` object:

```
  def exposed_service(name, match_role, port_name, port, nodeport, namespace):
    "Service object for server listining on port, exposing on nodeport"
    spec = {
      'type': 'NodePort',
      'ports': [{
        'name': port_name,
        'port': port,
        'nodePort': nodeport,
      }],
      'selector': {
          'role': match_role
      }
    }
    return service(name, spec, namespace)
```

To use this function, we need to provide a `name`, a label matcher (in my case, I use a `role` label for matching a service with servers), port details and a namespace. For the nginx server, for example, it looks like this:

```
  def web_service(match_role=WEB_SERVER_ROLE, namespace='default'):
    return exposed_service(WEB_SERVICE, match_role, 'http', 80, 30080, namespace)
```

This creates a Kubernetes object for a service that expects service instances (i.e. containers running nginx or similar web server) to listen on port 80, and exposes that port externally on port 30080. Once the server container is running and the service object is deployed, you can hit `http://<address>:30080/` with your web browser to access the web server. `<address>` can be the public IP address of *any* node in your cluster. `pykube` provides a convenient `get_node_ips()` function to retrieve node IP addresses.

Note that on most kubernete platforms, exposed port numbers must be > 30000 unless you modify the kubernetes cluster configuration.

### API URLs

The kubernetes API URLs are becoming more and more consistent, making it relatively straightforward to determine URLs from the object definition. You need to know four things: the base URL (our `CLUSTER_URL` environment variable), the object's `api_version`, the object's `kind` and the kubernetes namespace.

`pykube.py` has a set of functions that deduce the URL from an object (at least, for the objects that we're creating), meaning we can easily create and manage new objects once we have a correct Python dict object. The functions for determining an object path looks like this:

```
  def kind_of(object):
    return object['kind'].lower() + 's'

  def name_of(object):
    return object['metadata']['name']

  def version_of(object):
    return object[VERSION]

  def object_path(object, namespace='default'):
    return(named_path(kind_of(object), name_of(object), version_of(object), namespace))
```

For a service object, this would return something like `https://${CLUSTER_URL}/api/v1/namespaces/default/services/<name>`. The only part that's still slightly inconsistent is getting the right API path:

```
  def api_path(version=CORE_VERSION):
    if version == CORE_VERSION:
      api = 'api/v1'
    else:
      api = 'apis/' + version
    return '{base}/{api}'.format(base=URL, api=api)
```

Or in other words, the Kubernetes core API uses a slightly different convention from more recent APIs.

### Managing objects

Once we have constructed an object url, inspecting and deleting objects looks like this:

```
  from pykube import object_path
  from objects import pvc
  pk.sess.get(object_path(pvc())).json()
  pk.sess.delete(object_path(pvc()).json()
```

Creation requires that you drop the object name from the URL, so we have an `object_kind_path` function that returns the base URL for the kind:
```
  def object_kind_path(object, namespace='default'):
    return kind_path(kind_of(object), version_of(object), namespace)
```

And creation is thus:
```
  from pykube import kind_path
  pk.sess.post(kind_path(pvc()), json=myobject)
```

`pykube` also rovides convenience functions for creating related groups of objects (e.g. the objects required for the nfs server). These are discussed in the following sections.

### NFS server

The NFS server configuration is the same as in the previous article but coded in python. There are three objects: a persistent volume claim (`objects.pvc()`) an nfs server (`objects.nfs_server()`) and an nfs service(`objects.nfs_service()`). `kubecreate` provides a convenience function to create these so you can call:
```
  >>> pk.deploy_nfs()
```

The function takes care of retrieving the NFS server IP address and inserting it into the configuration.

### SSH server

A new component in this configuration is the ssh server, which allows you to ssh into the cluster since we can't rely on `kubectl exec` or `kubectl proxy` for cluster access. Fortunately, [c4po](https://github.com/c4po) has already done the hard work here and created a container image that can be used easily and securely in a kubernetes cluster: `https://github.com/kubernetes-contrib/jumpserver`. A pre-built image is available on [dockerhub](https://hub.docker.com/r/kubernetesio/sshd-jumpserver).

A requirement, however, is that you need to provide the public key for your ssh keypair. We do this using a kubernetes secrets object, populated using `$HOME/.ssh/id_rsa.pub` by default:

```
  PUBKEY_PATH = os.environ['HOME'] + '/.ssh/id_rsa.pub'

  def encode_pubkey(path=PUBKEY_PATH):
    f = open(path, 'rb')
    return base64.standard_b64encode(f.read()).decode('ascii')

  def ssh_pubkey(pubkey=encode_pubkey()):
    "Secrets object containing public key for rsa_id, requires rsa public key for authorised user encoded as base64"
    return {
      'api_version': 'v1',
      'kind': 'Secret',
      'metadata': {
        'name': 'sshkey'
      },
      'type': 'Opaque',
      'data': {
        'authorizedkeys': pubkey
      }
    }
```

The creation of the secret, ssh server and ssh_service is wrapped up in a convenience function. Assuming you have your ssh public key in `${HOME}/.ssh/id_rsa.pub`, you can just do:

```
  >>> pk.deploy_ssh()
```

This creates a CentOS container running sshd and will print the IP address and port number you can use to login. So `ssh root@<node_ip> -p 30022` gets you a terminal session in this container. The previously-created NFS server share will also be mounted. The ssh server will only allow connections made using your private key, so this is reasonably secure (I'm trusting c4po not to include any backdoors).

Note that for debugging purposes, it might be useful to create an ssh instance that doesn't mount the nfs share. I did this initially because I had an error in my `nfs_server()` object. We have two deployment base objects, `deployment()` and `nfs_deployment()`, so the change is to switch out the `nfs_deployment()`. A good exercise for you to try at home.

### Web server

The web server configuration is the same as in the previous article, just re-coded in python. It consists of a `web_server()` object reading content from the NFS share, and a `web_service()` object to expose the web server on port 30080. To deploy them:

```
  >>> pk.deploy_web()
```

It will print the URL for the server so you can browse there and see the default nginx home page. Now login to the ssh server and add some HTML content to `/mnt/nfs/index.html` then refresh your browser. Hello world!!

### Other convenience functions

`pykube` provides a few other convenience functions to make it easier to use in an interactive shell. Key ones:

* `pk.ppo(object)` will retrieve the specified object and its status via the API then prettyprint the returned JSON, e.g. `pk.ppo(objects.web_server())`
* `pk.ppk(kind)` will retrieve a list of objects of the specified kind then prettyprint the returned JSON, e.g. `pk.ppk('endpoints')`
* `pk.get_node_ips()` will retrieve node information and extract the IP addresses of kubernetes cluster nodes

Note that throughout this article I've used the default namespace (`default`) but most functions allow you to override.

## Wrapping up

If you've followed me this far, you'll have a working kubernetes cluster in DigitalOcean created entirely from a Python script running on an iPad. The scripts are pretty straightforward and the cluster creation script should be adaptable to work with your favourite kubernetes provider.

#### The good
* The cluster creation steps are now automated
* You can create a working cluster from your iPad or even your iPhone, which significantly increases the convenience factor over `kubectl`
* You can provision and manage kubernetes using a structured, well-defined and well-known programmming language
* The configuration provides some ability to debug through retrieving cluster objects and ssh into the cluster
* Further, you might even prefer using the `pykube` functions over `kubectl`, although admittedly the scope is more limited
* The python code has minimal dependencies and requires no C libraries, making it quite portable
* ssh access to the cluster is reasonably well secured
* If your source machine can run Visual Studio Code, you can use the remote development capability on the cluster.

#### The bad
* We still don't have a useful editing solution for an iPad: using `vim` via ssh is not really a solution. Local editing (e.g. `GoCoEdit` or `TextTastic`) with rsync for synchronisation seems achievable via iSH but needs some scripting for usability and still doesn't provide IDE capabilities. 
* The ssh container image has quite a limited set of tools. Ideally it would include `rsync` and `git` for content, plus network tools for debugging the cluster.
* The http service is still unsecured. Tunnelling via ssh is an option although might not work on an iPad. Using https via an ingress controller or load balancer is still preferable.
* We haven't yet deployed a real application server, database or cache.
* Digital Ocean doesn't yet provide a way to re-attach an old volume to a new kubernetes cluster. So you need to push all of your code before destroying the cluster, and manually destroy the volume after the cluster is destroyed. 

#### The future
* I'll extend the ssh container image with appropriate tools, possibly using two containers (one for cluster management/debug, and one for content creation/sync)
* With the pending iPadOS (iOS 13) browser changes, it becomes more feasible to deploy and use a browser-based IDE like [coder.com](https://github.com/cdr/code-server). So I'll deploy and test this browser-based IDE container
* I'll add a database and cache
* I'll add an application server, most likely Rails in the first instance
* I need to somehow bootstrap the content in application server instances. In Rails, for example, we would need to checkout or upload the application, seed the database, etc. Ideally this can be automated so that if you're using a set of microservices but only actively develop one of them, the others can be automatically deployed, seeded etc. Alternatively, we could deploy production docker images for read-only microservices.
* I need a logging solution. Deploying ELK or similar might be worthwhile.
