// Software Interrupts Example

#define       NO_PORTB_PINCHANGES
#define       NO_PORTC_PINCHANGES

#include <ooPinChangeInt.h>
#include <cb.h>

// Defining your class in an Arduino sketch is not fully supported.  In this sketch,
// it works.  But it may trip you up.  For example, using an object as an argument
// in a C-style function will probably fail.
class speedy : public CallBackInterface
{
 public:
   uint8_t id;
   long count;
   speedy (): id(0) { init(); };
   speedy (uint8_t _i): id(_i) { init(); };

   void init() {
     count=0;
   }

   // CallBackInterface requires you to define this method.  It's what
   // will be called when the pin is interrupted.
   // Here, we simply set var0 to the low byte of the Arduino's clock.
   // In the real world, you'd probably do something important.
   void cbmethod() {
     count++;
   }

   uint8_t getID() {
     return (id);
   }

   long getCount() {
     return (count);
   }

   void reset() {
     count=0;
   }
};

volatile uint8_t *pinT_OP, *led_port;
volatile uint8_t *pinT_IP;
uint8_t pinT_M, not_pinT_M, led_mask, not_led_mask;

#define PINLED 13
// IMPORTANT:  See the #define NO_PORTx_PINCHANGES, above!
// With those define'd, this only works for PORTD pins.
// This pin will be configured as an output.  Don't connect an input device
// (switch or what have you) to this port, or you could fry the Arduino!
#define PINTEST 5

int i=0;
speedy speedster=speedy(PINTEST);

void setup()
{
  Serial.begin(115200); Serial.println("---------------------------------------");
  pinMode(PINLED, OUTPUT); digitalWrite(PINLED, LOW);
  pinMode(PINTEST, OUTPUT); digitalWrite(PINTEST, HIGH);
  // *****************************************************************************
  // *** set up LED
  // *****************************************************************************
  led_port=portOutputRegister(digitalPinToPort(PINLED));
  led_mask=digitalPinToBitMask(PINLED);
  not_led_mask=led_mask^0xFF;
  // *****************************************************************************
  // *** set up test pin
  // *****************************************************************************
  pinT_OP=portOutputRegister(digitalPinToPort(PINTEST)); // output port
  pinT_IP=portInputRegister(digitalPinToPort(PINTEST));  // input port
  pinT_M=digitalPinToBitMask(PINTEST);                   // mask
  not_pinT_M=pinT_M^0xFF;                       // not-mask
  *pinT_OP|=pinT_M;
  // *****************************************************************************
  PCintPort::attachInterrupt(PINTEST, &speedster, CHANGE);
} // end setup()

unsigned long milliStart, milliEnd, elapsed;
void loop() {
  uint8_t k=0;
  i=0;
  *pinT_OP|=pinT_M;        // pintest to 1
  Serial.print("Testing pin: "); Serial.print(PINTEST, DEC); Serial.print(" ");
  Serial.print(" interrupt's id: ");
  Serial.println(speedster.getID(), DEC);
  delay(1000);
  Serial.print("Start..");
  delay(1000); Serial.println("*");
  *led_port|=led_mask;
  milliStart=millis();
  while (i < 1000) {
    k=0;
    while (k < 100) {
      *pinT_OP&=not_pinT_M;    // pintest to 0
      *pinT_OP|=pinT_M;        // pintest to 1
      k++;
    }
    i++;
  }
  milliEnd=millis();
  *led_port&=not_led_mask;
  elapsed=milliEnd-milliStart;
  Serial.print("Elapsed: "); 
  Serial.println(elapsed, DEC);
  Serial.print("Interrupts: ");
  Serial.println(speedster.getCount(), DEC);
  speedster.reset();
  delay(500);
}

