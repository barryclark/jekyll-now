@addtogroup Analog

### Usage

1. Call pinMode() with `INPUT_ANALOG`
2. Optionally call analogReadSampleTime()
3. Call analogRead() to get a new sample (should take ~5us)

### Example

~~~{.cpp}

#include <Arduino.h>

void setup() {
  Serial1.begin(115200);
  pinMode(PA5, INPUT_ANALOG);
}

void loop() {
  Serial1 << "PA5=" << analogRead(PA5) << "\n";
  delay(50);
}

~~~
