---- README -----------------------------------------------------------------------------
	ooPinChangeInt README


---- DESCRIPTION ------------------------------------------------------------------------
This is the ooPinChangeInt library for the Arduino.
See google code project for latest bugs and info http://code.google.com/p/arduino-oopinchangeint/
See the Github page for the latest development code: https://github.com/GreyGnome/ooPinChangeInt

This library provides an extension to the interrupt support for arduino by adding pin change
interrupts, giving a way for users to have interrupts drive off of any pin (ATmega328-based
Arduinos), by the Port B, J, and K pins on the Arduino Mega and its ilk, and on the appropriate
ports (including Port A) on the Sanguino and its ilk.  Regarding the MEGA and friends, Cserveny
says: "J is mostly useless, because of the hardware UART...  (many) pins are not connected on the
arduino boards."

The library is derived from and begins with the PinChangeInt v 1.3 code.  See
http://code.google.com/p/arduino-pinchangeint/ . This was designed to be more Object Oriented-like.
Why? Because I could. It is certainly less efficient both time- and space-wise. Whether it's easier
or more logical is up for debate. But it makes for an interesting comparison to the non-OO method
of the original PinChangeInt, and it is probably fast enough for many purposes.

---- LICENSE ----------------------------------------------------------------------------
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

---- ACKNOWLEDGMENTS ---------------------------------------------------------------------
This library was originally written by Chris J. Klick, Robot builder and all around geek, who said of it,
	"HI, Yeah, I wrote the original PCint library. It was a bit of a hack and the new one has better
	features.  I intended the code to be freely usable.  Didn't really think about a license.  Feel
	free to use it in your code: I hereby grant you permission."
Thanks, Chris! A hack? I dare say not, if I have taken this any further it's merely by standing on the
shoulders of giants. This library was the best "tutorial" I found on Arduino Pin Change Interrupts
and because of that I decided to continue to maintain and (hopefully) improve it. We, the Arduino
community of robot builders and geeks, owe you a great debt of gratitude for your hack- a hack in
the finest sense.

The library was then picked up by Lex Talionis, who created the Google Code website. We all owe a debt
of thanks to Lex, too, for all his hard work! He is currently the other official maintainer of this
code.

Chris' original PCInt Arduino Playground example is here: http://www.arduino.cc/playground/Main/PcInt

Many thanks to all the contributors who have contributed bug fixes, code, and suggestions
to this project: 

John Boiles and Baziki (who added fixes to PcInt), Maurice Beelen, nms277, Akesson Karlpetter, and
Orly Andico for various fixes to this code, Rob Tillaart for some excellent code reviews and nice
optimizations, Andre' Franken for a good bug report that kept me thinking, cserveny.tamas a special
shout out for providing the MEGA code to PinChangeInt- Thanks!

Many thanks to JRHelbert for fixing the PJ0 and PJ1 interrupt PCMSK1 issue... 06/2014

