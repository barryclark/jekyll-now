/* *******************************************************
/  Libraries
*/

#include <Wire.h> // Needed for I2C connection
#include <LiquidCrystal_I2C.h> // Needed for operating the LCD screen
/* *******************************************************
*/

/* *******************************************************
/  LCD
*/
// Set the LCD address to 0x27 for a 16 chars and 2 line display
LiquidCrystal_I2C lcd(0x27,16,2);  // set the LCD address to 0x27 for a 16 chars and 2 line display
/* *******************************************************
*/

/* *******************************************************
/  Setup, this code is only executed once
*/
void setup()
{
  // initialize the lcd 
  lcd.init(); 
 
  // Print a message to the LCD.
  lcd.backlight(); // activate backlight
  lcd.print("Hello, world!"); // print Hello, world!
}
/* *******************************************************
*/

/* *******************************************************
/  Loop, this code is constantly repeated
*/
void loop()
{
  // nothing to do
}
/* *******************************************************
*/
