// Version 1.1: OO version
#include <ByteBuffer.h>
#include <ooPinChangeInt.h> // necessary otherwise we get undefined reference errors.
#define DEBUG
#ifdef DEBUG
ByteBuffer printBuffer(200);
#endif
#include <AdaEncoder.h>

#define ENCA_a 2
#define ENCA_b 3
#define ENCB_a A3
#define ENCB_b A4

AdaEncoder encoderA = AdaEncoder('a', ENCA_a, ENCA_b);
AdaEncoder encoderB = AdaEncoder('b', ENCB_a, ENCB_b);

int8_t clicks=0;
char id=0;

void setup()
{
  Serial.begin(115200); Serial.println("---------------------------------------");
}

void loop() 
{
  char outChar;
  while ((outChar=(char)printBuffer.get()) != 0) Serial.print(outChar);
  AdaEncoder *thisEncoder=NULL;
  thisEncoder=AdaEncoder::genie();
  if (thisEncoder != NULL) {
    Serial.print(thisEncoder->getID()); Serial.print(':');
    clicks=thisEncoder->query();
    if (clicks > 0) {
      Serial.println(" CW");
    }
    if (clicks < 0) {
       Serial.println(" CCW");
    }
  }
}

