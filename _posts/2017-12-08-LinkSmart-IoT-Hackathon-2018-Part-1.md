The goal of this Hackaton is to become familiar with several LinkSmart components and at the same time, create something useful.

In the following steps we will setup the  [DHT Adafruit Library](https://github.com/adafruit/Adafruit_Python_DHT)  and  [LinkSmart Device Gateway](https://docs.linksmart.eu/display/LSI/LinkSmart+Device+Connector)  on a Raspberry Pi 3 in order to read measurements from a  [DHT22](https://learn.adafruit.com/dht/overview)  sensor and publish them in  [SenML](https://tools.ietf.org/html/draft-jennings-senml-09)  format to a MQTT broker.

## Setup the DHT Library

### 1.  Install the latest stable Docker for Raspbian / Raspberry Pi OS (armhf).
Follow the instructions **[here](https://docs.docker.com/engine/install/debian)** (Tip in 2020: use the convenience script).

### 2.  Create and enter the directory structure
```bash
mkdir -p /home/pi/dgw
cd /home/pi/dgw
```
    
### 3.  Download Adafruit_DHT_SenML.py.
This script reads temperature and humidity values from a DHT sensor and prints the measurements in SenML format. (You need appropriate drivers to run it)
```bash
wget https://raw.githubusercontent.com/linksmart/linksmart-iot-hackatons/master/iot-hackaton-2018-part1/Adafruit_DHT_SenML.py
```
    
### 4.  Download an image with DHT drivers and runs it once.
The command tries to read from a  `DHT22`  sensor with data pin connected to  `GPIO 4` and SenML basename  `bn/`. Remove these arguments to see usage instructions.
    
```bash
docker run --privileged -v $(pwd):/home --entrypoint=python --rm farshidtz/adafruit_dht Adafruit_DHT_SenML.py 22 4 bn/
```
    
The SenML output should be similar to:
    
```json
[{"bt": 1597584431.476398, "bn": "bn/", "v": 26.9, "n": "temp"}, {"v": 84.7, "n": "humi"}]
```
    
**If you didn't get an output similar to that, go back and figure out what went wrong.**
    

## Deploy Device Gateway

In the following steps, we will use these placeholders:

-   `<mqtt-broker-uri>`: The URI of an accessible MQTT Broker
-   `<device-name>`: A unique name for the device where you deploy the Device Gateway
-   `<hostname>`: The hostname of the device. This could be same as device-name

We'll use the DHT library container (from previous step) to run Device Gateway. The goal is to execute the Python script that reads the measurements and expose the SenML output over networking protocols.

### 1.  Download Device Gateway
Download the latest v1.x.x `device-gateway-linux-arm` and make it executable. Deployment instructions on [wiki](https://github.com/linksmart/device-gateway/wiki).

TLDR? For v1.2.2 (latest stable at the time of writing):
```bash
cd /home/pi/dgw
wget https://github.com/linksmart/device-gateway/releases/download/v1.2.2/device-gateway-linux-arm
chmod +x device-gateway-linux-arm
```
    
### 2.  Configure Device Gateway:  
      
    
1.  Configure the DGW service. Modify the following JSON object and place it in `/home/pi/dgw/conf/device-gateway.json`.

Replace <device-name> with the device name. E.g.: linksmart-cyan
    
Replace <mqtt-broker-uri> with the broker endpoint. E.g.: ssl://demo.linksmart.eu:8883
        
```json
{
  "id": "",
  "description": "Example Device Gateway",
  "publicEndpoint": "http://fqdn-of-the-host:8080",
  "http": {
    "bindAddr": "0.0.0.0",
    "bindPort": 8080
  },
  "protocols": {
    "REST": {
      "location": "/rest"
    },
    "MQTT": {
      "url": "<mqtt-broker-uri>",
      "prefix": "<device-name>-dgw-",
      "offlineBuffer": 100
    }
  }
}
```
        
2.  Configure the device agent. 
Modify the following JSON object and place in `/home/pi/dgw/conf/devices/dht22.json`.

Replace all <device-name>s with the device name. E.g.: linksmart-cyan
    
With the following configuration, Device Gateway executes the Python script every 120 seconds and exposes the resulting data over two protocols:
        
* MQTT: Publishes the sensor data to the given topic. The MQTT broker was configured  in step a.
            
* REST: Exposes a REST endpoint to GET the latest collected data. The HTTP server was configured in the  step a.  E.g for getting data: `curl http://<hostname>:8080/rest/dht22/measurements`
        
```json
{
  "name": "dht22",
  "description": "This sensor measures Temperature and Humidity.",
  "resources": [
    {
      "type": "Resource",
      "name": "measurements",
      "agent": {
        "type": "timer",
        "interval": 120,
        "dir": null,
        "exec": "python /home/dgw/Adafruit_DHT_SenML.py 22 4 <device-name>/"
      },
      "protocols": [
        {
          "type": "MQTT",
          "methods": [
                "PUB"
          ],
          "pub_topic": "LS/v2/DGW/<device-name>/senml"
        },
        {
          "type": "REST",
          "methods": [
            "GET"
          ],
          "content-types": [
            "application/senml+json"
          ]
        }
      ]
    }
  ]
}
```
    
### 3.  Run the container:
    
It should be in  [priviledged](https://docs.docker.com/engine/reference/run/#runtime-privilege-and-linux-capabilities)  mode in order to access Raspberry Pi GPIO.
    
```bash
cd /home/pi/dgw
docker run --privileged -v $(pwd):/home/dgw --entrypoint=/home/dgw/device-gateway-linux-arm --rm farshidtz/adafruit_dht --conf /home/dgw/conf/device-gateway.json
```

**If there were no errors**, make a container that starts after boot and runs in detached mode (background):

```bash
docker run --privileged -v $(pwd):/home/dgw --entrypoint=/home/dgw/device-gateway-linux-arm -p 8080:8080 --name dgw_dht --restart=unless-stopped --log-opt max-size=10m -d farshidtz/adafruit_dht --conf /home/dgw/conf/device-gateway.json
```

Refer to  [docker run reference](https://docs.docker.com/engine/reference/run/)  to understand the given arguments.

  

## Try it out

-   Subscribe to the correct topic at the broker with the endpoint configured in DGW configuration.
-   Get latest measurement from the REST endpoint. The path comes from the names in device agent configuration. e.g.  [http://localhost:8080/rest/dht22/measurements](http://localhost:8080/rest/dht22/measurements)


[Continue with other hackathons](https://docs.linksmart.eu/display/HOME/LinkSmart+Hackathon+Organization)

---
_By Farshid Tavakolizadeh_
