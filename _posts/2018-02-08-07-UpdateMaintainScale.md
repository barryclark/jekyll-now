---
published: false
---
# Update, Maintain and Scale your Data Science Pipeline

> This is the seventh and final article in the series discussing the elements required to transform a locally developed data science model to a production-ready machine.

In the series, we deployed a robust Tyco-inspired pipeline with containers and orchestrated the flow of data with Pachyderm and Kubernetes(K8s). 
Our pipeline has:

- overall input as image files,
- overall output as email-notifications/plots
- processing stages as threat-detect/validate/model containers
- object repos acting as intermediary inputs-outputs

We automated the working of above pieces together, barring the entry point where we input images. Inputting images can be automated with the help of integrating services from other data teams. We also discussed the key roles of:

- [Pachyderm](https://github.com/anuragsoni9/ProductionScale/blob/master/02-%20Storage.md) in preserving the state of data at a particular point of time (Data Provenance) 
- [Kubernetes](https://github.com/anuragsoni9/ProductionScale/blob/master/06-pipeline2.md) in the orchestration of [Docker](https://github.com/anuragsoni9/ProductionScale/blob/master/05-containers.md) containers.

In this final installment, we don the hat of a mechanic for this pipeline. We aim to go over activities that are required routinely after the first deployment. Note that the team required to keep the pipeline running at this stage is expected to be much smaller than an equivalent Hadoop ecosystem team, owing to the automation of infrastructure pieces and simplicity of re-configuration needs.
Three categories of expected post-deployment tasks are: 

- Incremental Updates
- Debugging and Maintenance  
- Scaling


## Incremental Updating

Do you want to change something you built earlier? Of course, you do. Like Software Engineering, Data Science world works often in project life-cycles where things get changed constantly. The simplicity of change in Pachyderm lies with its JSON file specifications and its one wrapper command service `pachctl` . 

Two types of changes that are most frequent:

1. **Pipeline**

This involves addition/deletion/re-configuration of stages.  Pipelines are defined in JSON file specification and can be changed there. Once changed, the file can be run normally as you would when you created the pipeline with CLI tool `pachctl`, but with a new parameter `update-pipeline`.

For instance, new registry can be added to JSON  

    {
      "pipeline": {
        "name": "threat-detect"
      },
      "transform": {
        "image": <new image source>,  #new registry to source docker image
       ...
       ..
    }

which can then be updated with the following command


    $ pachtl update-pipeline -f threat-detect.json


2. **Code**

Updated code needs a rebuilding of docker image which would entail changes in Dockerfile specification in JSON(updated `threat-detectedV2.json` ) where it refers to the code file (updated `threat-detectV2.py`).
For example, the following command builds a docker image file with tag V2:

    $ docker build -t <repo location>:V2

alternatively, pipe a `Dockerfile` from `STDIN` 

    $ docker build - < Dockerfile

> To find more about building a docker image, refer to the [documentation](https://docs.docker.com/engine/reference/commandline/build/#text-files).

New versions of code can then be pushed into the pipeline:

    $ pachctl update-pipeline -f threat-detectV2.json 

Updating the pipeline will create a new tag for `threat-detect V2` Docker Image, which corresponds to the new version of code.  It will pull-in only the layer of python file to commit the change. This is quicker than K8s redeploying the other layers when change is made on a very small piece in one layer. For example, redeveloping in a different language and layering all the new dependencies will be delayed a lot with its first installation than a change in original Python script.
When this gets run by K8s, Pachyderm pod running with `threat-detect` container will be killed and new Docker image will be created. 

> To find about more options about pushing it to registry(e.g. Dockerhub), refer to the [Documentation](http://docs.pachyderm.io/en/latest/pachctl/pachctl_update-pipeline.html).


## Debugging and Maintenance

One aspect of maintenance in our pipeline is automatically handled by K8s and Pachyderm - former auto-heals itself out of a broken container while latter keeps track of the data it processed before failure and ensures right starting point of newly created container.
Other miscellaneous activities involved are:

- Debugging of goof-up code or Data-Quality flags which led to the changed behavior from development environment to production. This can be done by [log analysis](https://en.wikipedia.org/wiki/Log_analysis) - 
  - *Kubernetes flavor* 
      $ kubectl logs ${POD_NAME} ${CONTAINER_NAME}
  
  - *Pachyderm flavor*
    $ pachctl get-logs --job=aedfa12aedf # return logs emitted by the job id aedfa12aedf 


- Resource Monitoring:
Periodic utilization can be tracked on Kubernetes and Cloud internal dashboards. This involves accessing Performance reports for effective understanding of the current state and serves as an input for road map of predictive maintenance.
![Dashboard UI workloads page](https://github.com/kubernetes/dashboard/raw/master/docs/dashboard-ui.png)

- Migration:
As long as persistent volume or the object storage bucket is there, it can be migrated and spun up anytime.This has been made easy with the  advent of managed service with cloud providers like [GKE](https://cloud.google.com/kubernetes-engine/)(Google Kubernetes engine) and [Amazon EKS](https://aws.amazon.com/eks/)(Elastic Container Service).  

> More Troubleshooting documentation on Pachyderm can be found [here](http://docs.pachyderm.io/en/latest/managing_pachyderm/general_troubleshooting.html#problems-running-pipelines)

> More Troubleshooting documentation on Kubernetes can be found [here](https://kubernetes.io/docs/tasks/debug-application-cluster/troubleshooting/).


## Scaling

Pachyderm has in-built intelligence to scale-up distributed data. Compared to 
Hadoop, where developers have to code in the Map and Reduce stage (Scala object), Pachyderm internally handles the distribution between containers based on defined *specs* (defining number of workers) and *Pattern match*(defining each worker responsibility).


1. **Specs-based(“parallelism_spec”)**

Here, parallelization is done at the implementation level rather than the code level. Multiple instances of identical pods (workers) could be spun up to handle the increased work-load requirement.
In JSON pipeline spec, either of the two parameters can be set: 

- `constant` : fixed number of workers
  This option is preferred when forecast of resource demand is more accurate, e.g. Subscribed services.
- `coefficient`:  multiple of K8s cluster’s size
  This option is preferred when the resource demand is variable, e.g. Freemium services. 
     "parallelism_spec": {
        // Exactly one of these two fields should be set
        "constant": int
        "coefficient": double

Given that Tyco-like services are based on the subscribers, we can set them as `constant` 
and periodically tweaks the number as and when customer base scales up. This will correspond to the constant number of workers per K8s node.

For instance, as the object detection phase(TensorFlow) is the bottleneck process in our pipeline, it makes sense to spin up multiple Pachyderm workers. 

![](https://d2mxuefqeaa7sj.cloudfront.net/s_D058D34B483005C4EC4C4FB32AC82DF46514F221E2AFF7E731D5FEB7D46151E7_1513074688908_Production+Data+Pipeline+-+Tyco+with+Distribution.svg)

2. **Pattern-based**

Patterns in [data](https://en.wikipedia.org/wiki/Glob_(programming))(Glob) are used to partition the responsibility of workers. Each pattern-match is taken as one “atomic datum” and then data is distributed across mathced datums.

For instance, in our file system example defined in previous [post](https://github.com/anuragsoni9/ProductionScale/blob/master/04-pipeline.md),

    /user-deviceid1
      time1.json
      time2.json
    /user-deviceid2
      time3.json
      time4.json

the following input JSON section would define the pattern-based paralleization based on the `user-deviceid` with `/*`. Two JSONS -  `time1.json`/`time2.json` would be grouped in one bucket and  `time3.json`/`time4.json` would be grouped in another bucket and processed in a distributed fashion when inputting from `model` repo.  

    "input": {
        "atom": {
            "repo": "model",
            "glob": "/user-device*",
        }
    }

> More on Distributed Computing aspect in Pachyderm can be found [here](http://pachyderm.readthedocs.io/en/latest/fundamentals/distributed_computing.html).


## Future Direction/Next Steps

The basic objective of whole series was to help you explore the opportunity of running infrastructure as you would run your application i.e. *with more control*. With this series, we have described and implemented a data science pipeline based on Tensorflow’s Object Detection model with Docker containers and run by Pachyderm and Kubernetes.Various add-ons that can be included here would involve providing more visibility to business team/end-users with advanced dashboards and notifications. We also briefly touched upon the aspect of including facial-recognition models to distinguish between authorized and unauthorized people. Sky is the limit when more focus can be put on the functionality and less on the infrastructure headaches.

It can also be redesigned to implement your own data pipeline that you have been trying to run manually. The most learning is expected to be in the through understanding of [Pipeline Specification](http://pachyderm.readthedocs.io/en/stable/reference/pipeline_spec.html) and writing your own project’s [Dockerfile](https://docs.docker.com/engine/userguide/eng-image/dockerfile_best-practices/). 

To that end, [Daniel Whitnack](http://www.datadan.io/) has provided various examples [here](http://docs.pachyderm.io/en/latest/examples/readme.html) which can be further tried-out to get used-to on this. It includes pipeline examples of typical R/Python classification, GPU-enabled distributed training etc. 

