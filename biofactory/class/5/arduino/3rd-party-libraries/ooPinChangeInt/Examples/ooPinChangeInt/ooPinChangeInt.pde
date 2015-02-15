// ooPinChangeInt Example by GreyGnome aka Mike Schwager.  Version numbers here refer to this sketch.
// Version 1.0 - initial version
// You can reduce the memory footprint of ooPinChangeInt by declaring that there will be no pin change interrupts
// on any one or two of the three ports.  If only a single port remains, the handler will be declared inline
// reducing the size and latency of the handler.
// #define NO_PORTB_PINCHANGES // to indicate that port b will not be used for pin change interrupts
// #define NO_PORTC_PINCHANGES // to indicate that port c will not be used for pin change interrupts
// #define NO_PORTD_PINCHANGES // to indicate that port d will not be used for pin change interrupts
// if there is only one PCInt vector in use the code can be inlined
// reducing latency and code size
// define DISABLE_PCINT_MULTI_SERVICE below to limit the handler to servicing a single interrupt per invocation.
// #define       DISABLE_PCINT_MULTI_SERVICE

#include <ooPinChangeInt.h>

#include <ByteBuffer.h>

// include "uint8ToString.h"
// To use the library, define a class that subclasses CallBackInterface, and put it in a .h file.
// And also, include a method (C++ talk for "subroutine") called "cbmethod()" in the class.
// Use this class as a template to create your own; it's not hard.  You don't
// even have to understand what you're doing at first.
#include "pushbuttonswitch.h" // How do you subclass?  See the pushbuttonswitch.h file:
ByteBuffer printBuffer(80);

pushbuttonswitch redswitch=pushbuttonswitch(2, "red");
pushbuttonswitch greenswitch=pushbuttonswitch(3, "green");
pushbuttonswitch blueswitch=pushbuttonswitch(A3, "blue");

void setup()
{
  Serial.begin(115200); Serial.println("---------------------------------------");
  redswitch.getCount();
}

void loop() {
  reportit(redswitch);
  reportit(greenswitch);
  reportit(blueswitch);
  delay(500);
}

void reportit(pushbuttonswitch& aswitch) {
  uint8_t tmp;
  if ((tmp=aswitch.getCount()) > 0) {
    Serial.print(aswitch.getName());
    Serial.print(" accumulated: "); Serial.print(tmp, DEC); Serial.println(" transitions.");
  }
}

