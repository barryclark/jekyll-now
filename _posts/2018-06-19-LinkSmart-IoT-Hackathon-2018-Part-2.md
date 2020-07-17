
In [LinkSmart IoT Hackathon 2018 - Part 1](https://docs.linksmart.eu/display/HOME/2017/12/08/LinkSmart+IoT+Hackathon+2018+-+Part+1), we setup the [LinkSmart Device Gateway](https://docs.linksmart.eu/display/DGW)  to collect temperature and humidity data from a DHT22 sensor on a Raspberry Pi. The collected data was exposed over a RESTful API and published periodically to a MQTT broker.

In the second part of the hackaton, you will perform the following on your personal computer (x84 architecture):

-   Setup [LinkSmart Historical Datastore](https://docs.linksmart.eu/display/HDS) and configure it to store and aggregate the data being published to the MQTT broker
-   Setup Grafana and [Grafana Datasource Plugin for Historical Datastore](https://docs.linksmart.eu/display/HDS/Grafana+Datasource+Plugin+for+Historical+Datastore)  to visualize temperature and humidity data

  

In the following steps, we will use these placeholders:

-   `<mqtt-broker-uri>`: The URI of the MQTT Broker used in the previous Hackaton part
-   `<device-name>`: The unique name or hostname of the device where you deployed the Device Gateway

  

Let's begin:

## Historical Datastore (HDS) - deployment and usage

1.  Follow the  [documentation](https://docs.linksmart.eu/display/HDS/Historical+Datastore)  to deploy Historical Datastore.
2.  You should now be able to access the registry at [http://localhost:8085/registry](http://localhost:8085/registry)
3.  Let's recap that In [LinkSmart IoT Hackathon 2018 - Part 1](https://docs.linksmart.eu/display/HOME/2017/12/08/LinkSmart+IoT+Hackathon+2018+-+Part+1), we configured the Device Gateway to:
    
    1.  Publish SenML object with entries named `<device-name>/Temperature`  and `<device-name>/Humidity`
    2.  with topic `LS/v2/DGW/<device-name>/senml`
    3.  to Broker `<mqtt-broker-uri>`
    
    Now, we want to register this Datasource in HDS. Refer to the  [OpenAPI Documentation](https://docs.linksmart.eu/display/HDS/OpenAPI+Documentation) and  [API Description](https://docs.linksmart.eu/display/HDS/API+Description). Then, adapt and POST the following (using a REST client):
    
```json
{
  "resource": "<device-name>/<measurement-name>",
  "connector": {
    "mqtt": {
      "url": "<mqtt-broker-uri>",
      "topic": "LS/v2/DGW/<device-name>/senml",
      "qos": 1
    }
  },
  "type": "float",
  "format": "application/senml+json"
}
```

You should register  **two**  Datasources, one for Temperature and another for Humidity. On each request, you should get a Datasource ID in response header.

Below and in the rest of this tutorial, we register the Temperature datasource for a device named `<device-name>=linksmart-apple` that is sending data to `<mqtt-broker-uri>=`ssl://iot.linksmart.eu:8883. This is just an example to show the required step for registering and configuring a datasource.

POST to [http://localhost:8085/registry](http://localhost:8085/registry)
```json

{
  "resource": "linksmart-apple/Temperature",
  "connector": {
    "mqtt": {
      "url": "ssl://iot.linksmart.eu:8883",
      "topic": "LS/v2/DGW/linksmart-apple/senml",
      "qos": 1
    }
  },
  "type": "float",
  "format": "application/senml+json"
}
```

4. Query and make sure everything was correct.  
The URL for the created Datasource: [http://localhost:8085/registry/99e60acc-0683-40fc-9b83-408d89727b0c](http://localhost:8085/registry/99e60acc-0683-40fc-9b83-408d89727b0c)  
GET Response:
```json

{
  "id": "99e60acc-0683-40fc-9b83-408d89727b0c",
  "url": "/registry/99e60acc-0683-40fc-9b83-408d89727b0c",
  "data": "/data/99e60acc-0683-40fc-9b83-408d89727b0c",
  "resource": "linksmart-apple/Temperature",
  "meta": null,
  "connector": {
    "mqtt": {
      "url": "ssl://iot.linksmart.eu:8883",
      "topic": "LS/v2/DGW/linksmart-apple/senml",
      "qos": 1
    }
  },
  "retention": "",
  "aggregation": null,
  "type": "float",
  "format": "application/senml+json"
}
```

5. Get the stored data  
We should query the Data API: [http://localhost:8085/data/99e60acc-0683-40fc-9b83-408d89727b0c](http://localhost:8085/data/99e60acc-0683-40fc-9b83-408d89727b0c)
```json
{
    "url": "/data/99e60acc-0683-40fc-9b83-408d89727b0c?end=2018-06-20T08%3A12%3A23Z&page=1&per_page=1000&sort=desc&start=0001-01-01T00%3A00%3A00Z",
    "data": {
        "ver": 1,
        "e": [
            {
                "n": "linksmart-apple/Temperature",
                "u": "Cel",
                "v": 25.399999618530273,
                "t": 1529482813
            },
            {
                "n": "linksmart-apple/Temperature",
                "u": "Cel",
                "v": 25.399999618530273,
                "t": 1529482693
            },
            {
                "n": "linksmart-apple/Temperature",
                "u": "Cel",
                "v": 25.5,
                "t": 1529482576
            },
            {
                "n": "linksmart-apple/Temperature",
                "u": "Cel",
                "v": 25.399999618530273,
                "t": 1529482458
            },
            {
                "n": "linksmart-apple/Temperature",
                "u": "Cel",
                "v": 25.399999618530273,
                "t": 1529482333
            }
        ]
    },
    "time": 11.293132000000002,
    "page": 1,
    "per_page": 1000,
    "total": 1
}
```

The data field follows the SenML model, if the array is empty, you may need to wait for a while until new data arrives. Remember that the measurements are published every 2 minutes. If you receive nothing after 2 minutes, check the topic and broker configurations.

6. Now, configure a retention period so the measurements are removed after 1h. By default only retention periods 1h and 1w are supported.
We'll work on the response from step 5 and add a retention period of 1h. 
PUT [http://localhost:8085/registry/99e60acc-0683-40fc-9b83-408d89727b0c](http://localhost:8085/registry/99e60acc-0683-40fc-9b83-408d89727b0c)
```json
{
  "id": "99e60acc-0683-40fc-9b83-408d89727b0c",
  "url": "/registry/99e60acc-0683-40fc-9b83-408d89727b0c",
  "data": "/data/99e60acc-0683-40fc-9b83-408d89727b0c",
  "resource": "linksmart-apple/Temperature",
  "meta": null,
  "connector": {
    "mqtt": {
      "url": "ssl://iot.linksmart.eu:8883",
      "topic": "LS/v2/DGW/linksmart-apple/senml",
      "qos": 1
    }
  },
  "retention": "1h",
  "aggregation": null,
  "type": "float",
  "format": "application/senml+json"
}
```

7. Add aggregations
We'll continue with the JSON from step 7 and this time add an aggregation object for mean and max kept for 1w:
PUT [http://localhost:8085/registry/99e60acc-0683-40fc-9b83-408d89727b0c](http://localhost:8085/registry/99e60acc-0683-40fc-9b83-408d89727b0c)
```json
{
  "id": "99e60acc-0683-40fc-9b83-408d89727b0c",
  "url": "/registry/99e60acc-0683-40fc-9b83-408d89727b0c",
  "data": "/data/99e60acc-0683-40fc-9b83-408d89727b0c",
  "resource": "linksmart-apple/Temperature",
  "meta": null,
  "connector": {
    "mqtt": {
      "url": "ssl://iot.linksmart.eu:8883",
      "topic": "LS/v2/DGW/linksmart-apple/senml",
      "qos": 1
    }
  },
  "retention": "1h",
  "aggregation": [
    {
      "interval": "30m",
      "aggregates": [
        "mean", "max"
      ],
      "retention": "1w"
    }
  ],
  "type": "float",
  "format": "application/senml+json"
}
```

8. See the stored aggregated data
First, retrieve the datasource registration:
GET [http://localhost:8085/registry/99e60acc-0683-40fc-9b83-408d89727b0c](http://localhost:8085/registry/99e60acc-0683-40fc-9b83-408d89727b0c)
```json
{
    "id": "99e60acc-0683-40fc-9b83-408d89727b0c",
    "url": "/registry/99e60acc-0683-40fc-9b83-408d89727b0c",
    "data": "/data/99e60acc-0683-40fc-9b83-408d89727b0c",
    "resource": "linksmart-apple/Temperature",
    "meta": null,
    "connector": {
        "mqtt": {
            "url": "ssl://iot.linksmart.eu:8883",
            "topic": "LS/v2/DGW/linksmart-apple/senml",
            "qos": 1
        }
    },
    "retention": "1h",
    "aggregation": [
        {
            "id": "b0b39eb0",
            "interval": "10m",
            "data": "/aggr/b4464e8d/99e60acc-0683-40fc-9b83-408d89727b0c",
            "aggregates": [
                "max",
                "mean"
            ],
            "retention": "1w"
        }
    ],
    "type": "float",
    "format": "application/senml+json"
}
```
The aggregation has an id and a data URL. 
GET [http://localhost:8085/aggr/b0b39eb0/99e60acc-0683-40fc-9b83-408d89727b0c](http://localhost:8085/aggr/b0b39eb0/99e60acc-0683-40fc-9b83-408d89727b0c)
```json
{
    "url": "/aggr/b0b39eb0/99e60acc-0683-40fc-9b83-408d89727b0c?end=2018-06-20T08%3A52%3A57Z&page=1&per_page=1000&sort=desc&start=0001-01-01T00%3A00%3A00Z",
    "data": {
        "e": [
            {
                "max": 25.5,
                "mean": 25.424999713897705,
                "n": "linksmart-apple/Temperature",
                "te": 1529482800,
                "ts": 1529482200
            }
        ]
    },
    "time": 4.753686,
    "page": 1,
    "per_page": 1000,
    "total": 5
}
```

## Grafana - deployment, plugin configuration, usage
1.  Follow the documentation: [Grafana Datasource Plugin for Historical Datastore](https://docs.linksmart.eu/display/HDS/Grafana+Datasource+Plugin+for+Historical+Datastore)  
    1.  Plugin Configuration  
        ![](https://raw.githubusercontent.com/linksmart/blog/master/_posts/resources/2017-12-08-LinkSmart-IoT-Hackathon-2018-Part-2/grafana-config.png)
    2.  Dashboard / Metrics configuration  
        ![](https://raw.githubusercontent.com/linksmart/blog/master/_posts/resources/2017-12-08-LinkSmart-IoT-Hackathon-2018-Part-2/grafana-metric-config.png)
2.  Show Temperature data in Table, Gauge (Singlestat), and Graph  
      
    ![](https://raw.githubusercontent.com/linksmart/blog/master/_posts/resources/2017-12-08-LinkSmart-IoT-Hackathon-2018-Part-2/grafana-panel.png)

  
---
Ideas for the Hackaton 2018 - Part 3:

-   Setup [LinkSmart Service Catalog](https://docs.linksmart.eu/display/SC) to register the address of the broker and all gateways
-   Modify the configuration of [LinkSmart Device Gateway](https://docs.linksmart.eu/display/DGW) to discovery broker address and advertise its service information
-   Extend HDS so that it can discover the broker address

  

[Continue with other hackathons](https://docs.linksmart.eu/display/HOME/LinkSmart+Hackathon+Organization)

_By Farshid Tavakolizadeh._
