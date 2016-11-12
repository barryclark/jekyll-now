---
layout: post
title: How to setup ElasticSearch and Kibana using Docker
published: true
categories:
- Docker
- Elasticsearch
---
So I was trying to learn elasticsearch for work. So I was looking for some tutorials and I came across [this official tutorial](https://www.elastic.co/webinars/getting-started-elasticsearch?baymax=default&storm=cta1&elektra=home). I was going to setup elasticsearch and kibana for it and I thought it's better to do this in Docker, since it's easy to use. The issue with Elasticsearch and Kibana is, the two should be linked and that has to be defined by Docker. I had some problems with it and I even [posted it on StackOverflow](http://stackoverflow.com/questions/40341346/kibana-on-docker-cannot-connect-to-elasticsearch). As per the accepted answer by [Andreas Jägle](http://stackoverflow.com/users/4854965/andreas-j%c3%a4gle), there are two solutions.

## Option 1. Link the two Containers directly

### Step 1.1 Create the network
To create the medium for communication.

```sh
docker network create mynetwork --driver=bridge
```

### Step 1.2 Run Elasticsearch Container
I'm running version Elasticsearch 2.4

```sh
docker run -d -p 9200:9200 -p 9300:9300 --name elasticsearch_2_4 --network mynetwork elasticsearch:2.4
```
### Step 1.3 Run Kibana Container
I'm running version Kibana 4.6

```sh
docker run -d --network mynetwork -e ELASTICSEARCH_URL=http://elasticsearch_2_4:9200 -p 5601:5601 kibana:4.6
```
Note that I'm setting http://elasticsearch_2_4:9200 as the Elasticsearch URL and not localhost. This is where I went wrong.

Now run browser of http://localhost:5601 and it should work where you should see Kibana.

## Option 2: Use docker-compose
There's a tool called [docker-compose](https://docs.docker.com/compose/) created just for linking containers. This is a much easier way of doing this.

### Step 2.1 Create docker-compose.yml
A file with above name should be created. It would look like this:

```yml
version: "2"

services:

  elasticsearch:
    image: elasticsearch:2.4
    ports:
      - "9200:9200"
    volumes:
      - ./esdata/:/usr/share/elasticsearch/data/

  kibana:
    image: kibana:4.6
    ports:
      - "5601:5601"
    environment:
      - ELASTICSEARCH_URL=http://elasticsearch:9200
```
Note that it's the same things as above. But notice the differences,

1. No need to define the network since docker-compose handles it.
2. We're passing a folder so that the saved folder is persisted in the `/esdata/` folder in the host machine, so that when we restart docker, the saved data is persisted in the file system.

### Step 2.2 Run docker-compose
Just call,

```sh
docker-compose up
```
That's it! Now run browser of http://localhost:5601 and it should work where you should see Kibana.

## Bonus: Use Kibana with Sense
The previous Kibana is the vanilla one. There's a cool tool called Sense which is an plugin for Kibana. So, to use the pre-built Kibana with sense, I found an alternate [Docker image having Kibana with sense](https://hub.docker.com/r/seeruk/docker-kibana-sense/)

As a result the `docker-compose.yml` looks like this:

```yml
version: "2"

services:

  elasticsearch:
    image: elasticsearch:2.4
    ports:
      - "9200:9200"
    volumes:
      - ./esdata/:/usr/share/elasticsearch/data/

  kibana:
    image: seeruk/docker-kibana-sense:4.5
    ports:
      - "5601:5601"
    environment:
      - ELASTICSEARCH_URL=http://elasticsearch:9200
```
Cheers
