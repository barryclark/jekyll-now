---
layout: post
comments: true
title: Controlling the water pump with Arduino
---

My spinach farm has been doing alright so far. Since the beginning, I always want to add a touch of technology to this mini-agriculture project. It’s only natural that the next step after proving to myself that I can grow and take care of something is to delegate that task to a machine. I want the plant pot to have ability to water the plants remotely and automatically.

#### Components:
- Arduino UNO R3
- 12V mini water pump
- Jumper wires
- 2-Relay Module
- 9V battery
- Breadboard
- LED light

#### Wiring:

![Model circuit for how the Arduino, the relay module and the water pump are connected](https://i.imgur.com/YK0pB6R.png)

<!--excerpt-->

Courtesy to Tinkercad for amazing circuit board modelling and Evernote for wonder image annotation.

There isn’t a readily modelled image for the relay module so I need to improvise here. However, this is pretty much how it was wired. I used 2 breadboards for the real life model but this wiring can be achieved with no breadboards at all.

**Note #1:** The water pump is 12V but 9V seems to work fine. I haven’t tested with full power but the pump has no problem sucking the water at 9V.

#### Coding:

As I have wired IN1 and IN2 to pin 9 and 8 respectively, let’s start by declaring these 2 pins. Open a new sketch in Arduino IDE, add these following lines to the top of the sketch.

```bash
#define RELAY1 9
#define RELAY2 8
```

These pins will control the output so the `setup()` function will be as follows:

```bash
void setup() {
    pinMode(RELAY1, OUTPUT);
    pinMode(RELAY2, OUTPUT);
}
```

In the loop, let’s try to get the water to be pumped for 2 seconds and then rest for 2 seconds.

```bash
void loop() {
    digitalWrite(RELAY1, LOW);    // turn on relay 1
    delay(2000);                            // wait 2 seconds
    digitalWrite(RELAY1, HIGH);  // turn off relay 1

    digitalWrite(RELAY2, LOW);    // turn on relay 2
    delay(2000);                            // wait 2 seconds
    digitalWrite(RELAY2, HIGH);  // turn off relay 2
}
```

The water pump should run and you can try adding other types of control such as push buttons or IR remote control. If you want, you can also replace the Arduino UNO R3 with a Raspberry Pi. You can write a Python script instead and the possibilities are endless.

**Next step:** Put everything together and design the plant pot with the watering system.

**Bonus:** Video of the water pump with push buttons to control ON/OFF

[![Video of the water pump with push buttons to control ON/OFF](https://i.imgur.com/IoMAQDF.png)](https://www.youtube.com/watch?v=Zz6ISKUt1Ac)




