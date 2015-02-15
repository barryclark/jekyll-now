// We use 4-character tabstops, so IN VIM:  <esc>:set ts=4 sw=4 <cr>
// ...that's: ESCAPE key, colon key, then "s-e-t SPACE key t-s-=-4 SPACE key s-w-=-4 CARRIAGE RETURN key"
/*
  AdaEncoder.cpp - A library for reading from Lady Ada's or 
  Sparkfun's rotary encoder.

  Version 0.7 Tue Nov 20 17:56:29 CST 2012

  Copyright 2011 Michael Schwager (aka, "GreyGnome").

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

	Questions?  Send mail to mschwage@gmail.com, or see the AdaEncoder Google code page:
	http://code.google.com/p/adaencoder/
*/

#ifndef AdaEncoder_h
#include "AdaEncoder.h"
#include "turnOffPWM.h"
#endif

#undef DEBUG

#ifdef DEBUG
#include "../ByteBuffer/ByteBuffer.h"
#include "../GetPSTR/GetPSTR.h"
extern ByteBuffer printBuffer;
#endif

# define cli()  __asm__ __volatile__ ("cli" ::)
# define sei()  __asm__ __volatile__ ("sei" ::)

#undef SWINTR_DEBUG // To debug using software interrupts on your two pins, define this.
		    // Then in your sketch, set your pins as outputs.  Initialize them as you
		    // desire, attach an interrupt, then the interrupt code will be called.
		    // CAUTION: Make sure you do NOT have any switches connected to those outputs,
		    // or you may end up frying your ATmega328!
#undef DEBUGTIME    // Used to set/reset pin 13 when measuring timings for the code.  To create the software
		    // interrupts for that you probably want to set SWINTR_DEBUG, too.

/*
 * NOTES
 * This library interfaces with 2-pin encoders (2 pins A and B, then a common pin C).
 * It does not indicate every state change, rather, it reports only when the decoder
 * is turned from one detent position to the next.  It is interrupt-driven and designed
 * to be fast and easy to use.  The interrupt routine is lightweight, and the
 * programmer is then able to read the direction the encoder turned at their leisure
 * (within reason; what's important is that the library is reasonably forgiving).  The
 * library is designed to be easy to use and it is reasonably immune to switch bounce.
 *
 * Connecting your encoder:
 *
 * Refer to the pin chart at http://www.arduino.cc/en/Hacking/PinMapping168.
 *
 * The ATmega328 and its kind (ATmega168, ATmega2560) all use PORTs for their
 * input and outputs.  A PORT is essentially a group of pins on the ATmega
 * processor.  They are interesting because the pins grouped in each
 * PORT share some things in common.  For example, you can read all the pins
 * in a PORT in one command.  What this means for you as a designer is that
 * you should NOT use two different PORTs for the two pins of your rotary
 * encoder.
 *
 * How do you know which pins are common with which PORTs?  Look at the pin
 * mapping diagram as given in the link, above.  The pin names closest to
 * the IC chip:  ie, PD0, PD1, PB6, etc., show you the PORTs.  B, C, and D are
 * the three PORTs available on the ATmega168 and 328.  There are more PORTs
 * on the ATmega2560 used in the Arduino Mega, but only those 3 PORTs allow for
 * Pin Change interrupts on those bigger chips, too.
 *
 * So, when you connect your rotary encoder to your Arduino, make sure that its
 * two pins- which I call PinA and PinB- both attach to the same PORT.  This is
 * a summary of the Arduino-to-port mappings that are available to you:
 * Arduino Pins		PORT
 * ------------		----
 * Digital 0-7		D
 * Digital 8-13		B
 * Analog  0-5		C
 *
 * In summary, what you need to do... the ONLY thing you really need to do...
 * is ensure that both pins of your encoder are attached to pins within those
 * ranges, above.  Don't cross ranges and connect, for example, digital pin 7
 * to digital pin 10.  It won't work, and the addEncoder method will not configure
 * your ports.
 *
 * Schematic of Rotary Encoder:
 *                +-- A --> Arduino pinA
 *   +-- common --+
 *   |            +-- B --> Arduino pinB
 *  gnd
 *
 * Scattered Design notes:
 * I want a function that will give me the ATmega value of a pin.
 * Given: Arduino pin number.
 * Returns:  Value of that pin, using PORT commands for speed.
 * Note: Given an Arduino pin number,
 * volatile uint8_t *port;
 * portNumber=digitalPinToPort(LED); // for a the Register lookup table, this does a 1-1 correspondence to a port's address
 * port=portOutputRegister(ledportNumber); // if doing output, or,
 * port=portInputRegister(ledportNumber);  // ...if doing input
 * mask=digitalPinToBitMask(LED);    // defines the actual pin on that port
 *
 * example for output:
 * *port|=mask; // sets it high
 * 
 * For interesting port info, See:  http://jeelabs.org/2010/01/06/pin-io-performance/

 * digitalPinToPort() goes like this:
 * #define digitalPinToPort(P) ( pgm_read_byte( digital_pin_to_port_PGM + (P) ) )
 * const uint8_t PROGMEM digital_pin_to_port_PGM[] = {
 *        PD, // 0
 *        PD,
 *        PD,
 *        ...etc...
 *        PB, // 8
 *        PB,
 *        ...etc...
 *        PC, // 14
 * #define PB 2
 * #define PC 3
 * #define PD 4
*/

AdaEncoder *firstEncoder=NULL;
AdaEncoder *currentEncoder=NULL;
#ifdef DEBUGTIME
volatile uint8_t *ada_output_port;
uint8_t ada_output_mask;
uint8_t ada_not_output_mask;
#endif

AdaEncoder *AdaEncoder::getFirstEncoder() {
	return firstEncoder;
}

/*
 * addEncoder
 * Arguments:
 * - id: a single char that identifies this encoder
 * - pinA: The pin on the Arduino that one side of the encoder plugs into.  Turning in this direction means we're
 *   turning clockwise.
 * - pinB: The Arduino pin connected to the encoder; this is the counterclockwise direction.
 *
 * The pins can be any of the digital pins 0-13, or any of the analog pins A0-A5 (aka, 14-19).  You can specify the
 * analog pins as A0, A1, A2, ... etc.
 *
 * The pins must be paired in the same port, as described above.  In summary this means that the two pins should
 * together be grouped within a single port; ie, if you connect pinA to digital pin 9, you must connect pinB to
 * digital pin 8 or 10-13.  See this table:
 * Arduino Pins		PORT
 * ------------		----
 * Digital 0-7		D
 * Digital 8-13		B
 * Analog  0-5		C	(== digital pins 14-19)
 */

void AdaEncoder::addEncoder(char _id, uint8_t _pinA, uint8_t _pinB)
{
	AdaEncoder *tmpencoder;

	id=_id;
	pinA=_pinA;
	pinB=_pinB;
#ifdef DEBUG
	printBuffer.putString(getPSTR("addEncoder: "));
	printBuffer.put(id);
	printBuffer.put('\n');
	printBuffer.putHex(pinA); printBuffer.put(' ');
	printBuffer.putHex(pinB); printBuffer.put(' ');
	printBuffer.putString(getPSTR(" *\n"));
#endif

	// error checking
	if (pinA == pinB) return;  // No! silly
	if (pinA < 8 && pinB > 7) return; // No! different ports
	if ((pinA > 7 && pinA < 14) && (pinB < 8 || pinB > 13)) return; // No! different ports
	if (pinA > 13 && pinB < 14) return; // No! different ports
	if (pinA > 19 || pinB > 19) return; // No! out of band

	turning=0;
	clicks=0;

	/* ADD TO THE LIST HERE */
	if (firstEncoder==NULL) { firstEncoder=this; }
	else {
		tmpencoder=firstEncoder;
		while (tmpencoder->next != NULL) tmpencoder=tmpencoder->next;
		tmpencoder->next=this;
	}
	this->next=NULL;


	port=portInputRegister(digitalPinToPort(pinA));
	if (port == NOT_A_PIN) { return; }

	// ** A **
    bitA=digitalPinToBitMask(pinA);
	uint8_t timerA=digitalPinToTimer(pinA);
    if (timerA != NOT_ON_TIMER) turnOffPWM(timerA);
#ifdef DEBUG
	//char buffer[16];
	//Serial.print("encoder addr: ");
	//sprintf(buffer, "%p", this);
	//Serial.println(buffer);
	printBuffer.putString("bitA: ");
	printBuffer.putHex(bitA);
#endif

	// ** B **
    bitB=digitalPinToBitMask(pinB);
	uint8_t timerB=digitalPinToTimer(pinB);
    if (timerB != NOT_ON_TIMER) turnOffPWM(timerB);
#ifdef DEBUG
	printBuffer.putString("bitB: ");
	printBuffer.putHex(bitB);
#endif

	// ** INTERRUPT **
#ifndef SWINTR_DEBUG
	// This section should be on normally.  OFF if performing software interrupts!
       	// GreyGnome DEBUG:  Turn these two lines off by defining
	// SWINTR_DEBUG.  In the sketch, turn the pins into Outputs and set them high.
	// Then set them as you wish, to create software interrupts.
	pinMode(pinA, INPUT); pinMode(pinB, INPUT);
	digitalWrite(pinA, HIGH); digitalWrite(pinB, HIGH);
#endif
	attachInterrupt(pinA, pinB);

#ifdef DEBUGTIME
	ada_output_port=portOutputRegister(digitalPinToPort(13)); // GreyGnome DEBUG.
	ada_output_mask=digitalPinToBitMask(13);    // defines the actual pin on that port
	ada_not_output_mask=ada_output_mask^0xFF;
#endif
}

void AdaEncoder::attachInterrupt(uint8_t pinA, uint8_t pinB) {

#ifdef DEBUG
	printBuffer.putString(getPSTR("attachInterrupt: "));
	printBuffer.putHex(pinA); printBuffer.put(' ');
#endif
	PCintPort::attachInterrupt(pinA, this, CHANGE);
	//PCintPort::attachInterrupt(pinB, AdaEncoder::encoderInterrupt, CHANGE);
	PCintPort::attachInterrupt(pinB, this, CHANGE);
#ifdef DEBUG
	printBuffer.putHex(pinB); printBuffer.put(' ');
	printBuffer.putString(" *\n");
#endif
}

/*
 * cbmethod()
 * An interrupt happens.  Just before calling this, ooPinChangeInt has set the PCintPort::arduinoPin to whatever
 * pin triggered the interrupt.  The circuit is constructed so detent position is pinA == 1, pinB == 1
 * So, the order of things goes like this:
 * - Get the Pin that triggered the interrupt.
 * - Get the encoder structure affiliated with that pin.
 * - Get the state of the ports (the ATmega ports associated with the Arduino pins).
 * - If we are in the detent position,
 *   . and we are turning:  It means we have moved a click.  Add/subtract to "clicks" to indicate direction.
 *   . set the turning and direction flags to 0.  (we do this whether we have turned, or not).
 *   . return
 * - If we are in the pinA == 0, pinB == 0 position:  We are between detents.  This means we MUST have passed
 *   through a 1,0 or a 0,1 position.  So we already know which direction we are going so now, simply flag that
 *   we are turning.
 * - If we have not flagged that we're turning, we need to do choose our direction.
 *   . if pinA is 1, we are going CCW 
 *   . if pinB is 1, we are going CW
 */
void AdaEncoder::cbmethod() {
	uint8_t stateA;
	uint8_t stateB;
	uint8_t portState;

#ifdef DEBUGTIME
	*ada_output_port|=ada_output_mask; // sets it high
#endif

	portState=*this->port;
	stateA=portState & bitA;
	stateB=portState & bitB;
#ifdef DEBUG
	printBuffer.putString(" id:");
	printBuffer.put(id); printBuffer.put(' ');
	printBuffer.put('A'); printBuffer.putHex(stateA); printBuffer.put(' ');
	printBuffer.put('B'); printBuffer.putHex(stateB); printBuffer.putString(" T: ");
	printBuffer.putDec(turning); printBuffer.putString(" C: ");
	printBuffer.putDec(clicks); printBuffer.put('\n');
#endif //DEBUG

	if (stateA && stateB ) {								// the detent. If we're turning, mark it.
		if (turning) {
			clicks+=direction;
#ifdef DEBUG
			printBuffer.putString("Clicks: "); printBuffer.putDec(clicks); printBuffer.put('\n');
#endif //DEBUG
		}
		turning=0; direction=0;		// reset counters.
#ifdef DEBUGTIME
		*ada_output_port&=ada_not_output_mask; // sets it low
#endif
		return;
	}
	if (stateA == 0 && stateB == 0) {						// The 1/2way point.  Flag that we've reached it.
		turning=1;
#ifdef DEBUGTIME
		*ada_output_port&=ada_not_output_mask; // sets it low
#endif
		return;
	}
	if (turning == 0) { // Either stateA!=0 or stateB!=0.
						// We are just starting to turn, so this will indicate direction
		if (stateA) { direction=1; // CCW
#ifdef DEBUG
		printBuffer.put('+');
#endif
#ifdef DEBUGTIME
			*ada_output_port&=ada_not_output_mask; // sets it low
#endif
			return;
	   	};                                     // CCW.
		if (stateB) { direction=-1; // CW
#ifdef DEBUG
		printBuffer.put('-');
#endif
#ifdef DEBUGTIME
			*ada_output_port&=ada_not_output_mask; // sets it low
#endif
			return;
		};                                      // CW.
	}
#ifdef DEBUGTIME
	*ada_output_port&=ada_not_output_mask; // sets it low
#endif

}

/*
 * GEt Next Indicated Encoder - gets the next encoder with non-zero clicks
 * Gets the next encoder that has been turned, as indicated by a non-zero "clicks" variable.
 *
 * Returns:
 * A pointer to the encoder found.
 *
 */
AdaEncoder *AdaEncoder::genie() {

//	if (currentEncoder == NULL)
	currentEncoder=firstEncoder;
	while (currentEncoder != NULL) {
		if (currentEncoder->clicks) {
#ifdef DEBUG
			printBuffer.putString("genie: ");
			printBuffer.put(currentEncoder->id); printBuffer.put(' ');
			printBuffer.putDec(currentEncoder->clicks); printBuffer.put(' ');
			printBuffer.putString(" *");
#endif
			return currentEncoder;
		}
		currentEncoder=currentEncoder->next;
	}
	return NULL;
}

char AdaEncoder::getID() {
	return id;
}

int8_t AdaEncoder::getClicks() {
	return clicks;
}

/*
 * query() returns the clicks, but additionally updates the clicks variable.
 */
int8_t AdaEncoder::query() {
	int8_t tmpclicks;
	tmpclicks=clicks;
	if (clicks < 0) clicks++;
	if (clicks > 0) clicks--;
	return tmpclicks;
}
