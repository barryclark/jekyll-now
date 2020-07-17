Here we compare two major OGC SensorThings implementations:

-   [GOST](https://github.com/gost/server): Release V0.5 (docker release on 05-Mar-2018)
-   [FROST](https://github.com/FraunhoferIOSB/FROST-Server): Release V1.6 (docker release on 05-Mar-2018)

| Feature                      | FROST           | GOST                                                           |
|------------------------------|-----------------|----------------------------------------------------------------|
| License                      | LGPL            | MIT                                                            |
| Language                     | Java            | Go                                                             |
| Incubator                    | Fraunhofer IOSB | Geodan (https://www.geodan.nl/)                                |
| Docker image sizes           | 582MB           | 14.2MB                                                         |
| Memory usage (Idle)          | 463.1MB         | 13.7MB                                                         |
| Storage backend              | PostgreSQL      | PostgreSQL. Plans to support storage providers such as MongoDB |
| Clustering (Scalability etc) | N/A             | N/A                                                            |
