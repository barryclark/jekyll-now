// ooPinChangeIntTest
// version 1.0 Wed Feb 15 07:25:09 CST 2012
// version 1.1 Wed Nov 21 18:20:46 CST 2012 Modified to test the new detachInterrupt() of ooPinChangeInt version 1.03beta.
// version 1.2 Fri May  9 07:25:45 CDT 2014 Cleanup to eliminate compile warnings
//      Also added code so that detach/attachInterrupt() can add different pushbutton object method calls.

// See the Wiki at http://code.google.com/p/arduino-pinchangeint/wiki for more information.
// This sketch requires the ByteBuffer library, which is found in the ooPinChangeInt zipfile.
//

//-------- define these in your sketch, if applicable ----------------------------------------------------------
//-------- This must go ahead of the #include statement --------------------------------------------------------
// You can reduce the memory footprint of this handler by declaring that there will be no pin change interrupts
// on any one or two of the three ports.  If only a single port remains, the handler will be declared inline
// reducing the size and latency of the handler.
// #define NO_PORTB_PINCHANGES // to indicate that port b will not be used for pin change interrupts
// #define NO_PORTC_PINCHANGES // to indicate that port c will not be used for pin change interrupts
// #define NO_PORTD_PINCHANGES // to indicate that port d will not be used for pin change interrupts
// if there is only one PCInt vector in use the code can be inlined reducing latency and code size.
//
// You can reduce the code size by maybe 20 bytes, and you can speed up the interrupt routine
// slightly by declaring that you don't care if the static variable PCintPort::pinState
// is made available to your interrupt routine.
// #define NO_PIN_STATE        // to indicate that you don't need the pinState
// 
// define DISABLE_PCINT_MULTI_SERVICE below to limit the handler to servicing a single interrupt per invocation.
// #define       DISABLE_PCINT_MULTI_SERVICE
// The following is intended for testing purposes.  If defined, then a variable PCintPort::pinMode can be read
// in your interrupt subroutine.  It is not defined by default:
// #define PINMODE
//-------- define the above in your sketch, if applicable ------------------------------------------------------
#define PINMODE
#define FLASH
#include <ByteBuffer.h>
#include <ooPinChangeInt.h>
#include "pushbuttonswitch.h"

// This example demonstrates a configuration of 6 interrupting pins and 3 interrupt functions.
// A variety of interrupting pins have been chosen, so as to test all PORTs on the Arduino.
// The pins are as follows:
// For the Analog Input pins used as digital input pins, and you can use 14, 15, 16, etc.
// or you can use A0, A1, A2, etc. (the Arduino code comes with #define's
// for the Analog Input pins and will properly recognize e.g., pinMode(A0, INPUT);

pushbuttonswitch pin2sw=pushbuttonswitch(2, "two", FALLING); // Port D
pushbuttonswitch pin3sw=pushbuttonswitch(3, "three", RISING);
pushbuttonswitch pin11sw=pushbuttonswitch(11, "eleven", CHANGE); // Port B
pushbuttonswitch pin12sw=pushbuttonswitch(12, "twelve", RISING);
pushbuttonswitch pinA3swa=pushbuttonswitch(A3, "A3a", CHANGE); // PORTC, also can be given as 17
// This one doesn't get attached here...
pushbuttonswitch pinA3swb=pushbuttonswitch(A3, "A3B", CHANGE); // PORTC, also can be given as 17
startswitch startsw=startswitch(A4, "a4/start", FALLING); // starts and stops the count

pushbuttonswitch *pins[6]={ &pin2sw, &pin3sw, &pin11sw, &pin12sw, &pinA3swa, &startsw };

// HOW IT WORKS
// The interrupt on Arduino pin A4 will, when triggered, start the counting of interrupts.  
// The count in each switch is updated from the interrupts; each object keeps track of the number
// of its interrupts.  Every second in the main loop the pins array is scanned and registered
// interrupts are reported for all pins interrupted since the previous second.  If no interrupts,
// the output is quiet.

// startsw is special.  Not only does it start the counting of the interrups, but it turns on and off
// interrupts on the "detachable switches" pin3sw, pin12sw, and pinA3sw.  All pins start by
// interrupting (note: but not counting), but after the count is turned on and then turned off, the 3
// pins are detached from interrupts.  Everytime thereafter when the count is turned off the 3 pins are
// detached.  They are reattached when turned on.  The other 3 pins do not detach, but their count is
// turned on and off.

// Output is copied to a buffer, because we can't do a Serial.print() statement in an interrupt
// routine.  The main loop checks  for entries in the buffer and prints them if found.
// Output looks like this:
// -F- - an interrupt triggered by a falling signal occurred.
// +R+ - an interrupt triggered by a rising signal occurred.
// *C* - an interrupt triggered by a change in signal occurred.
// f#p#-P# - f# shows the interrupt subroutine that was called: 0, 1, or 2
//         - p# shows the pin number that triggered the interrupt
//         - P# shows the port that this pin number is attached to. 2 is PORTB, 3 is PORTC, 4 is PORTD

// HOW TO CONNECT
// Each pin gets a momentary contact switch connected to it.  One side of the switch should connect
// to ground.  The other side of the switch connects to the Arduino pin.  For my purposes, I am using
// two rotary encoders.  Each encoder contains 3 switches.  But 6 regular pushbuttons would work, too.

/* WHAT TO LOOK FOR
 Output is sent to the serial line, so the Arduino IDE's serial terminal should be opened.
 Upon startup, press PINS1-5.  You will see output like this:
-F-f0p2-P4 (counting off)
..*C*f0p11-P2 (counting off)
+R+f0p3-P4 (counting off)
 This shows that
 1. an interrupt was triggered on a falling signal (*F*).  It called (f0) function 0, which is quicfunc0.
    The triggering pin was (p2) Arduuino pin 2, which is on (P4) Port 4 (PORTD).  Counting of this interrupt is
    off, so you will not see any output from the main loop.
 2. Two dots appeared.  Dots came from iterations of loop(), so these 2 dots show that the two interrupts happened 2 seconds apart.
 3. an interrupt was triggered on a change in signal (*C*).  It called quicfunc0, from Arduino pin 11, on Port 2 (PORTB).
    The interrupt was not counted.
 4. an interrupt was triggered on a rising signal (+R+).  It called quicfunc0, from Arduino pin 3, on Purt 4 (PORTD).
    The pin should have started out at the high level, so likely the signal fell during onother interrupt, and now
    the rise has been caught.
    
 Now press the button attached to PIN6 (in our case, A4 or D18).  You will see something like this:
-F-START! f2p18-P3
.Count for pin A4 is 1
 This shows that
 1. The counting machanism (START!) was triggered by a folling signal (-F-) on pin 18 (p18) which is in Port 3 (P3) (which == PORTC) and
    function f2 was called (f2).
 2. A dot appeared, which came from loop() because a second passed.
 3. The count for p18 or A4 was displayed.
 
 Now you will see messages for all the pins that you manipulate, for example:
*C*f0p11-P2
+R+f0p3-P4
*C*f0p11-P2
+R+f0p3-P4
*C*f0p11-P2
.Count for pin D3 is 6
Count for pin D11 is 9
.+R+f0p3-P4
-F-f0p2-P4
.Count for pin D2 is 1
Count for pin D3 is 1
 These codes reflect the interrupts, as described above.  This output will take place until you press PIN6:
-F-f2: STOP! Counting off.
Interrupt OFF on PIN1 (2) PIN3 (11) PIN5 (17)
 Then you will see output like this:
.....................+R+f0p12-P2 (counting off)
.+R+f0p12-P2 (counting off)
+R+f0p12-P2 (counting off)
+R+f0p12-P2 (counting off)
 and PIN1, PIN3, and PIN5 will not trigger interrupts.
*/
// NOTES
// Output overwrites:
// It's possible during moderately fast interrupts to see your print output get garbled; eg,
// +R+f0p12-P2 (+R+f0p12-P2 (counting +R+f0p12-P2 (cou+R+f0p12-P+R+f0p12
// This is because the print of the buffer takes place inside a while loop, and it can
// be interrupted and new data inserted into the buffer at a midpoint of the buffer's text.
// Just by spinning my rotary encoders I can readily generate over 200 interrupts per second
// on a pin, which is easily fast enough to overrun Serial output at 115,200 bps.
// The lesson here?  ...Interrupts are tricky, and interrupt service routines should be fast.
// Just sayin'.

// Pins:
// We want to use pins from each of ports B, C and D.  So choose wisely.  Ports are shown in
// this diagram of the ATmega328P chip.  PD0 means "Port D, pin 0".  PC3 means "Port C, Pin 3",
// PB2 means "Port B, pin 2" and so on.  The corresponding Arduino pins are in parentheses.
// So PB2 is Arduino pin D 10, for example.
/*
                  +-\/-+
            PC6  1|    |28  PC5 (AI 5)
      (D 0) PD0  2|    |27  PC4 (AI 4)
      (D 1) PD1  3|    |26  PC3 (AI 3)
      (D 2) PD2  4|    |25  PC2 (AI 2)
 PWM+ (D 3) PD3  5|    |24  PC1 (AI 1)
      (D 4) PD4  6|    |23  PC0 (AI 0)
            VCC  7|    |22  GND
            GND  8|    |21  AREF
            PB6  9|    |20  AVCC
            PB7 10|    |19  PB5 (D 13)
 PWM+ (D 5) PD5 11|    |18  PB4 (D 12)
 PWM+ (D 6) PD6 12|    |17  PB3 (D 11) PWM
      (D 7) PD7 13|    |16  PB2 (D 10) PWM
      (D 8) PB0 14|    |15  PB1 (D 9) PWM
                  +----+
*/

ByteBuffer printBuffer(120);

long begintime=0;
long now=0;

uint8_t i;
void setup() {
  Serial.begin(115200);
  PCintPort::attachInterrupt(2, &pin2sw, FALLING);
  PCintPort::attachInterrupt(3, &pin3sw, RISING);
  PCintPort::attachInterrupt(11, &pin11sw, CHANGE);
  PCintPort::attachInterrupt(12, &pin12sw, RISING);
  PCintPort::attachInterrupt(A3, &pinA3swa, CHANGE);
  PCintPort::attachInterrupt(A4, &startsw, FALLING);
  startsw.addDetachableSwitch(&pin3sw);
  startsw.addDetachableSwitch(&pin12sw);
  startsw.addDetachableSwitch(&pinA3swa);
  startsw.setSpareSwitch(&pinA3swb);
  delay(250);
  Serial.println("Test");
  delay(500);
  Serial.println("---------------------------------------");
  begintime=millis();
}

void loop() {
  now=millis();
  uint8_t count;
  char outchar;
  
  do {
    cli(); outchar=(char)printBuffer.get(); sei();
    if (outchar != 0) { Serial.print(outchar); }
  } while (outchar != 0);
  if ((now - begintime) > 1000) {
    Serial.print(".");
    if (printBuffer.checkError()) {
      Serial.println("NOTICE: Some output lost due to filled buffer.");
    }
    for (i=0; i < 6; i++) {
      if ((count=pins[i]->getCount()) != 0) {
        pins[i]->reset();
        Serial.print("Count for pin ");
        if (pins[i]->pin < 14) {
          Serial.print("D");
          Serial.print(pins[i]->pin, DEC);
        } else {
          Serial.print("A");
          Serial.print(pins[i]->pin-14, DEC);
        }
        Serial.print(" is ");
        Serial.println(count, DEC);
      }
    }
    begintime=millis();
  }
}

