
The LinkSmart team is proud to announce Broetchen API. Major releases are maintained to ensure that the involved services are interoperable, well documented and ready to use. Services of a major release work standalone but can also be integrated into a consistent LinkSmart platform deployment.

Broetchen API is the first major release of next generation LinkSmart. It includes the basic services for setting up device abstraction, service provisioning, time-series data storage and stream mining/learning functionalities. Broetchen API works seamlessly with the  [SenML](https://tools.ietf.org/html/draft-jennings-senml-10)  data model.

![components](https://raw.githubusercontent.com/linksmart/blog/master/_posts/resources/2018-04-09-Broetchen-API-released/components.png)

### Device Gateway (≥1.1.0)

[Documentation](https://docs.linksmart.eu/display/DGW)

#### Release Notes

-   Pluggable devices support
-   Natively compiled for major platforms and architectures, including _arm linux_
-   No modification/re-compilation/re-deployment of the DGW for a new device
-   Exposure of device capabilities as network services by declaration/configuration
-   Payload agnostic device exposure

### Service Catalog (≥2.2.6)

[Documentation](https://docs.linksmart.eu/display/SC)

#### Release Notes

-   Exposes RESTful API for:
    -   Registering and updating Services (also MQTT support)
    -   Browsing the Service Catalog entries
    -   Retrieving information about specific Services
    -   Filtering Services

### Historical Datastore (≥0.4.2)

[Documentation](https://docs.linksmart.eu/display/HDS)

#### Release Notes

-   All three APIs fully implemented:
    -   Registry API: Registry of sensor meta-data and details regarding sensor data storage and aggregation
    -   Data API: Submission and retrieval of raw sensor measurements
    -   Aggregation API: Retrieval of aggregated sensor measurements
-   Grafana Plugin

### IoT Agents (≥1.7.0)

[Documentation](https://docs.linksmart.eu/display/LA)

#### Release Notes

-   Learning Agent & Data Processing Agent
-   Three APIs fully implemented  
    -   Stream Mining API (Statement API)
    -   Learning API (CEML API)
    -   IO API.
-   The Statement and CEML APIs are CRUD and JSON based, while the IO are write-only (for Input) or read-only (for Output). The APIs are implemented as HTTPS RESTful and MQTT.

_By Marco Jahn._
