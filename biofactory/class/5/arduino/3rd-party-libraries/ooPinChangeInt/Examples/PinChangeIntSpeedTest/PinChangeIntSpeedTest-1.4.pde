// PinChangeIntSpeedTest by GreyGnome aka Mike Schwager.  Version numbers here refer to this sketch.
// Version 1.0 - initial version
// Version 1.1 - added code to test digitalRead()
// Version 1.2 - added new comments for the #define's for the NO_PORTx_PINCHANGES.
// Version 1.3 - includes cbiface.h with ooPinChangeInt, rather than cb.h
//   Also added a #define/#undef INLINE_PCINTFUNC for inlining of the function called by the interrupt.
//   Default:  #undef for using the function as per usual.  Changed PCIVERSION so that
//   ooPinChangeInt starts at 1000 instead of 200.  Modified the "Start" message to show "Start..", pause
//   for 1 second, show "*\n" (where \n is a newline), pause for 1 second, then run the test.
// Version 1.4 - made this compatible with version 1.5 of PinChangeInt

// This version number is for PinChangeInt
#define PCIVERSION 150 // 110 if using PinChangeInt-1.1, 120 for version 1.2
                       // 1000 for ooPinChangeIntversion 1.00, 1001 for ooPinChangeInt version 1.01, etc.

//-------- define these in your sketch, if applicable ----------------------------------------------------------
// You can reduce the memory footprint of this handler by declaring that there will be no pin change interrupts
// on any one or two of the three ports.  If only a single port remains, the handler will be declared inline
// reducing the size and latency of the handler.
#undef NO_PORTB_PINCHANGES // to indicate that port b will not be used for pin change interrupts
#undef NO_PORTC_PINCHANGES // to indicate that port c will not be used for pin change interrupts
// #define NO_PORTD_PINCHANGES // to indicate that port d will not be used for pin change interrupts
// You can reduce the code size by 20-50 bytes, and you can speed up the interrupt routine
// slightly by declaring that you don't care if the static variables PCintPort::pinState and/or
// PCintPort::arduinoPin are set and made available to your interrupt routine.
// #define NO_PIN_STATE        // to indicate that you don't need the pinState
// #define NO_PIN_NUMBER       // to indicate that you don't need the arduinoPin
// if there is only one PCInt vector in use the code can be inlined
// reducing latency and code size
// define DISABLE_PCINT_MULTI_SERVICE below to limit the handler to servicing a single interrupt per invocation.
// #define       DISABLE_PCINT_MULTI_SERVICE
//-------- define the above in your sketch, if applicable ------------------------------------------------------
#if defined(PCIVERSION) && PCIVERSION >= 1000
  #define LIBRARYUNDERTEST "ooPinChangeInt"
  #include <ooPinChangeInt.h>
  #if PCIVERSION == 1001
    #include <cb.h>
  #else
    #include <cbiface.h>
  #endif
#else
  #define LIBRARYUNDERTEST "PinChangeInt"
  #include <PinChangeInt.h>
#endif

#define SERIALSTUFF // undef to take out all serial statements.  Default:  #define for measuring time.
#undef MEMTEST     // undef to take out memory tests.  Default:  #undef for measuring time.
#undef INLINE_PCINTFUNC // define to inline the function called from the interrupt.  This should have no effect,
                        // because the compiler will store the registers upon calling the interrupt routine, just
                        // like calling a function.  Still, we test all assumptions.
//-----------------------
// NOTE:  BECAUSE OF COLLISIONS in these libraries, you CANNOT have both libraries:  PinChangeInt
// and ooPinChangeInt in the libraries directory at the same time.  That said, under UNIX-y operating
// systems, it's easy to move the library directory to a name such as "PinChangeInt-1.3", which the
// Arduino will not recognize, and then create a symbolic link when you want to use a library.  Such as:
// cd ~/Documents/Arduino/libaries
// mv PinChangeInt PinChangeInt-1.30
// mv ooPinChangeInt ooPinChangeInt-1.00
// ln -s PinChangeInt-1.30 PinChangeInt

#undef FLASH // to flash LED on pin 13 during test

#ifdef MEMTEST
#include <MemoryFree.h>
#endif

#define TEST 1

#if   TEST == 1
#define PTEST 2  // pin to trigger interrupt.  pins 0 and 1 are used
#define PLOW  2  // by Serial, so steer clear of them!
#define PHIGH 2  // Interrupts are attached to these pins

#elif TEST == 2  // see the #if TEST == 2 || TEST == 3 code, below
#define PTEST 2
#define PLOW  2
#define PHIGH 2  // need to attachInterrupt to 5 in the code

#elif TEST == 3  // see the #if TEST == 2 || TEST == 3 code, below
#define PTEST 5
#define PLOW  2
#define PHIGH 2  // need to attachInterrupt to 5 in the code

#elif TEST == 4
#define PTEST 2
#define PLOW  2
#define PHIGH 5

#elif TEST == 5
#define PTEST 3
#define PLOW  2
#define PHIGH 5

#elif TEST == 6
#define PTEST 4
#define PLOW  2
#define PHIGH 5

#elif TEST == 7
#define PTEST 5
#define PLOW  2
#define PHIGH 5
#endif

uint8_t qf0;

#ifdef INLINE_PCINTFUNC
#define INLINE_PCINTFUNC inline
#else
#define INLINE_PCINTFUNC
#endif
INLINE_PCINTFUNC void quicfunc();
void quicfunc() {
  qf0=TCNT0;
}

class speedy : public CallBackInterface
{
 public:
   uint8_t id;
   static uint8_t var0;
   speedy () { id=0; };
   speedy (uint8_t _i): id(_i) {};

   void cbmethod() {
     speedy::var0=TCNT0;
     //Serial.print("Speedy method "); // debugging
     //Serial.println(id, DEC);
   };
};
uint8_t speedy::var0=0;

volatile uint8_t *led_port;
volatile uint8_t *pinT_OP;
volatile uint8_t *pinT_IP;
uint8_t led_mask, not_led_mask;
uint8_t pinT_M, not_pinT_M;
volatile uint8_t pintest, pinIntLow, pinIntHigh;
uint8_t totalpins;
speedy speedster[8]={speedy(0), speedy(1), speedy(2), speedy(3), speedy(4), speedy(5), speedy(6), speedy(7) };
#ifdef MEMTEST
int freemem;
#endif

int i=0;

#define PINLED 13
void setup()
{
#ifdef SERIALSTUFF
  Serial.begin(115200); Serial.println("---------------------------------------");
#endif SERIALSTUFF
  // set up ports for trigger
  pinMode(0, OUTPUT); digitalWrite(0, HIGH);
  pinMode(1, OUTPUT); digitalWrite(1, HIGH);
  pinMode(2, OUTPUT); digitalWrite(2, HIGH);
  pinMode(3, OUTPUT); digitalWrite(3, HIGH);
  pinMode(4, OUTPUT); digitalWrite(4, HIGH);
  pinMode(5, OUTPUT); digitalWrite(5, HIGH);
  pinMode(6, OUTPUT); digitalWrite(6, HIGH);
  pinMode(7, OUTPUT); digitalWrite(7, HIGH);
#ifdef FLASH
  led_port=portOutputRegister(digitalPinToPort(PINLED));
  led_mask=digitalPinToBitMask(PINLED);
  not_led_mask=led_mask^0xFF;
  pinMode(PINLED, OUTPUT); digitalWrite(PINLED, LOW);
#endif
  // *****************************************************************************
  // set up ports for output ************ PIN TO TEST IS GIVEN HERE **************
  // *****************************************************************************
  pintest=PTEST;
  pinIntLow=PLOW; pinIntHigh=PHIGH;  // Interrupts are attached to these pins
  // *****************************************************************************
  // *****************************************************************************
  pinT_OP=portOutputRegister(digitalPinToPort(pintest)); // output port
  pinT_IP=portInputRegister(digitalPinToPort(pintest));  // input port
  pinT_M=digitalPinToBitMask(pintest);                   // mask
  not_pinT_M=pinT_M^0xFF;                       // not-mask
  *pinT_OP|=pinT_M;
  for (i=pinIntLow; i <= pinIntHigh; i++) {
#if PCIVERSION >= 1000
    PCintPort::attachInterrupt(i, &speedster[i], CHANGE); // C++ technique; v1.3 or better
#else
    PCintPort::attachInterrupt(i, &quicfunc, CHANGE);      // C technique; v1.2 or earlier
#endif
  }
#if TEST == 2 || TEST == 3
  i=5; totalpins=2;
#if PCIVERSION >= 1000
  PCintPort::attachInterrupt(i, &speedster[i], CHANGE); // C++ technique; v1.3 or better
#else
  PCintPort::attachInterrupt(i, &quicfunc, CHANGE);      // C technique; v1.2 or earlier
#endif
#else
  totalpins=pinIntHigh - pinIntLow + 1;
#endif
  i=0;
} // end setup()

uint8_t k=0;
unsigned long milliStart, milliEnd, elapsed;
void loop() {
  k=0;
  *pinT_OP|=pinT_M;        // pintest to 1
#ifdef SERIALSTUFF
  Serial.print(LIBRARYUNDERTEST); Serial.print(" ");
  Serial.print("TEST: "); Serial.print(TEST, DEC); Serial.print(" ");
#ifndef MEMTEST
  Serial.print("test pin mask: "); Serial.print(pinT_M, HEX);
  Serial.print(" interrupted pin: ");
  Serial.print(speedster[pintest].id, DEC);
  Serial.print(" of a total of "); Serial.print(totalpins, DEC); Serial.println(" pins.");
#endif
#ifdef MEMTEST
  freemem=freeMemory(); Serial.print("Free memory: ");  Serial.println(freemem, DEC);
#endif
#endif
  delay(1000);
  Serial.print("Start..");
  delay(1000); Serial.println("*");
  #ifdef FLASH
  *led_port|=led_mask;
  #endif
  milliStart=millis();
  while (k < 10) {
    i=0;
    while (i < 10000) {
      *pinT_OP&=not_pinT_M;    // pintest to 0 ****************************** 16.8 us
      *pinT_OP|=pinT_M;        // pintest to 1 ****************************** ...to get here
      i++;
    }
    k++;
  }
  milliEnd=millis();
  #ifdef FLASH
  *led_port&=not_led_mask;
  #endif
  elapsed=milliEnd-milliStart;
#ifdef SERIALSTUFF
#ifndef MEMTEST
  Serial.print("Elapsed: "); 
  Serial.println(elapsed, DEC);
#endif
#endif
  delay(500);
}

