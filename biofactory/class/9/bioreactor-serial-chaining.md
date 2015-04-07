---
layout: page
title: The bioreactor serial bus 
permalink: /biofactory/class/9-reactor-controller/serial-bus/
---

## Bus protocol

To be able to hook up arbitrary number of devices

## Arduino code


```

#define CHAIN_SERIAL_RX_PIN 8
#define CHAIN_SERIAL_TX_PIN 9
SoftwareSerial chainedDeviceSerial(CHAIN_SERIAL_RX_PIN, CHAIN_SERIAL_TX_PIN);
String chainedDeviceBuffer;


void setup() {
  OTHER SETUP CODE

  chainedDeviceSerial.begin(9600);
}

void loop() {

  OTHER LOOP CODE

  // Check if there is new data on the chained device. If so, sent it to the controller but prefixed with a $ character
  while (chainedDeviceSerial.available()>0) {
    char c = (char)chainedDeviceSerial.read();
    if (c == '\n') {
      Serial.print("$"); Serial.println(chainedDeviceBuffer);
      chainedDeviceBuffer = "";
    } else {
      if (chainedDeviceBuffer.length()<100)
        chainedDeviceBuffer += c;
    }
  }
    
  while (Serial.available()>0) {
    char c = (char)Serial.read();
    if (c == '\n') {
      if (buffer.startsWith("$")) {
        chainedDeviceSerial.println(buffer.substring(1));
      } else if(buffer.startsWith("id")) {
        Serial.println("id:peristaltic-pump"); // so the bioreactor can figure out what is connected 
      } else if( OTHER COMMANDS )  
      
      else {
        Serial.println("Unknown cmd.");
      }
      buffer="";
    } else buffer+=c;
  }  

```


## Processing code

```

```


## Wiring


