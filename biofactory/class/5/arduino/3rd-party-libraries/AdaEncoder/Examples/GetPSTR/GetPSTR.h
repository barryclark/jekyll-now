#ifndef INCLUDE_GETPSTR
#define INCLUDE_GETPSTR

#if defined(ARDUINO) && ARDUINO >= 100
  #include <Arduino.h>
#else
  #include "pins_arduino.h"
  #include "WProgram.h"
  #include "wiring.h"
#endif

#define getPSTR(s) pgmStrToRAM(PSTR(s))

char *_pstr_to_print;
char *pgmStrToRAM(PROGMEM char *theString) {
	free(_pstr_to_print);
	_pstr_to_print=(char *) malloc(strlen_P(theString));
	strcpy_P(_pstr_to_print, theString);
	return (_pstr_to_print);
}
#endif
