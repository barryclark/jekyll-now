@addtogroup Timebase

### Usage

1. Call attachTimerInterrupt() with index 0-2, a callback function, and a frequency in Hz

### Example: Parallel blink

~~~{.cpp}
const int ledg = PA8;
const int ledy = PD8;
const int ledr = PB15;

void blinky() {
  digitalWrite(ledy, TOGGLE);
}
void blinkr() {
  digitalWrite(ledr, TOGGLE);
}

void setup() {
  pinMode(ledg, OUTPUT);
  pinMode(ledy, OUTPUT);
  pinMode(ledr, OUTPUT);

  attachTimerInterrupt(0, blinky, 4);
  attachTimerInterrupt(1, blinkr, 10000);
}

void loop() {
  digitalWrite(ledg, TOGGLE);
  delay(1000);
}
~~~

