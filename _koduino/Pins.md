@addtogroup Pins

### Usage

1. (Optionally) call pinRemap() to remap the AF or timer connected to a pin
2. Call pinMode() with any supported #WiringPinMode

### Pin remapping

The STM32 series allows multiplexing its pins for various purposes, but the procedure for doing so requires selecting a special "alternate function" (AF) number for the pin. This number has to be looked up from the datasheet.

There are some default assignments for all the pins which are linked to below for different variants:

* [f37xcc](https://docs.google.com/spreadsheet/pub?key=0Ai-vm-to9OcDdG1zMzR5WFhweGVwNlNnZmtQdlpsb2c&single=true&gid=1&output=html)
* f4xxrg

However, other assignments are possible, and the function pinRemap() can be called to do this. A common use case is changing the timer a pin is connected to (see example below).

## Example (changing connected timer)

~~~{.cpp}

#include <Arduino.h>

void setup() {
  // Non Arduino-like function to assign a different timer to PB6
  pinRemap(PB6, 11, TIMER19, 1);

  // Arduino-like configuration for PWM
  analogWriteFrequency(PB6, 25000);
  // Unlike in Arduino, this *MUST* be called before analogWrite()
  pinMode(PB6, PWM);
}

void loop() {
  // 75% duty cycle PWM at 25 KHz
  analogWrite(PB6, 0.75);
}

~~~
