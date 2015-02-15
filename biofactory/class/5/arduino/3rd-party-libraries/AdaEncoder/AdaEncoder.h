// We use 4-character tabstops, so IN VIM:  <esc>:set ts=4 sw=4 <cr>
// ...that's: ESCAPE key, colon key, then "s-e-t SPACE key t-s-=-4 SPACE key s-w-=-4 CARRIAGE RETURN key"
/*
 AdaEncoder.h - A library for reading Lady Ada's or 
 Sparkfun's rotary encoder.
 Should work for any rotary encoder with 2 pins (4 states).

 Version 0.7 Tue Nov 20 17:56:29 CST 2012

*/

/*
  Copyright 2011 Michael Schwager (aka, "GreyGnome")

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

	Questions?  Send mail to mschwage@gmail.com

*/

/* Behavior goes like this:
 * 11 is the detent position for an encoder.  So the encoder will go through an order like this:
 *   11 <=> 01 <=> 00 <=> 10 <=> 11    OR    11 <=> 10 <=> 00 <=> 01 <=> 11
 * depending on direction.  The <=> represent a possible bounce situation.  Therefore, we keep track of the
 * encoder behavior in a binary number called (appropriately enough) encoder.  Encoder has 8 bits.
 * 
 * The process starts when we get an interrupt and read the encoder pins.
 * - Reading: 11 is either a bounce back to start, or the final reading:
 * 	- If encoder is currently xxxx0001, you have advanced CW.
 * 	- If encoder is currently xxxx0010, you have advanced CCW.
 *	- otherwise, you'd simply bounced.  No advance.
 *	- "encoder" is set to xxxx1111.
 * - Reading: 01 or 10:
 *	- If "encoder" is currently xxxx1111, set it to 1101 or 1110, appropriately.
 *	- If "encoder" is xxxx00xy, you'd either bounced or moved to the next position, which means we get closer to detent.  No effect.
 * - Reading: 00: we are in the middle.  AND encoder with xxxx0011
 */

#undef DEBUG

#ifndef AdaEncoder_h
#define AdaEncoder_h

#ifndef PinChangeInt_h
#define LIBCALL_OOPINCHANGEINT
#include "../ooPinChangeInt/ooPinChangeInt.h"
#endif
#include "../cbiface/cbiface.h"

#if defined(ARDUINO) && ARDUINO >= 100
  #include <Arduino.h>
#else
  #include <pins_arduino.h>
  #include <wiring.h>
#endif

//  The Pin map below is copyright by the Arduino people.  I include it here so I can remember stuff as I code.
// ATMEL ATMEGA8 & 168 / ARDUINO
// //
// //                  +-\/-+
// //            PC6  1|    |28  PC5 (AI 5)
// //      (D 0) PD0  2|    |27  PC4 (AI 4)
// //      (D 1) PD1  3|    |26  PC3 (AI 3)
// //      (D 2) PD2  4|    |25  PC2 (AI 2)
// // PWM+ (D 3) PD3  5|    |24  PC1 (AI 1)
// //      (D 4) PD4  6|    |23  PC0 (AI 0)
// //            VCC  7|    |22  GND
// //            GND  8|    |21  AREF
// //            PB6  9|    |20  AVCC
// //            PB7 10|    |19  PB5 (D 13)
// // PWM+ (D 5) PD5 11|    |18  PB4 (D 12)
// // PWM+ (D 6) PD6 12|    |17  PB3 (D 11) PWM
// //      (D 7) PD7 13|    |16  PB2 (D 10) PWM
// //      (D 8) PB0 14|    |15  PB1 (D 9) PWM
// //                  +----+
// 
// const static uint8_t A0 = 14;
// const static uint8_t A1 = 15;
// const static uint8_t A2 = 16;
// const static uint8_t A3 = 17;
// const static uint8_t A4 = 18;
// const static uint8_t A5 = 19;
// const static uint8_t A6 = 20;
// const static uint8_t A7 = 21;
//
// Macros to find pins:
// #define digitalPinToPort(P) ( pgm_read_byte( digital_pin_to_port_PGM + (P) ) )
// #define digitalPinToBitMask(P) ( pgm_read_byte( digital_pin_to_bit_mask_PGM + (P) ) )
// #define digitalPinToTimer(P) ( pgm_read_byte( digital_pin_to_timer_PGM + (P) ) )
// #define analogInPinToBit(P) (P)
// #define portOutputRegister(P) ( (volatile uint8_t *)( pgm_read_word( port_to_output_PGM + (P))) )
// #define portInputRegister(P) ( (volatile uint8_t *)( pgm_read_word( port_to_input_PGM + (P))) )
// #define portModeRegister(P) ( (volatile uint8_t *)( pgm_read_word( port_to_mode_PGM + (P))) )

/*
struct encoder {
    volatile uint8_t* port;

    uint8_t bitA;
    uint8_t bitB;

    uint8_t turning;    // Flag to keep track of turning state
    int8_t clicks;      // Counter to indicate cumulative clicks in either direction
    int8_t direction;   // indicator

    char id;

    encoder *next;
};*/

class AdaEncoder : public CallBackInterface {
 public:
	AdaEncoder(char _id, uint8_t _pinA, uint8_t _pinB) {
    	/* 
     	 * Add a new encoder 
     	 * Params :
     	 * pinA			CW pin  (Arduino pin number)
     	 * pinB			CCW pin
	 	 *
     	 */
		addEncoder(_id, _pinA, _pinB);
		
	}
	int8_t query(); // BUG under pre-0.7 versions (had uint8_t)
	int8_t getClicks(); // BUG under pre-0.7 versions (had uint8_t)
	char getID();

	static AdaEncoder *getFirstEncoder();

	static AdaEncoder *genie();
	static AdaEncoder *genie(int8_t *clicks, char *id); // GEt Next Indicated Encoder - gets the next encoder with non-zero clicks

 private:

	void addEncoder(char _id, uint8_t _pinA, uint8_t _pinB);
	void attachInterrupt(uint8_t _pinA, uint8_t _pinB);
	void cbmethod();
	static void debugMessage();
	static void turnOffPWM(uint8_t timer);

    volatile uint8_t* port;

    uint8_t pinA, bitA;
    uint8_t pinB, bitB;
    uint8_t turning;    // Flag to keep track of turning state
    int8_t clicks;      // Counter to indicate cumulative clicks in either direction
    int8_t direction;   // indicator

    char id;

	AdaEncoder *next;
};

#endif	//AdaEncoder.h
