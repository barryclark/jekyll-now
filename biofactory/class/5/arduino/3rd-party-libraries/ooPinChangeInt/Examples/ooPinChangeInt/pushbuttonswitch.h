#if defined(ARDUINO) && ARDUINO >= 100
  #include <Arduino.h>
#else
  #include <pins_arduino.h>
  #include <WProgram.h>
#endif
#include <ByteBuffer.h>
#include "uint8ToString.h"

extern ByteBuffer printBuffer;
char numBuffer[4] = { 0, 0, 0, 0 };

// To use the library, define a class that subclasses CallBackInterface.
// And also, include a method (C++ talk for "subroutine") called "cbmethod()" in the class.
// Use this class as a template to create your own; it's not hard.  You don't
// even have to understand what you're doing at first.
// How do you subclass?  Like this:
class pushbuttonswitch : public CallBackInterface
{
 public:
   uint8_t count;
   uint8_t pin;
   char *name;

   pushbuttonswitch (uint8_t _pin, char *_name): pin(_pin), name(_name) {
     init();
   };

   void cbmethod() {
     count++;
     uint8ToString(numBuffer, pin);
     printBuffer.putString("Int: "); printBuffer.putString(numBuffer);
     printBuffer.putString(" "); printBuffer.putString(name);
   };
   
   uint8_t getCount() {
     return count;
   }
   
   char *getName() {
     return name;
   }
   
   uint8_t reset() {
     count=0;
   }

 private:
  void init () {
    pinMode(pin, INPUT);
    digitalWrite(pin, HIGH);
    PCintPort::attachInterrupt(pin, this, FALLING);
  };
};

