
In [LinkSmart IoT Hackathon 2018 - Part 2](https://docs.linksmart.eu/display/HOME/2018/06/19/LinkSmart+IoT+Hackathon+2018+-+Part+2), we stored and aggregated our room ambience data in [LinkSmart Historical Datastore](https://docs.linksmart.eu/display/HDS/Historical+Datastore)  and visualized the data using Grafana and the [Grafana Datasource Plugin for Historical Datastore](https://docs.linksmart.eu/display/HDS/Grafana+Datasource+Plugin+for+Historical+Datastore). With the goal of performing data aggregation and analysis as well as implementation of stimulus-response, in the third part of our Hackathon you will

-   Set up [LinkSmart Service Catalog](https://docs.linksmart.eu/display/SC).
-   Set up  [LinkSmart IoT Agents](https://docs.linksmart.eu/display/LA).
-   Work with the room ambience data by feeding statements to an IoT data processing agent using [EsperTech´s Event Processing Language (EPL)](http://esper.espertech.com/release-7.1.0/esper-reference/html_single/index.html).

We will assume that your room ambience data is being published to Mosquitto MQTT broker at `tcp://<broker_address>:1883.`

## Set up Service Catalog

Create a `docker-compose.yml`  file and pull image `docker.linksmart.eu/sc:latest`. Expose port 8082, mount a volume, choose a name `<your_sc_container_name>` for the container, configure file `service-catalog.json` according to  [Service Catalog documentation](https://docs.linksmart.eu/display/SC)  and run the container.

Hint fow Windows 7 users: If you use Docker Toolbox with Windows 7 you may run into trouble running LevelDB as a backend for Service Catalog. In this case, you can work without mounting a volume and set up Service Catalog storing its data in memory using the following environment variables:
- `SC_STORAGE_TYPE=memory`
- `SC_MQTT_CLIENT_BROKERID=main_broker`
- `SC_MQTT_CLIENT_BROKERURI=`tcp://<broker_address>:1883`
    

## Set up Data Processing Agent

Extend your docker-compose file and pull image `docker.linksmart.eu/agent:dpa-snapshot`. Expose port 8319, set the following environment variables and run the container:

```
agent_id=hackathon3_agent
linksmart_service_catalog_endpoint=http://<your_sc_container_name>:8082
linksmart_service_catalog_in_registration_fail_stop=true
api_events_mqtt_topic_incoming_SenML=LS/v2/DGW/#
```

The agent will be able to work with all SenML data published below `LS/v2/DGW/#`.

The agent now should be registered in Service Catalog´s index (refer to the  [API documentation](https://docs.linksmart.eu/display/SC/Service+Catalog+API)  to check it). Note that the agent correctly retrieved the broker address from the catalog.

#### Example: Create your first statement

Consult the documentation of the agent´s statement  [REST API](https://docs.linksmart.eu/display/LA/Open+API+Docs). Create a first simple statement that does nothing but just duplicating the data from a specific device (in this example: `linksmart-black)` into another topic:

```json
{
    "name": "select",
    "statement": "select bn, e from SenML(bn=\"linksmart-black/\")",
    "resultType": "none",
    "output": [
        "LS/v2/LA/linksmart-black/senml"
    ]
}
```

Make sure not to publish to somewhere below  `LS/v2/DGW/#!`  This would create a loop.

Subscribe to topic `LS/v2/LA/linksmart-black/senml`  with your favourite MQTT client (like [MQTT.fx](https://mqttfx.jensd.de/)  or simply [mosquitto_sub](https://mosquitto.org/man/mosquitto_sub-1.html)) and check the data. A similar statement could be used to forward the data to additional MQTT brokers.

#### Example: Select a single field

Select only the temperature value from the SenML record in a simple JSON format:

```json
{
    "name": "select_temp",
    "statement": "select e[0].v as temperature from SenML(bn=\"linksmart-black/\")",
    "resultType": "none",
    "output": [
        "LS/v2/LA/linksmart-black/senml"
    ]
}
```


By not defining a `resultType`  the agent will publish the value in OGC format by default ("`1 as id"` specifies the Datastream id):

```json
{
    "name": "convert",
    "statement": "select e[0].v as result, 1 as id from SenML(bn=\"linksmart-black/\")",
    "output": [
        "GOST/Datastreams(1)/Observations"
    ]
}
```

Subscribe to topic `GOST/Datastreams(1)/Observations`  to check the data. You could use a statement like this if you want to employ the agent to transfer SenML data into a  [GOST server](https://github.com/gost/server).

#### Exercise: Simple aggregations
Create statements to calculate the maximum and average temperature of the last ten minutes. Hints: Check out  [Time Window](http://esper.espertech.com/release-7.1.0/esper-reference/html_single/index.html#view-win-time)  and  [SQL-Standard Functions](http://esper.espertech.com/release-7.1.0/esper-reference/html_single/index.html#epl-function-aggregation-std). For the average calculation you will have to  [cast](http://esper.espertech.com/release-7.1.0/esper-reference/html_single/index.html#epl-single-row-function-cast)  the value.

## Outlier Detection

Some sensors can reproduce wildly inaccurate measurements from time to time. We can use the data processing agent and Esper to get rid of these. We want to use a statement similar to our very first one but forward data to the adapted topic only when a measurement does not differ from the previous measurement by a certain threshold. This can be done by using the [Match Recognize](http://esper.espertech.com/release-7.1.0/esper-reference/html_single/index.html#match-recognize)  functionality.

#### Exercise: Simple outlier detection

Exercise

-   Try to understand the [syntax example](http://esper.espertech.com/release-7.1.0/esper-reference/html_single/index.html#match-recognize-syntax-example)  from the Esper documentation. Create a similar statement for our SenML data checking the difference between two consecutive measurements. The statement should produce an event only if both temperature and humidity values do not differ from the previous values by more than  `x`. Hint: A very simple condition could look like this:

`(Math.abs(cast(B.e[0].v,double) - cast(A.e[0].v,double)) < 1) and (Math.abs(cast(B.e[1].v,double) - cast(A.e[1].v,double)) < 1)`

-   Learn about the  ["after match skip"](http://esper.espertech.com/release-7.1.0/esper-reference/html_single/index.html#match-recognize-syntax)  keywords to make sure that no matches are skipped (more details  [here](http://esper.espertech.com/release-7.1.0/esper-reference/html_single/index.html#match-recognize-patternops-iterator)).

## 4) Actuation

Implementation of actuation, in this hackathon, involves performing stimulus-response, e.g., as soon as the value of the temperature is beyond a certain value, the IoT engineer will be notified of the event.

#### Example: Send e-mails

The agent is also able to send e-mails. Create a statement like this:

```json
{
    "name": "send_temperature",
    "statement": "select e[0].v as temperature from SenML(bn=\"linksmart-black/\")",
    "CEHandler": "eu.linksmart.services.event.handler.TextEmailEventHandler",
    "output": [
        "<your_mail_address>"
    ],
    "scope": [
        "server=smtp.gmail.com,port=587,user=linksmart.notifications@gmail.com,password=<super_secret>,from=linksmart.notifications@gmail.com,security=StartTls"
    ]
}
```

#### Exercise: Send warning and notification e-mails
-   Create a statement that sends an e-mail when your room temperature exceeds  [German health & safety regulations](https://www.verdi.de/themen/arbeit/++co++21fc8afe-94c0-11e8-94d2-525400940f89).
-   Create a statement that sends an e-mail once a day with the maximum and average temperature of the day in your room.


[Continue with other hackathons](https://docs.linksmart.eu/display/HOME/LinkSmart+Hackathon+Organization)

---
_By Jannis Warnat_
