---
layout: post
title: 
---

<p align="center">
<img width="600" src="/images/asimov-lambda.png">
</p>

Based on my previous reverse engineering work of AWS Lambda (take a look [here](https://benjitrapp.github.io/hack-the-lambda/)) it's time for a reassambling of the captured parts. We will craft an dockerized version of AWS Lambda. This foundation will be based on the [Amazon Linux Dockerimage](https://hub.docker.com/_/amazonlinux?tab=tags). Docker rocks - but the real AWS Lambda tells from itself, that it's an EC2 instance. In my oppinion it still must be some sort of a container system (yes I know that [Firecracker](https://aws.amazon.com/de/blogs/opensource/firecracker-open-source-secure-fast-microvm-serverless/) and [Bottlerocket](https://aws.amazon.com/de/bottlerocket/)  exist) but there must also be a difference for the real one. This drill here helps me to understand and learn in which way such a container system could work and look like.


To make some faster progresses this work will have a heavy use of GitHub Actions and Docker flow including GitHubs own Image Registry. Just take a look at the Actions part of the repisitory. 

<p align="center">
<img width="600" src="/images/tmnt-michelangelo.gif">
</p>


=> **The Code can be found [here](https://github.com/BenjiTrapp/asimov-lambda)**


### <p align="center">
<img width="600" src="/images/reassamble.png">
</p>

To have a multipurpose Image I try to craft an own AWS Lambda Base Image 

```docker
######
## Stage 1: Build an Amazonlinux flavoured Image and inject the captured files
######
FROM amazonlinux:2 as builder

# Copy manual extracted files which were captured from AWS Lambda
ADD ./extracted_files.tar.gz /asimovlambda/

# Install the required AWS Dependencies
RUN yum --installroot=/asimovlambda reinstall -y  \
                                    filesystem-3.2-25.amzn2.0.4 \
                                    setup-2.8.71-10.amzn2.0.1 \
                                    glibc-2.26-39.amzn2 \
                                    glibc-common-2.26-39.amzn2 \
  # Remove the garbage
  && yum --installroot=/asimovlambda clean all

######
## Stage 2: Create a smaller Asimov Lambda BaseImage
######
FROM scratch

# Copy the installed OS files to the root dir
COPY --from=builder /asimovlambda /

ENV PATH=/usr/local/bin:/usr/bin/:/bin:/opt/bin \
    LD_LIBRARY_PATH=/lib64:/usr/lib64:/var/runtime:/var/runtime/lib:/var/task:/var/task/lib:/opt/lib \
    LANG=en_US.UTF-8 \
    TZ=:UTC \
    LAMBDA_TASK_ROOT=/var/task \
    LAMBDA_RUNTIME_DIR=/var/runtime \
    _LAMBDA_CONTROL_SOCKET=14 \
    _LAMBDA_SHARED_MEM_FD=11 \
    _LAMBDA_LOG_FD=9 \
    _LAMBDA_SB_ID=7 \
    _LAMBDA_CONSOLE_SOCKET=16 \
    _LAMBDA_RUNTIME_LOAD_TIME=1530232235231 \
    _AWS_XRAY_DAEMON_ADDRESS=169.254.79.129 \
    _AWS_XRAY_DAEMON_PORT=2000 \
    _X_AMZN_TRACE_ID='Root=1-6217f7ab-1f6b3ebf2a1811227263a659;Parent=5c39ff32e875095b;Sampled=1' \
    AWS_XRAY_DAEMON_ADDRESS=169.254.79.2:2000 \
    AWS_XRAY_CONTEXT_MISSING=LOG_ERROR 

# fix permissions
RUN chown sbx_user1051:495 /tmp && \
    chmod 700 /tmp

# Switch to the task dir to get ready to inject the Code
WORKDIR /var/task

```


### <p align="center">
<img width="600" src="/images/pythonic-flavour.png">
</p>

<p align="center">
<img width="600" src="/images/select-turtle.gif">
</p>


Time to reuse the crafted Base Image and give it a pythonic flavour based on the real extracted python 3.8 runtime. The Image looks like this:

```docker
######
## Stage 1: Copy layer - could be done in one step but better copy it to be prepared for the future
######
FROM scratch as runtime
# Copy extracted python runtime
ADD ./python3.8-extracted-runtime.tar.gz /opt

######
## Stage 2: Inherit the baseimage and enrich it with the python 3.8 runtime
######
FROM ghcr.io/benjitrapp/asimov-lambda-baseimage:main

# Copy the runtime into base image
COPY --from=runtime /opt/* /var/

ENV PATH=/var/lang/bin:$PATH \
    LD_LIBRARY_PATH=/var/lang/lib:$LD_LIBRARY_PATH \
    AWS_EXECUTION_ENV=AWS_Lambda_python3.8 \
    PKG_CONFIG_PATH=/var/lang/lib/pkgconfig:/usr/lib64/pkgconfig:/usr/share/pkgconfig \
    PIPX_BIN_DIR=/var/lang/bin \
    PIPX_HOME=/var/lang/pipx

# Update and install python dependencies
RUN pip install -U pip setuptools wheel --no-cache-dir && \
    pip install pipx --no-cache-dir && \
    pipx install virtualenv && \
    pipx install pipenv && \
    pipx install poetry==1.1.4 && \
    pipx install awscli==1.* && \
    pipx install aws-lambda-builders==1.2.0 && \
    pipx install aws-sam-cli==1.15.0

USER sbx_user1051

ENTRYPOINT ["/var/rapid/init", "--bootstrap", "/var/runtime/bootstrap", "--enable-msg-logs"]
```

... to be continued -> Reverse engineering of the original [AWS Python Lambda Dockerfile](https://hub.docker.com/r/amazon/aws-lambda-python) and look how close I came by diffing both :)

