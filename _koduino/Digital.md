@addtogroup Digital

### Usage

1. Call pinMode() to set the pin to `OUTPUT`, `OUTPUT_OPEN_DRAIN`, `INPUT`, `INPUT_PULLUP`, or `INPUT_PULLDOWN`
2. Call digitalWrite() with `HIGH`, `LOW` or `TOGGLE` on output pins
3. Call digitalRead() on input pins

### Example: Blink

~~~{.cpp}

#include <Arduino.h>

// Change to whatever pin an LED is connected to
const int led = PC13;

void setup() {
  pinMode(led, OUTPUT);
}

void loop() {
  digitalWrite(led, TOGGLE);
  delay(1000);
}

~~~
