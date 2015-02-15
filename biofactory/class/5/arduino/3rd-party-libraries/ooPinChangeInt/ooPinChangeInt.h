// Copyright 2010, 2011, 2012, 2013 2014 Michael Schwager, Lex Talonis, Chris J. Klick
// This file is part of ooPinChangeInt.
/*
    ooPinChangeInt is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

// We use 4-character tabstops, so IN VIM:  <esc>:set ts=4 sw=4 sts=4
// ...that's: ESCAPE key, colon key, then
//		"s-e-t SPACE key t-s = 4 SPACE key s-w = 4 SPACE key s-t-s = 4"

/*
 *	This is the ooPinChangeInt library for the Arduino.
	This library provides an extension to the interrupt support for arduino by adding pin change
	interrupts, giving a way for users to have interrupts drive off of any pin (ATmega328-based
	Arduinos) and by the Port B, J, and K pins on the Arduino Mega and its ilk.

	See the README for license, acknowledgements, and other details.

	See google code project for latest bugs and info http://code.google.com/p/arduino-oopinchangeint/
	The latest source code is at https://github.com/GreyGnome/ooPinChangeInt
	For more information Refer to avr-gcc header files, arduino source and atmega datasheet.

	This library was derived from the PinChangeInt library, found at
	http://code.google.com/p/arduino-pinchangeint/
	Chris J. Klick started it all by creating a nice PinChangeInt example here at the Arduino
	Playground: http://www.arduino.cc/playground/Main/PcInt

*/

//-------- define these in your sketch, if applicable ----------------------------------------------------------
//-------- These must go ahead of the #include ooPinChangeInt.h statement in your sketch -----------------------
// You can reduce the memory footprint of this handler by declaring that there will be no pin change interrupts
// on any one or two of the three ports.  If only a single port remains, the handler will be declared inline
// reducing the size and latency of the handler.
// #define NO_PORTB_PINCHANGES // to indicate that port b will not be used for pin change interrupts
// #define NO_PORTC_PINCHANGES // to indicate that port c will not be used for pin change interrupts
// #define NO_PORTD_PINCHANGES // to indicate that port d will not be used for pin change interrupts
// --- Mega support ---
// #define NO_PORTB_PINCHANGES // to indicate that port b will not be used for pin change interrupts
// #define NO_PORTJ_PINCHANGES // to indicate that port j will not be used for pin change interrupts
// #define NO_PORTK_PINCHANGES // to indicate that port k will not be used for pin change interrupts
// In the Mega, there is no Port C, no Port D.  Instead, you get Port J and Port K.  Port B remains.
// Port J, however, is practically useless because there is only 1 pin available for interrupts.  Most
// of the Port J pins are not even connected to a header connection.  // </end> "Mega Support" notes
// --- Sanguino, Mioduino support ---
// #define NO_PORTA_PINCHANGES // to indicate that port a will not be used for pin change interrupts

// You can reduce the code size by maybe 20 bytes, and you can speed up the interrupt routine
// slightly by declaring that you don't care if the static variable PCintPort::pinState
// is made available to your interrupt routine.
// #define NO_PIN_STATE        // to indicate that you don't need the pinState
// #define DISABLE_PCINT_MULTI_SERVICE // to limit the handler to servicing a single interrupt per invocation.
// #define GET_OOPCIVERSION   // to enable the uint16_t getOOPCIintVersion () function.
//-------- define the above in your sketch, if applicable ------------------------------------------------------

/*
	ooPinChangeInt.h
	---- VERSIONS ----------------------------------------------------------------------------
	...Moved to RELEASE_NOTES.

	See the README file for the License and more details.
*/

#ifndef ooPinChangeInt_h
#define	ooPinChangeInt_h

#define OOPCIVERSION 1030

#include "stddef.h"

// Thanks to Maurice Beelen, nms277, Akesson Karlpetter, and Orly Andico for these fixes.
#if defined(ARDUINO) && ARDUINO >= 100
   #include <Arduino.h>
   #include <new.h>
#else
   #include <pins_arduino.h>
   #ifndef   LIBCALL_OOPINCHANGEINT
     #include "../cppfix/cppfix.h"
   #endif
   #include "WProgram.h"
#endif

#include "../cbiface/cbiface.h"

#undef DEBUG

/*
* Theory: all IO pins on Atmega168 are covered by Pin Change Interrupts.
* The PCINT corresponding to the pin must be enabled and masked, and
* an ISR routine provided.  Since PCINTs are per port, not per pin, the ISR
* must use some logic to actually implement a per-pin interrupt service.
*/

/* Pin to interrupt map (atmega168 and 328 only):
* D0-D7 = PCINT 16-23 = PCIR2 = PD = PCIE2 = pcmsk2
* D8-D13 = PCINT 0-5 = PCIR0 = PB = PCIE0 = pcmsk0
* A0-A5 (D14-D19) = PCINT 8-13 = PCIR1 = PC = PCIE1 = pcmsk1
*/


#undef  INLINE_PCINT
#define INLINE_PCINT
// Thanks to cserveny...@gmail.com for MEGA support!
#if defined __AVR_ATmega2560__ || defined __AVR_ATmega1280__ || defined __AVR_ATmega1281__ || defined __AVR_ATmega2561__ || defined __AVR_ATmega640__
    #define __USE_PORT_JK
    // Mega does not have External Interrupts on PORTA, C or D
    #define NO_PORTA_PINCHANGES
    #define NO_PORTC_PINCHANGES
    #define NO_PORTD_PINCHANGES
    #if ((defined(NO_PORTB_PINCHANGES) && defined(NO_PORTJ_PINCHANGES)) || \
            (defined(NO_PORTJ_PINCHANGES) && defined(NO_PORTK_PINCHANGES)) || \
            (defined(NO_PORTK_PINCHANGES) && defined(NO_PORTB_PINCHANGES)))
        #define INLINE_PCINT inline
    #endif
#else
	#define NO_PORTJ_PINCHANGES
	#define NO_PORTK_PINCHANGES
	#if defined(__AVR_ATmega644P__) || defined(__AVR_ATmega644__)
		#ifndef NO_PORTA_PINCHANGES
			#define __USE_PORT_A
		#endif
	#else
		#define NO_PORTA_PINCHANGES
	#endif
	// if defined only D .OR. only C .OR. only B .OR. only A, then inline it
	#if (   (defined(NO_PORTA_PINCHANGES) && defined(NO_PORTB_PINCHANGES) && defined(NO_PORTC_PINCHANGES)) || \
			(defined(NO_PORTA_PINCHANGES) && defined(NO_PORTB_PINCHANGES) && defined(NO_PORTD_PINCHANGES)) || \
			(defined(NO_PORTA_PINCHANGES) && defined(NO_PORTC_PINCHANGES) && defined(NO_PORTD_PINCHANGES)) || \
			(defined(NO_PORTB_PINCHANGES) && defined(NO_PORTC_PINCHANGES) && defined(NO_PORTD_PINCHANGES)) )
		#define	INLINE_PCINT inline
	#endif
#endif

class PCintPort {
public:
	PCintPort(int index,int pcindex, volatile uint8_t& maskReg) :
	portInputReg(*portInputRegister(index)),
	firstPin(NULL),
	portPCMask(maskReg),
	PCICRbit(1 << pcindex),
	portRisingPins(0),
	portFallingPins(0)
	{ }

	// Variables
	volatile	uint8_t&		portInputReg; // Its bits reflect the state of the port
	static uint8_t curr;					  // ...is the portInputReg of the current port

	// Methods
	// cbIface should be an object instantiated from a subclass of CallBackInterface
	static		int8_t attachInterrupt(uint8_t pin, CallBackInterface* cbIface, int mode);
	static		void detachInterrupt(uint8_t pin);
	INLINE_PCINT void PCint();

protected:
	class PCintPin {
	public:
		PCintPin() :
		mode(0) {}
		CallBackInterface* 	pinCallBack;
		uint8_t		arduinoPin;
		uint8_t 	mode;
		uint8_t		mask;
		#ifndef NO_PIN_STATE
		uint8_t		state;
		#endif
		PCintPin* next;
	};
	// Protected Variables
	PCintPin*	firstPin;
	volatile	uint8_t&		portPCMask;
	const		uint8_t			PCICRbit;
	volatile	uint8_t	portRisingPins;
	volatile	uint8_t	portFallingPins;
	volatile	uint8_t		lastPinView;

	// Protected Methods
	void		enable(PCintPin* pin, CallBackInterface* cbIface, uint8_t mode);
	int8_t		addPin(uint8_t arduinoPin,CallBackInterface* cbIface, uint8_t mode);
	void		delPin(uint8_t mask);

};
#endif
// ********************************************************************************************************

#ifdef   LIBCALL_OOPINCHANGEINT // LIBCALL_OOPINCHANGEINT *************************************************
#ifdef __USE_PORT_A
extern PCintPort portA;
#endif
extern PCintPort portB;
extern PCintPort portC;
extern PCintPort portD;
#ifdef __USE_PORT_JK
extern PCintPort portJ;
extern PCintPort portK;
#endif
#else // LIBCALL_OOPINCHANGEINT
uint8_t PCintPort::curr=0;

// ATMEGA 644 
//
#if defined(__AVR_ATmega644P__) || defined(__AVR_ATmega644__) // Sanguino, Mosquino uino bobino bonanafannafofino, me my momino...

#ifndef NO_PORTA_PINCHANGES
PCintPort portA=PCintPort(1, 0,PCMSK0); // port PA==1  (from Arduino.h, Arduino version 1.0)
#endif
#ifndef NO_PORTB_PINCHANGES
PCintPort portB=PCintPort(2, 1,PCMSK1); // port PB==2  (from Arduino.h, Arduino version 1.0)
#endif
#ifndef NO_PORTC_PINCHANGES
PCintPort portC=PCintPort(3, 2,PCMSK2); // port PC==3  (also in pins_arduino.c, Arduino version 022)
#endif
#ifndef NO_PORTD_PINCHANGES
PCintPort portD=PCintPort(4, 3,PCMSK3); // port PD==4
#endif

#else // others

#ifndef NO_PORTB_PINCHANGES
PCintPort portB=PCintPort(2, 0,PCMSK0); // port PB==2  (from Arduino.h, Arduino version 1.0)
#endif

#ifndef NO_PORTC_PINCHANGES
PCintPort portC=PCintPort(3, 1,PCMSK1); // port PC==3  (also in pins_arduino.c, Arduino version 022)
#endif

#ifndef NO_PORTD_PINCHANGES
PCintPort portD=PCintPort(4, 2,PCMSK2); // port PD==4
#endif

#endif // defined __AVR_ATmega644__

#ifdef __USE_PORT_JK

#ifndef NO_PORTJ_PINCHANGES
PCintPort portJ=PCintPort(10,1,PCMSK1); // port PJ==10 
#endif

#ifndef NO_PORTK_PINCHANGES
PCintPort portK=PCintPort(11,2,PCMSK2); // port PK==11
#endif

#endif

#endif // LIBCALL_OOPINCHANGEINT

#ifndef   LIBCALL_OOPINCHANGEINT

static PCintPort *lookupPortNumToPort( int portNum ) {
    PCintPort *port = NULL;

    switch (portNum) {
#ifndef NO_PORTA_PINCHANGES
	case 1:
		port=&portA;
#endif
#ifndef NO_PORTB_PINCHANGES
    case 2:
        port=&portB;
        break;
#endif
#ifndef NO_PORTC_PINCHANGES
    case 3:
		port=&portC;
		break;
#endif
#ifndef NO_PORTD_PINCHANGES
	case 4:
		port=&portD;
		break;
#endif
#ifdef __USE_PORT_JK

#ifndef NO_PORTJ_PINCHANGES
	case 10:
		port=&portJ;
		break;
#endif

#ifndef NO_PORTK_PINCHANGES
	case 11:
		port=&portK;
		break;
#endif

#endif // __USE_PORT_JK
    }

    return port;
}

void PCintPort::enable(PCintPin* p, CallBackInterface* cbIface, uint8_t mode) {
    // Enable the pin for interrupts by adding to the PCMSKx register.
    // ...The final steps; at this point the interrupt is enabled on this pin.
    p->mode=mode;
    p->pinCallBack=cbIface;
#ifndef NO_PORTJ_PINCHANGES
	// A big shout out to jrhelbert for this fix! Thanks!!!
	if ((p->arduinoPin == 14) || (p->arduinoPin == 15)) {
		portPCMask |= (p->mask << 1); // PORTJ's PCMSK1 is a little odd...
	}
	else {
		portPCMask |= p->mask;
	}
#else
    portPCMask |= p->mask;
#endif
    if ((p->mode == RISING) || (p->mode == CHANGE)) portRisingPins |= p->mask;
    if ((p->mode == FALLING) || (p->mode == CHANGE)) portFallingPins |= p->mask;
    PCICR |= PCICRbit;
}

int8_t PCintPort::addPin(uint8_t arduinoPin, CallBackInterface* cbIface, uint8_t mode)
{
	PCintPin* tmp=NULL;
	uint8_t bitmask=digitalPinToBitMask(arduinoPin);

	// Add to linked list, starting with firstPin
	if (firstPin != NULL) {
		tmp=firstPin;
		do {
			if (tmp->mask == bitmask) { enable(tmp, cbIface, mode); return(0); }
			if (tmp->next == NULL) break;
			tmp=tmp->next;
		} while (true);
	}

	// Create pin p:  fill in the data
	PCintPin* p=new PCintPin;
	if (p == NULL) return(-1);
	p->arduinoPin = arduinoPin;
	p->mode = mode;
	p->next=NULL;
	p->mask = bitmask; // the mask
	// ...Pin created

	if (firstPin == NULL) firstPin=p;
	else tmp->next=p;
#ifdef DEBUG
	// TODO: use a bytebuffer instead of Serial.print(). Serial.print() no longer
	// works in interrupt content.
	Serial.print("addPin. pin given: "); Serial.print(arduinoPin, DEC), Serial.print (" pin stored: ");
	int addr = (int) p;
	Serial.print(" instance addr: "); Serial.println(addr, HEX);
#endif
	enable(p, cbIface, mode);
	return(1);
}

/*
 * attach an interrupt to a specific pin using pin change interrupts.
 */
int8_t PCintPort::attachInterrupt(uint8_t arduinoPin, CallBackInterface* cbIface, int mode)
{
	PCintPort *port;
	uint8_t portNum = digitalPinToPort(arduinoPin);
	if ((portNum == NOT_A_PORT) || (cbIface == NULL)) return(-1);

	port=lookupPortNumToPort(portNum);
	// Added by GreyGnome... must set the initial value of lastPinView for it to be correct on the 1st interrupt.
	// ...but even then, how do you define "correct"?  Ultimately, the user must specify (not provisioned for yet).
	port->lastPinView=port->portInputReg;

#ifdef DEBUG
	Serial.print("attachInterrupt FUNC: "); Serial.println(arduinoPin, DEC);
#endif
	// map pin to PCIR register
	return(port->addPin(arduinoPin,cbIface,mode));
}

void PCintPort::detachInterrupt(uint8_t arduinoPin)
{
	PCintPort *port;
   	PCintPin* current;
   	uint8_t mask;
    
#ifdef DEBUG
	Serial.print("detachInterrupt: "); Serial.println(arduinoPin, DEC);
#endif
	uint8_t portNum = digitalPinToPort(arduinoPin);
	if (portNum == NOT_A_PORT) return;
	port=lookupPortNumToPort(portNum);
	mask=digitalPinToBitMask(arduinoPin);
	current=port->firstPin;
	while (current) {
		if (current->mask == mask) { // found the target
			uint8_t oldSREG = SREG;
			cli(); // disable interrupts
#ifndef NO_PORTJ_PINCHANGES
			// A big shout out to jrhelbert for this fix! Thanks!!!
			if ((arduinoPin == 14) || (arduinoPin == 15)) {
				port->portPCMask &= ~(mask << 1); // PORTJ's PCMSK1 is a little odd...
			}
			else {
				port->portPCMask &= ~mask; // disable the mask entry.
			}
#else
			port->portPCMask &= ~mask; // disable the mask entry.
#endif
			if (port->portPCMask == 0) PCICR &= ~(port->PCICRbit);
			port->portRisingPins &= ~mask; port->portFallingPins &= ~mask;
			SREG = oldSREG; // Restore register; reenables interrupts
			return;
		}
		current=current->next;
	}
}

// common code for isr handler. "port" is the PCINT number.
// there isn't really a good way to back-map ports and masks to pins.
void PCintPort::PCint() {
	uint8_t changedPins;
	#ifndef DISABLE_PCINT_MULTI_SERVICE
	uint8_t pcifr;
	do {
	#endif
		// get the pin states for the indicated port.
		//uint8_t changedPins = PCintPort::curr ^ lastPinView;
		// NEW

		changedPins=(PCintPort::curr ^ lastPinView) &
					((portRisingPins & PCintPort::curr) | ( portFallingPins & ~PCintPort::curr));
		lastPinView = PCintPort::curr;

		PCintPin* p = firstPin;
		while (p) {
			if (p->mask & changedPins) { // a changed bit
				// Trigger interrupt if mode is CHANGE, or if mode is RISING and
				// the bit is currently high, or if mode is FALLING and bit is low.
				#ifndef NO_PIN_STATE
				p->state=PCintPort::curr & p->mask ? HIGH : LOW;
				#endif
				(*(p->pinCallBack)).cbmethod();
			}
			//changedPins ^= p->mask;  // TODO:  Check on this optimization.
			//if (!changedPins) break;
			p=p->next;
		}
	#ifndef DISABLE_PCINT_MULTI_SERVICE
		pcifr = PCIFR & PCICRbit;
		if (pcifr == 0) break;
		PCIFR |= pcifr;	// clear the interrupt if we will process it (no effect if bit is zero)
		PCintPort::curr=portInputReg;
	} while (true);
	#endif
}

#ifndef NO_PORTB_PINCHANGES
ISR(PCINT0_vect) {
	PCintPort::curr = portB.portInputReg;
	portB.PCint();
}
#endif

#ifndef NO_PORTC_PINCHANGES
ISR(PCINT1_vect) {
	PCintPort::curr = portC.portInputReg;
	portC.PCint();
}
#endif

#ifndef NO_PORTD_PINCHANGES
ISR(PCINT2_vect) {
	PCintPort::curr = portD.portInputReg;
	portD.PCint();
}
#endif

#ifdef __USE_PORT_JK
#ifndef NO_PORTJ_PINCHANGES
ISR(PCINT1_vect) {
	#ifdef PINMODE
	PCintPort::s_PORT='J';
	#endif
	PCintPort::curr = portJ.portInputReg;
	portJ.PCint();
}
#endif

#ifndef NO_PORTK_PINCHANGES
ISR(PCINT2_vect){ 
	#ifdef PINMODE
	PCintPort::s_PORT='K';
	#endif
	PCintPort::curr = portK.portInputReg;
	portK.PCint();
}
#endif

#endif // __USE_PORT_JK

#ifdef GET_OOPCIVERSION
uint16_t getOOPCIntVersion () {
	return ((uint16_t) OOPCIVERSION);
}
#endif // GET_OOPCIVERSION
#endif // LIBCALL_OOPINCHANGEINT
