---
layout: post
title: Using fluentd with multiple log targets
subtitle: Forward log messages to multiple (Azure) targets with FluentD
category: dev
tags: [general, cloud, azure, logging, devops, docker]
author: Rainer Zehnle
author_email: rainer.zehnle@haufe-lexware.com
header-img: "images/new/Exportiert_56.jpg"
---

### Starting point

This blog post decribes how we are using and configuring [FluentD](http://www.fluentd.org/) to log to multiple targets.
Log sources are the [Haufe Wicked API Management](http://wicked.haufe.io/) itself and several services running behind the APIM gateway.
The whole stuff is hosted on Azure Public and we use [GoCD](https://www.gocd.org/), Powershell and Bash scripts for automated deployment.
Wicked and FluentD are deployed as docker containers on an Ubuntu Server V16.04 based virtual machine.

### Log targets

The resulting FluentD image supports these targets:

* [Graylog](https://www.graylog.org/)
* [Azure Log Analytics](https://docs.microsoft.com/en-us/azure/log-analytics/log-analytics-overview) and [Azure Cosmos DB](https://azure.microsoft.com/en-us/services/cosmos-db/)
* Stdout

### FluentD Images

#### Initial FluentD image

> Company policies at Haufe require *non-official* Docker images to be built (and pulled) from internal systems (build pipeline and repository). As a consequence, the *initial fluentd* image is "our own" copy of [github.com/fluent/fluentd-docker-image](https://github.com/fluent/fluentd-docker-image)

Default configurations are to:

* listen port `24224` for Fluentd forward protocol
* store logs with tag `docker.**` into `/fluentd/log/docker.*.log` (and symlink `docker.log`)
* store all other logs into `/fluentd/log/data.*.log` (and symlink `data.log`)

This image uses Alpine Linux.

**Dockerfile**:

```
FROM alpine:3.4
MAINTAINER Thomas Schuering <thomas.schuering@haufe-lexware.com>
LABEL Description="Fluentd docker image" Vendor="Fluent Organization" Version="1.1"

# Do not split this into multiple RUN!
# Docker creates a layer for every RUN-Statement
# therefore an 'apk delete build*' has no effect
RUN apk --no-cache --update add \
                        build-base \
                        ca-certificates \
                        ruby \
                        ruby-irb \
                        ruby-dev && \
echo 'gem: --no-document' >> /etc/gemrc && \
gem install oj && \
gem install fluentd -v 0.12.28 && \
apk del build-base ruby-dev && \
rm -rf /tmp/* /var/tmp/* /var/cache/apk/* /usr/lib/ruby/gems/*/cache/*.gem

RUN adduser -D -g '' -u 1000 -h /home/fluent fluent
RUN chown -R fluent:fluent /home/fluent

# for log storage (maybe shared with host)
RUN mkdir -p /fluentd/log
# configuration/plugins path (default: copied from .)
RUN mkdir -p /fluentd/etc /fluentd/plugins

RUN chown -R fluent:fluent /fluentd

USER fluent
WORKDIR /home/fluent

# Tell ruby to install packages as user
RUN echo "gem: --user-install --no-document" >> ~/.gemrc
ENV PATH /home/fluent/.gem/ruby/2.3.0/bin:$PATH
ENV GEM_PATH /home/fluent/.gem/ruby/2.3.0:$GEM_PATH

COPY fluent.conf /fluentd/etc/

ENV FLUENTD_OPT=""
ENV FLUENTD_CONF="fluent.conf"

EXPOSE 24224 5140

CMD exec fluentd -c /fluentd/etc/$FLUENTD_CONF -p /fluentd/plugins $FLUENTD_OPT
```

#### Image with Azure plugins

This step builds the FluentD container that contains all the plugins for azure and some other necessary stuff.
It contains more azure plugins than finally used because we played around with some of them.

**Dockerfile**:

```
# fluentd base image from Haufe artifactory that contains secure forwareder to central registry (Graylog)
FROM registry.haufe.io/hgg/fluentd-fwd:active		

# Build FluentD image with Azure plugin from base fluentd image.
# A basic fluent.config is included that should be overwritten in the final build of the fluentd image

# change to root user for installation
USER root

RUN apk add --update --virtual .build-deps \
        sudo build-base ruby-dev zlib-dev \
		 && sudo fluent-gem install \
        fluent-plugin-ping-message \
        azure \
        fluent-plugin-azure-loganalytics \
        fluent-plugin-azurestorage \
        fluent-plugin-documentdb \
        fluent-plugin-azureeventhubs \
        fluent-plugin-azuresearch \
        fluent-plugin-azurefunctions \
    && sudo gem sources --clear-all \
    && apk del .build-deps \
    && rm -rf /var/cache/apk/* \
        /home/fluent/.gem/ruby/2.3.0/cache/*.gem

# back to original user
USER fluent

COPY fluent.conf /fluentd/etc/
```

#### Image with final configuration

In the last step we add the final configuration and the certificate for central logging (Graylog).

**Dockerfile**:

```
FROM local/fluentd-base

# copy the final conf
COPY fluent.conf /fluentd/etc/
# copy the current certificate for central logging
COPY certs/log_cert.pem /fluentd/certs/ca_cert.pem

# in case you want to replace plugins
COPY plugins /fluentd/plugins/
ENV FLUENTD_OPT="-I /fluentd/plugins"
```

The configfile is explained in more detail in the following sections.

### FluentD configuration

#### Multiple log targets

We use the fluentd copy plugin to support multiple log targets [http://docs.fluentd.org/v0.12/articles/out_copy](http://docs.fluentd.org/v0.12/articles/out_copy).

#### Ping plugin

The ping plugin was used to send periodically data to the configured targets.That was extremely helpful to check whether the configuration works.

* [https://github.com/tagomoris/fluent-plugin-ping-message](https://github.com/tagomoris/fluent-plugin-ping-message)

Potentially it can be used as a minimal monitoring source (Heartbeat) whether the FluentD container works.

#### Graylog

Graylog is used in Haufe as central logging target.
It is configured as an additional target.

```
# needed for central logging
<filter docker.**>
    # renames the docker source field to something graylog understands (stream)
    @type record_transformer
    <record>
        stream ${source}   
    </record>
    remove_keys source
</filter>
  
<store>
	# log to Haufe Graylog - env vars must be set from extern
	@type secure_forward
	self_hostname ${hostname}
	shared_key    "#{ENV['OUT_SECURE_FORWARD_SHARED_KEY']}"
	secure yes
	ca_cert_path /fluentd/certs/ca_cert.pem
	# enable_strict_verification yes
	<server>
		host "#{ENV['OUT_SECURE_FORWARD_HOST']}"
		port "#{ENV['OUT_SECURE_FORWARD_PORT']}"
	</server>
</store>
```

The necessary Env-Vars must be set in from outside.

#### Azure plugins

Here you can find a list of available Azure plugins for Fluentd 

* [http://unofficialism.info/posts/fluentd-plugins-for-microsoft-azure-services/](http://unofficialism.info/posts/fluentd-plugins-for-microsoft-azure-services/)

All the used Azure plugins buffer the messages. There is a significant time delay that might vary depending on the amount of messages.
Do not expect to see results in your Azure resources immediately! Be patient and wait for at least five minutes!
 
##### Azure Table Storage

[https://github.com/heocoi/fluent-plugin-azuretables](https://github.com/heocoi/fluent-plugin-azuretables)

We tried the plugin. But we couldn't get it to work cause we couldn't configure the required unique row keys.   
We can't recommend to use it.

##### Azure Log Analytics

[https://github.com/yokawasa/fluent-plugin-azure-loganalytics](https://github.com/yokawasa/fluent-plugin-azure-loganalytics)

This one works fine and we think it offers the best opportunities to analyse the logs and to build meaningful dashboards.
It is recommended to use this plugin.
You have to create a new Log Analytics resource in your Azure subscription.
You can reach the Operations Management Suite (OMS) portal under
`https://<yourname>.portal.mms.microsoft.com/#Workspace/overview/index`.
To configure the FluentD plugin you need the shared key and the customer_id/workspace id.
You can find both values in the OMS Portal in Settings/Connected Resources.

Finally you must enable **Custom Logs** in the Setings/Preview Features section.

![OMS-Enable-CustomerLogs](/images/fluentd-logging/oms-customer-logs.png)

This is the resulting FluentD config section.

```
<store>
    # log to azure analytics instance
    @type azure-loganalytics
    @log_level info
    customer_id <Workspace id>
    shared_key <secret key>
    log_type Docker
</store>
```
#### Azure DocumentDB

[https://github.com/yokawasa/fluent-plugin-documentdb](https://github.com/yokawasa/fluent-plugin-documentdb)

Works fine. Easy to configure. Good starting point to check whether log messages arrive in Azure.
Follow the instructions from the plugin and it should work.
We created a new DocumentDB (Actually it is a CosmosDB).
A DocumentDB is accessed through its endpoint and a secret key. You can find the infos in the Azure portal in  CosmosDB resource - Keys section.

This is the resulting fluentd config section.

```
<store>
    @type documentdb
    @log_level info
    docdb_endpoint <cosmosdb-endpoint>
    docdb_account_key <secret key>
    docdb_database  logdb
    docdb_collection logcollection
    auto_create_database true
    auto_create_collection true
    partitioned_collection false
    partition_key PARTITION_EKY
    offer_throughput 10100
    time_format %s
    localtime false
    add_time_field true
    time_field_name time
    add_tag_field true
    tag_field_name time
</store>
```

### fluentd.config

The entire fluentd.config file looks like this.

```
<system>
	@log_level info
</system>

<source>
	# sends data in an intervall from the fluentd container
	# means we can check whether our config works without relying on other sending systems
	@type ping_message
	@log_level info
	tag      ping
	interval 10      # one message in 10secs
	data     "ping message"
	<inject>
		hostname_key host     # {"host": "my.hostname.example.com"}
		time_key     time
		time_type    unixtime # {"time": 1486014439}
	</inject>
</source>

<source>
	# that is the important configuration to listen to port 24224 and forward the messages
	@type forward
	@log_level info
	port 24224
	bind 0.0.0.0
</source>

# needed for graylog
<filter **>
	# renames the docker source field to something graylog understands (stream)
	@type record_transformer
	<record>
		stream ${source}   
	</record>
	remove_keys source
</filter>

<match **>
	# listen to all messages
	@type copy
	deep_copy true
	@log_level info
	<store>
		# log to Haufe Graylog - env vars must be set from extern
		@type secure_forward

		self_hostname ${hostname}
		shared_key    "#{ENV['OUT_SECURE_FORWARD_SHARED_KEY']}"

		secure yes
		ca_cert_path /fluentd/certs/ca_cert.pem

		<server>
			host "#{ENV['OUT_SECURE_FORWARD_HOST']}"
			port "#{ENV['OUT_SECURE_FORWARD_PORT']}"
		</server>
	</store>
	<store>
		# log to azure analytics instance
		@type azure-loganalytics
		@log_level info
		customer_id <Workspace id>
		shared_key <secret key>
		log_type Docker
	</store>
	<store>
		# log to documentdb in Azure
		@type documentdb
		@log_level info
		docdb_endpoint <cosmosdb-endpoint>
		docdb_account_key <secret key>
		docdb_database  logdb
		docdb_collection logcollection
		auto_create_database true
		auto_create_collection true
		partitioned_collection false 
		partition_key PARTITION_EKY
		offer_throughput 10100
		time_format %s
		localtime false
		add_time_field true
		time_field_name time
		add_tag_field true
		tag_field_name time
	</store>
	<store>
		# log to stdout
		@type stdout		
  		@log_level info
	</store>
</match>
```

I hope these informations are helpful when working with fluentd and multiple targets like Azure targets and Graylog.
