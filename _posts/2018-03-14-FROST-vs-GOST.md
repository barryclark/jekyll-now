Here, we compare two major OGC SensorThings implementations:

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

### Compliance to OGC
[Conformance Class Abstract Test Suite (Normative)](http://docs.opengeospatial.org/is/15-078r6/15-078r6.html#94)

| Conformance Class                    | Reference | FROST | GOST  |
|--------------------------------------|-----------|-------|-------|
| Sensing Core                         | A.1       | Yes   | Yes   |
| Filtering Extension                  | A.2       | Yes   | Yes   |
| Create-Update-Delete                 | A.3       | Yes   | Yes   |
| Batch Request                        | A.4       | Yes   | -     |
| Sensing MultiDatastream Extension    | A.5       | Yes   | -     |
| Sensing Data Array Extension         | A.6       | Yes   | -     |
| MQTT Extension for Create and Update | A.7       | Yes   | Alpha |
| MQTT Extension for Receiving Updates | A.8       | Yes   | Alpha |

---
_By Shreekantha Devasya_
